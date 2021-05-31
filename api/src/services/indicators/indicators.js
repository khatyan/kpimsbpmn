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

export const indicators = () => {
  return db.indicator.findMany()
}

export const indicator = ({ id }) => {
  return db.indicator.findOne({
    where: { id },
  })
}

export const createIndicator = ({ input }) => {
  return db.indicator.create({
    data: foreignKeyReplacement(input),
  })
}

export const updateIndicator = ({ id, input }) => {
  return db.indicator.update({
    data: foreignKeyReplacement(input),
    where: { id },
  })
}

export const deleteIndicator = ({ id }) => {
  return db.indicator.delete({
    where: { id },
  })
}

export const Indicator = {
  values: (_obj, { root }) =>
    db.indicator.findOne({ where: { id: root.id } }).values(),
  modifiedBy: (_obj, { root }) =>
    db.indicator.findOne({ where: { id: root.id } }).user(),
  department: (_obj, { root }) =>
    db.indicator.findOne({ where: { id: root.id } }).department(),
  user: (_obj, { root }) =>
    db.indicator.findOne({ where: { id: root.id } }).user(),
}
