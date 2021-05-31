import { db } from 'src/lib/db'

export const workflows = () => {
  return db.workflow.findMany()
}

export const workflow = ({ id }) => {
  return db.workflow.findOne({
    where: { id },
  })
}

export const createWorkflow = ({ input }) => {
  return db.workflow.create({
    data: input,
  })
}

export const updateWorkflow = ({ id, input }) => {
  return db.workflow.update({
    data: input,
    where: { id },
  })
}

export const deleteWorkflow = ({ id }) => {
  return db.workflow.delete({
    where: { id },
  })
}

export const Workflow = {
  Statuses: (_obj, { root }) =>
    db.workflow.findOne({ where: { id: root.id } }).Statuses(),
}
