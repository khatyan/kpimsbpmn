# Migration `20200811100617-migration`

This migration has been generated at 8/11/2020, 10:06:17 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "IndicatorValue" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"creationDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"modfiedDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"IndicatorId" INTEGER ,
"userId" INTEGER NOT NULL,
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("IndicatorId") REFERENCES "Indicator"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Indicator" (
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

CREATE TABLE "IndicatorAttributes" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"description" TEXT NOT NULL,
"type" TEXT NOT NULL)

CREATE UNIQUE INDEX "IndicatorValue.title" ON "IndicatorValue"("title")

CREATE UNIQUE INDEX "Indicator.title" ON "Indicator"("title")

CREATE UNIQUE INDEX "IndicatorAttributes.title" ON "IndicatorAttributes"("title")

PRAGMA foreign_keys=off;
DROP TABLE "KPI";;
PRAGMA foreign_keys=on

PRAGMA foreign_keys=off;
DROP TABLE "KPIAttributes";;
PRAGMA foreign_keys=on

PRAGMA foreign_keys=off;
DROP TABLE "KPIValue";;
PRAGMA foreign_keys=on

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200806153217-migration..20200811100617-migration
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
@@ -11,39 +11,39 @@
 // Define your own datamodels here and run `yarn redwood db save` to create
 // migrations for them.
 // TODO: Please remove the following example:
 model User {
-  id               Int             @id @default(autoincrement())
-  email            String          @unique
+  id               Int              @id @default(autoincrement())
+  email            String           @unique
   password         String
   name             String?
-  KPIValue         KPIValue[]
-  KPI              KPI[]
-  Department       Department?     @relation(fields: [departmentId], references: [id])
+  IndicatorValue   IndicatorValue[]
+  Indicator        Indicator[]
+  Department       Department?      @relation(fields: [departmentId], references: [id])
   departmentId     Int?
-  WorkflowStatus   WorkflowStatus? @relation(fields: [workflowStatusId], references: [id])
+  WorkflowStatus   WorkflowStatus?  @relation(fields: [workflowStatusId], references: [id])
   workflowStatusId Int?
 }
-model KPIValue {
-  id           Int      @id @default(autoincrement())
-  title        String   @unique
+model IndicatorValue {
+  id           Int        @id @default(autoincrement())
+  title        String     @unique
   description  String
-  creationDate DateTime @default(now())
-  modfiedDate  DateTime @default(now())
-  modifiedBy   User     @relation(fields: [userId], references: [id])
-  KPI          KPI?     @relation(fields: [kPIId], references: [id])
-  kPIId        Int?
+  creationDate DateTime   @default(now())
+  modfiedDate  DateTime   @default(now())
+  modifiedBy   User       @relation(fields: [userId], references: [id])
+  Indicator    Indicator? @relation(fields: [IndicatorId], references: [id])
+  IndicatorId  Int?
   userId       Int
 }
 model Department {
-  id          Int      @id @default(autoincrement())
-  title       String   @unique
+  id          Int         @id @default(autoincrement())
+  title       String      @unique
   description String
-  Section     Section? @relation(fields: [sectionId], references: [id])
+  Section     Section?    @relation(fields: [sectionId], references: [id])
   sectionId   Int?
-  KPI         KPI[]
+  Indicator   Indicator[]
   Employees   User[]
 }
 model Section {
@@ -52,28 +52,28 @@
   description String
   departments Department[]
 }
-model KPI {
-  id             Int        @id @default(autoincrement())
-  title          String     @unique
+model Indicator {
+  id             Int              @id @default(autoincrement())
+  title          String           @unique
   description    String
   formula        String
   type           String
   date           DateTime
-  values         KPIValue[]
-  creationDate   DateTime   @default(now())
-  modfiedDate    DateTime   @default(now())
-  modifiedBy     User       @relation(fields: [userId], references: [id])
+  values         IndicatorValue[]
+  creationDate   DateTime         @default(now())
+  modfiedDate    DateTime         @default(now())
+  modifiedBy     User             @relation(fields: [userId], references: [id])
   approvalStatus String
   actualValue    Int
   currentValue   Int
   userId         Int
-  owner          Department @relation(fields: [departmentId], references: [id])
+  owner          Department       @relation(fields: [departmentId], references: [id])
   departmentId   Int
 }
-model KPIAttributes {
+model IndicatorAttributes {
   id          Int    @id @default(autoincrement())
   title       String @unique
   description String
   type        String
```


