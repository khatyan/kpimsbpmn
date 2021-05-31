# Migration `20200811175623-migration`

This migration has been generated at 8/11/2020, 5:56:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200811171709-migration..20200811175623-migration
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
@@ -68,9 +68,9 @@
   actualValue    Int
   currentValue   Int
   targetValue    Int
   userId         Int
-  owner          Department       @relation(fields: [departmentId], references: [id])
+  department     Department       @relation(fields: [departmentId], references: [id])
   departmentId   Int
 }
 model IndicatorAttribute {
```


