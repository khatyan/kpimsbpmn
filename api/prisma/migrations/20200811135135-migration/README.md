# Migration `20200811135135-migration`

This migration has been generated at 8/11/2020, 1:51:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Indicator" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"formula" TEXT NOT NULL,
"type" TEXT NOT NULL,
"date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

INSERT INTO "new_Indicator" ("id", "title", "description", "formula", "type", "date", "creationDate", "modfiedDate", "approvalStatus", "actualValue", "currentValue", "userId", "departmentId") SELECT "id", "title", "description", "formula", "type", "date", "creationDate", "modfiedDate", "approvalStatus", "actualValue", "currentValue", "userId", "departmentId" FROM "Indicator"

PRAGMA foreign_keys=off;
DROP TABLE "Indicator";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Indicator" RENAME TO "Indicator";

CREATE UNIQUE INDEX "Indicator.title" ON "Indicator"("title")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200811103904-migration..20200811135135-migration
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
@@ -58,9 +58,9 @@
   title          String           @unique
   description    String
   formula        String
   type           String
-  date           DateTime
+  date           DateTime         @default(now())
   values         IndicatorValue[]
   creationDate   DateTime         @default(now())
   modfiedDate    DateTime         @default(now())
   modifiedBy     User             @relation(fields: [userId], references: [id])
```


