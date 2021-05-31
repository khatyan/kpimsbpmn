import { db } from 'src/lib/db'

export const workflowStatuses = () => {
  return db.workflowStatus.findMany()
}

export const workflowStatus = ({ id }) => {
  return db.workflowStatus.findOne({
    where: { id },
  })
}

export const createWorkflowStatus = ({ input }) => {
  return db.workflowStatus.create({
    data: input,
  })
}

export const updateWorkflowStatus = ({ id, input }) => {
  return db.workflowStatus.update({
    data: input,
    where: { id },
  })
}

export const deleteWorkflowStatus = ({ id }) => {
  return db.workflowStatus.delete({
    where: { id },
  })
}

export const WorkflowStatus = {
  Workflow: (_obj, { root }) =>
    db.workflowStatus.findOne({ where: { id: root.id } }).Workflow(),
  participants: (_obj, { root }) =>
    db.workflowStatus.findOne({ where: { id: root.id } }).participants(),
}
