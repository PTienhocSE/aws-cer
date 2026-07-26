ALTER TABLE "PracticeSession"
ADD COLUMN "sourceId" TEXT,
ADD COLUMN "questionIds" TEXT NOT NULL DEFAULT '[]';

CREATE INDEX "PracticeSession_userId_questionBankId_mode_sourceId_idx"
ON "PracticeSession"("userId", "questionBankId", "mode", "sourceId");
