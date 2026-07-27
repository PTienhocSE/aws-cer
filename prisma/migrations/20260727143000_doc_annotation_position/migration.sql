ALTER TABLE "DocAnnotation"
ADD COLUMN "startOffset" INTEGER,
ADD COLUMN "endOffset" INTEGER,
ADD COLUMN "contextBefore" TEXT,
ADD COLUMN "contextAfter" TEXT;
