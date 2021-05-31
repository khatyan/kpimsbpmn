# Migration `20200806153217-migration`

This migration has been generated at 8/6/2020, 3:32:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "KPIValue" (
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

CREATE UNIQUE INDEX "KPIValue.title" ON "KPIValue"("title")

PRAGMA foreign_keys=off;
DROP TABLE "KPIValues";;
PRAGMA foreign_keys=on

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200806151131-migration..20200806153217-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource DS {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
@@ -15,17 +15,17 @@
   id               Int             @id @default(autoincrement())
   email            String          @unique
   password         String
   name             String?
-  KPIValues        KPIValues[]
+  KPIValue         KPIValue[]
   KPI              KPI[]
   Department       Department?     @relation(fields: [departmentId], references: [id])
   departmentId     Int?
   WorkflowStatus   WorkflowStatus? @relation(fields: [workflowStatusId], references: [id])
   workflowStatusId Int?
 }
-model KPIValues {
+model KPIValue {
   id           Int      @id @default(autoincrement())
   title        String   @unique
   description  String
   creationDate DateTime @default(now())
@@ -53,23 +53,23 @@
   departments Department[]
 }
 model KPI {
-  id             Int         @id @default(autoincrement())
-  title          String      @unique
+  id             Int        @id @default(autoincrement())
+  title          String     @unique
   description    String
   formula        String
   type           String
   date           DateTime
-  values         KPIValues[]
-  creationDate   DateTime    @default(now())
-  modfiedDate    DateTime    @default(now())
-  modifiedBy     User        @relation(fields: [userId], references: [id])
+  values         KPIValue[]
+  creationDate   DateTime   @default(now())
+  modfiedDate    DateTime   @default(now())
+  modifiedBy     User       @relation(fields: [userId], references: [id])
   approvalStatus String
   actualValue    Int
   currentValue   Int
   userId         Int
-  owner          Department  @relation(fields: [departmentId], references: [id])
+  owner          Department @relation(fields: [departmentId], references: [id])
   departmentId   Int
 }
 model KPIAttributes {
@@ -85,9 +85,8 @@
   description  String
   Workflow     Workflow? @relation(fields: [workflowId], references: [id])
   workflowId   Int?
   participants User[]
-
 }
 model Workflow {
   id          Int              @id @default(autoincrement())
```


