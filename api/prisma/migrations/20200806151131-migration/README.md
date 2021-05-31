# Migration `20200806151131-migration`

This migration has been generated at 8/6/2020, 3:11:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "User" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL,
"name" TEXT ,
"departmentId" INTEGER ,
"workflowStatusId" INTEGER ,
FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE,

FOREIGN KEY ("workflowStatusId") REFERENCES "WorkflowStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "KPIValues" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"creationDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"modfiedDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"kPIId" INTEGER ,
"userId" INTEGER NOT NULL,
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("kPIId") REFERENCES "KPI"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Department" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"sectionId" INTEGER ,
FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Section" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL)

CREATE TABLE "KPI" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"formula" TEXT NOT NULL,
"type" TEXT NOT NULL,
"date" DATE NOT NULL,
"creationDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"modfiedDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"approvalStatus" TEXT NOT NULL,
"actualValue" INTEGER NOT NULL,
"currentValue" INTEGER NOT NULL,
"userId" INTEGER NOT NULL,
"departmentId" INTEGER NOT NULL,
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "KPIAttributes" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"type" TEXT NOT NULL)

CREATE TABLE "WorkflowStatus" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"workflowId" INTEGER ,
FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Workflow" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL)

CREATE UNIQUE INDEX "User.email" ON "User"("email")

CREATE UNIQUE INDEX "KPIValues.title" ON "KPIValues"("title")

CREATE UNIQUE INDEX "Department.title" ON "Department"("title")

CREATE UNIQUE INDEX "Section.title" ON "Section"("title")

CREATE UNIQUE INDEX "KPI.title" ON "KPI"("title")

CREATE UNIQUE INDEX "KPIAttributes.title" ON "KPIAttributes"("title")

CREATE UNIQUE INDEX "WorkflowStatus.title" ON "WorkflowStatus"("title")

CREATE UNIQUE INDEX "Workflow.title" ON "Workflow"("title")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200806151131-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,98 @@
+datasource DS {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = "native"
+}
+
+// Define your own datamodels here and run `yarn redwood db save` to create
+// migrations for them.
+// TODO: Please remove the following example:
+model User {
+  id               Int             @id @default(autoincrement())
+  email            String          @unique
+  password         String
+  name             String?
+  KPIValues        KPIValues[]
+  KPI              KPI[]
+  Department       Department?     @relation(fields: [departmentId], references: [id])
+  departmentId     Int?
+  WorkflowStatus   WorkflowStatus? @relation(fields: [workflowStatusId], references: [id])
+  workflowStatusId Int?
+}
+
+model KPIValues {
+  id           Int      @id @default(autoincrement())
+  title        String   @unique
+  description  String
+  creationDate DateTime @default(now())
+  modfiedDate  DateTime @default(now())
+  modifiedBy   User     @relation(fields: [userId], references: [id])
+  KPI          KPI?     @relation(fields: [kPIId], references: [id])
+  kPIId        Int?
+  userId       Int
+}
+
+model Department {
+  id          Int      @id @default(autoincrement())
+  title       String   @unique
+  description String
+  Section     Section? @relation(fields: [sectionId], references: [id])
+  sectionId   Int?
+  KPI         KPI[]
+  Employees   User[]
+}
+
+model Section {
+  id          Int          @id @default(autoincrement())
+  title       String       @unique
+  description String
+  departments Department[]
+}
+
+model KPI {
+  id             Int         @id @default(autoincrement())
+  title          String      @unique
+  description    String
+  formula        String
+  type           String
+  date           DateTime
+  values         KPIValues[]
+  creationDate   DateTime    @default(now())
+  modfiedDate    DateTime    @default(now())
+  modifiedBy     User        @relation(fields: [userId], references: [id])
+  approvalStatus String
+  actualValue    Int
+  currentValue   Int
+  userId         Int
+  owner          Department  @relation(fields: [departmentId], references: [id])
+  departmentId   Int
+}
+
+model KPIAttributes {
+  id          Int    @id @default(autoincrement())
+  title       String @unique
+  description String
+  type        String
+}
+
+model WorkflowStatus {
+  id           Int       @id @default(autoincrement())
+  title        String    @unique
+  description  String
+  Workflow     Workflow? @relation(fields: [workflowId], references: [id])
+  workflowId   Int?
+  participants User[]
+
+}
+
+model Workflow {
+  id          Int              @id @default(autoincrement())
+  title       String           @unique
+  description String
+  Statuses    WorkflowStatus[]
+
+}
```


