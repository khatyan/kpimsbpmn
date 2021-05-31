import { db } from 'src/lib/db'
const foreignKeyReplacement = (input) => {
  let output = input
  const foreignKeys = Object.keys(input).filter((k) => k.match(/Id$/))
  foreignKeys.forEach((key) => {
    const modelName = key.replace(/Id$/, '')
    const value = input[key]
    delete output[key]
    output = Object.assign(output, {
      [modelName]: { connect: { id: value } },
    })
  })
  return output
}
export const departments = () => {
  return db.department.findMany()
}

export const department = ({ id }) => {
  return db.department.findOne({
    where: { id },
  })
}

export const createDepartment = ({ input }) => {
  return db.department.create({
    data: foreignKeyReplacement(input),
  })
}

export const updateDepartment = ({ id, input }) => {
  return db.department.update({
    data: foreignKeyReplacement(input),
    where: { id },
  })
}

export const deleteDepartment = ({ id }) => {
  return db.department.delete({
    where: { id },
  })
}

export const Department = {
  section: (_obj, { root }) =>
    db.department.findOne({ where: { id: root.id } }).section(),
  Indicator: (_obj, { root }) =>
    db.department.findOne({ where: { id: root.id } }).Indicator(),
  Employees: (_obj, { root }) =>
    db.department.findOne({ where: { id: root.id } }).Employees(),
}
