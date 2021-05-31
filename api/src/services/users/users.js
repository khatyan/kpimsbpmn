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

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findOne({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: foreignKeyReplacement(input),
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: foreignKeyReplacement(input),
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  IndicatorValue: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).IndicatorValue(),
  Indicator: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).Indicator(),
  department: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).department(),
  WorkflowStatus: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).WorkflowStatus(),
}
