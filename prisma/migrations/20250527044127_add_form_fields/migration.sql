-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'APPROVER1', 'APPROVER2', 'APPROVER3', 'ADMIN');

-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('DRAFT', 'PENDING_APPROVE_1', 'PENDING_APPROVE_2', 'PENDING_APPROVE_3', 'PENDING_CONFIRM', 'CONFIRMED', 'REJECTED', 'RENEWED');

-- CreateEnum
CREATE TYPE "RenewalType" AS ENUM ('EXTEND', 'REDUCE', 'INCREASE', 'CANCEL', 'MODIFY');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "InsuranceForm" (
    "formId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "FormStatus" NOT NULL DEFAULT 'DRAFT',
    "company" TEXT NOT NULL,
    "factory" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "insuranceGroup" TEXT NOT NULL,
    "insuranceType1" TEXT NOT NULL,
    "licenseNumber" TEXT,
    "insuranceReason" TEXT NOT NULL,
    "insuranceAmount" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "placeCount" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "endTime" TEXT NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "coverageDetail" TEXT NOT NULL,
    "insuranceDocs" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "notes" TEXT,
    "requestCompany" TEXT NOT NULL,
    "requestAddress" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "costCenter" TEXT NOT NULL,
    "ioNumber" INTEGER NOT NULL,
    "accountCode" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "requester" TEXT NOT NULL,
    "supervisor" TEXT NOT NULL,
    "inspector" TEXT NOT NULL,

    CONSTRAINT "InsuranceForm_pkey" PRIMARY KEY ("formId")
);

-- CreateTable
CREATE TABLE "Approval" (
    "approvalId" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "approverId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "decision" TEXT NOT NULL,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "Approval_pkey" PRIMARY KEY ("approvalId")
);

-- CreateTable
CREATE TABLE "AdminConfirmation" (
    "confirmId" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "AdminConfirmation_pkey" PRIMARY KEY ("confirmId")
);

-- CreateTable
CREATE TABLE "History" (
    "historyId" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("historyId")
);

-- CreateTable
CREATE TABLE "Renewal" (
    "renewalId" TEXT NOT NULL,
    "originalFormId" TEXT NOT NULL,
    "newFormId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Renewal_pkey" PRIMARY KEY ("renewalId")
);


CREATE TABLE company (
  id       TEXT PRIMARY KEY,
  name     TEXT NOT NULL,
  address  TEXT NOT NULL
);

CREATE TABLE factory (
  id        TEXT PRIMARY KEY,
  name      TEXT NOT NULL,
  address   TEXT NOT NULL,
  companyId TEXT NOT NULL REFERENCES company(id)
);



-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "InsuranceForm" ADD CONSTRAINT "InsuranceForm_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_formId_fkey" FOREIGN KEY ("formId") REFERENCES "InsuranceForm"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminConfirmation" ADD CONSTRAINT "AdminConfirmation_formId_fkey" FOREIGN KEY ("formId") REFERENCES "InsuranceForm"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminConfirmation" ADD CONSTRAINT "AdminConfirmation_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_formId_fkey" FOREIGN KEY ("formId") REFERENCES "InsuranceForm"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renewal" ADD CONSTRAINT "Renewal_originalFormId_fkey" FOREIGN KEY ("originalFormId") REFERENCES "InsuranceForm"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renewal" ADD CONSTRAINT "Renewal_newFormId_fkey" FOREIGN KEY ("newFormId") REFERENCES "InsuranceForm"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renewal" ADD CONSTRAINT "Renewal_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
