import { db } from 'src/lib/db'

export const sections = () => {
  return db.section.findMany()
}

export const section = ({ id }) => {
  return db.section.findOne({
    where: { id },
  })
}

export const createSection = ({ input }) => {
  return db.section.create({
    data: input,
  })
}

export const updateSection = ({ id, input }) => {
  return db.section.update({
    data: input,
    where: { id },
  })
}

export const deleteSection = ({ id }) => {
  return db.section.delete({
    where: { id },
  })
}

export const Section = {
  departments: (_obj, { root }) =>
    db.section.findOne({ where: { id: root.id } }).departments(),
}
