# Migration `20200811182241-migration`

This migration has been generated at 8/11/2020, 6:22:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200811181929-migration..20200811182241-migration
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
@@ -17,9 +17,9 @@
   password       String
   name           String?
   IndicatorValue IndicatorValue[]
   Indicator      Indicator[]
-  Department     Department?      @relation(fields: [departmentId], references: [id])
+  department     Department?      @relation(fields: [departmentId], references: [id])
   departmentId   Int?
   WorkflowStatus WorkflowStatus[]
 }
```


