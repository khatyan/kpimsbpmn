# Migration `20200811181929-migration`

This migration has been generated at 8/11/2020, 6:19:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "_UserToWorkflowStatus" (
"A" INTEGER NOT NULL,
"B" INTEGER NOT NULL,
FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("B") REFERENCES "WorkflowStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "new_User" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL,
"name" TEXT ,
"departmentId" INTEGER ,
FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

INSERT INTO "new_User" ("id", "email", "password", "name", "departmentId") SELECT "id", "email", "password", "name", "departmentId" FROM "User"

PRAGMA foreign_keys=off;
DROP TABLE "User";;
PRAGMA foreign_keys=on

ALTER TABLE "new_User" RENAME TO "User";

CREATE UNIQUE INDEX "User.email" ON "User"("email")

CREATE UNIQUE INDEX "_UserToWorkflowStatus_AB_unique" ON "_UserToWorkflowStatus"("A","B")

CREATE  INDEX "_UserToWorkflowStatus_B_index" ON "_UserToWorkflowStatus"("B")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200811180828-migration..20200811181929-migration
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
@@ -11,18 +11,17 @@
 // Define your own datamodels here and run `yarn redwood db save` to create
 // migrations for them.
 // TODO: Please remove the following example:
 model User {
-  id               Int              @id @default(autoincrement())
-  email            String           @unique
-  password         String
-  name             String?
-  IndicatorValue   IndicatorValue[]
-  Indicator        Indicator[]
-  Department       Department?      @relation(fields: [departmentId], references: [id])
-  departmentId     Int?
-  WorkflowStatus   WorkflowStatus?  @relation(fields: [workflowStatusId], references: [id])
-  workflowStatusId Int?
+  id             Int              @id @default(autoincrement())
+  email          String           @unique
+  password       String
+  name           String?
+  IndicatorValue IndicatorValue[]
+  Indicator      Indicator[]
+  Department     Department?      @relation(fields: [departmentId], references: [id])
+  departmentId   Int?
+  WorkflowStatus WorkflowStatus[]
 }
 model IndicatorValue {
   id           Int        @id @default(autoincrement())
```


