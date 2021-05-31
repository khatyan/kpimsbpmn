# Migration `20200817164836-migration`

This migration has been generated at 8/17/2020, 4:48:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Workflow" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"xml" TEXT NOT NULL)

INSERT INTO "new_Workflow" ("id", "title", "description") SELECT "id", "title", "description" FROM "Workflow"

PRAGMA foreign_keys=off;
DROP TABLE "Workflow";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Workflow" RENAME TO "Workflow";

CREATE UNIQUE INDEX "Workflow.title" ON "Workflow"("title")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200811182241-migration..20200817164836-migration
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
@@ -91,7 +91,8 @@
 model Workflow {
   id          Int              @id @default(autoincrement())
   title       String           @unique
   description String
+  xml         String
   Statuses    WorkflowStatus[]
 }
```


