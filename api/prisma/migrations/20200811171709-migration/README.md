# Migration `20200811171709-migration`

This migration has been generated at 8/11/2020, 5:17:09 PM.
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
"targetValue" INTEGER NOT NULL,
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
migration 20200811135135-migration..20200811171709-migration
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
@@ -39,9 +39,9 @@
 model Department {
   id          Int         @id @default(autoincrement())
   title       String      @unique
   description String
-  Section     Section?    @relation(fields: [sectionId], references: [id])
+  section     Section?    @relation(fields: [sectionId], references: [id])
   sectionId   Int?
   Indicator   Indicator[]
   Employees   User[]
 }
@@ -66,8 +66,9 @@
   modifiedBy     User             @relation(fields: [userId], references: [id])
   approvalStatus String
   actualValue    Int
   currentValue   Int
+  targetValue    Int
   userId         Int
   owner          Department       @relation(fields: [departmentId], references: [id])
   departmentId   Int
 }
```


