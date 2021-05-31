# Migration `20200811103904-migration`

This migration has been generated at 8/11/2020, 10:39:04 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "IndicatorAttribute" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"type" TEXT NOT NULL)

CREATE UNIQUE INDEX "IndicatorAttribute.title" ON "IndicatorAttribute"("title")

PRAGMA foreign_keys=off;
DROP TABLE "IndicatorAttributes";;
PRAGMA foreign_keys=on

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200811100617-migration..20200811103904-migration
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
@@ -71,9 +71,9 @@
   owner          Department       @relation(fields: [departmentId], references: [id])
   departmentId   Int
 }
-model IndicatorAttributes {
+model IndicatorAttribute {
   id          Int    @id @default(autoincrement())
   title       String @unique
   description String
   type        String
```


