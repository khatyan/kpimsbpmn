import { db } from 'src/lib/db'

export const indicatorValues = () => {
  return db.indicatorValue.findMany()
}

export const indicatorValue = ({ id }) => {
  return db.indicatorValue.findOne({
    where: { id },
  })
}

export const createIndicatorValue = ({ input }) => {
  return db.indicatorValue.create({
    data: input,
  })
}

export const updateIndicatorValue = ({ id, input }) => {
  return db.indicatorValue.update({
    data: input,
    where: { id },
  })
}

export const deleteIndicatorValue = ({ id }) => {
  return db.indicatorValue.delete({
    where: { id },
  })
}

export const IndicatorValue = {
  modifiedBy: (_obj, { root }) =>
    db.indicatorValue.findOne({ where: { id: root.id } }).modifiedBy(),
  Indicator: (_obj, { root }) =>
    db.indicatorValue.findOne({ where: { id: root.id } }).Indicator(),
}
