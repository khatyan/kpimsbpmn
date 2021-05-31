// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/workflows/new" page={NewWorkflowPage} name="newWorkflow" />
      <Route
        path="/workflows/{id:Int}/edit"
        page={EditWorkflowPage}
        name="editWorkflow"
      />
      <Route path="/workflows/{id:Int}" page={WorkflowPage} name="workflow" />
      <Route path="/workflows" page={WorkflowsPage} name="workflows" />
      <Route path="/bpmn" page={WorkflowBpmnPage} name="workflowBpmn" />
      <Route
        path="/kpiprops/{id:Int}"
        page={KpiPropertiesPagePage}
        name="kpiPropertiesPage"
      />
      <Route path="/kpi" page={KpisPage} name="kpis" />
      <Route path="/users/new" page={NewUserPage} name="newUser" />
      <Route path="/users/{id:Int}/edit" page={EditUserPage} name="editUser" />
      <Route path="/users/{id:Int}" page={UserPage} name="user" />
      <Route path="/users" page={UsersPage} name="users" />
      <Route
        path="/departments/new"
        page={NewDepartmentPage}
        name="newDepartment"
      />
      <Route
        path="/departments/{id:Int}/edit"
        page={EditDepartmentPage}
        name="editDepartment"
      />
      <Route
        path="/departments/{id:Int}"
        page={DepartmentPage}
        name="department"
      />
      <Route path="/departments" page={DepartmentsPage} name="departments" />
      <Route
        path="/indicators/new"
        page={NewIndicatorPage}
        name="newIndicator"
      />
      <Route
        path="/indicators/{id:Int}/edit"
        page={EditIndicatorPage}
        name="editIndicator"
      />
      <Route
        path="/indicators/{id:Int}"
        page={IndicatorPage}
        name="indicator"
      />
      <Route path="/indicators" page={IndicatorsPage} name="indicators" />
      <Route
        path="/workflow-statuses/new"
        page={NewWorkflowStatusPage}
        name="newWorkflowStatus"
      />
      <Route
        path="/workflow-statuses/{id:Int}/edit"
        page={EditWorkflowStatusPage}
        name="editWorkflowStatus"
      />
      <Route
        path="/workflow-statuses/{id:Int}"
        page={WorkflowStatusPage}
        name="workflowStatus"
      />
      <Route
        path="/workflow-statuses"
        page={WorkflowStatusesPage}
        name="workflowStatuses"
      />
      <Route path="/sections/new" page={NewSectionPage} name="newSection" />
      <Route
        path="/sections/{id:Int}/edit"
        page={EditSectionPage}
        name="editSection"
      />
      <Route path="/sections/{id:Int}" page={SectionPage} name="section" />
      <Route path="/sections" page={SectionsPage} name="sections" />
      <Route
        path="/indicator-values/new"
        page={NewIndicatorValuePage}
        name="newIndicatorValue"
      />
      <Route
        path="/indicator-values/{id:Int}/edit"
        page={EditIndicatorValuePage}
        name="editIndicatorValue"
      />
      <Route
        path="/indicator-values/{id:Int}"
        page={IndicatorValuePage}
        name="indicatorValue"
      />
      <Route
        path="/indicator-values"
        page={IndicatorValuesPage}
        name="indicatorValues"
      />
      <Route path="/dashboard" page={DashboardPage} name="dashboard" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
