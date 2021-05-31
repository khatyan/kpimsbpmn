# Migration `20200811180828-migration`

This migration has been generated at 8/11/2020, 6:08:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200811175623-migration..20200811180828-migration
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
@@ -62,9 +62,9 @@
   date           DateTime         @default(now())
   values         IndicatorValue[]
   creationDate   DateTime         @default(now())
   modfiedDate    DateTime         @default(now())
-  modifiedBy     User             @relation(fields: [userId], references: [id])
+  user           User             @relation(fields: [userId], references: [id])
   approvalStatus String
   actualValue    Int
   currentValue   Int
   targetValue    Int
```


