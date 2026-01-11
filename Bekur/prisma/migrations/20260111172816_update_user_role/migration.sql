/*
  Warnings:

  - You are about to drop the column `applicationId` on the `interview` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the `userApplication` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scholarshipApplicationId` to the `interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scholarshipApplicationId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ScholarshipApplicationStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'SUBMITTED', 'INTERVIEW', 'OFFERED', 'REJECTED', 'ACCEPTED', 'APPROVED');

-- DropForeignKey
ALTER TABLE "interview" DROP CONSTRAINT "interview_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "userApplication" DROP CONSTRAINT "userApplication_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "interview" DROP COLUMN "applicationId",
ADD COLUMN     "scholarshipApplicationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "applicationId",
ADD COLUMN     "scholarshipApplicationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "userApplication";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- CreateTable
CREATE TABLE "user_application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "country_applying_to" TEXT,
    "purpose" TEXT,
    "program" TEXT,
    "university" TEXT,
    "level" TEXT,
    "hasPassport" BOOLEAN NOT NULL DEFAULT false,
    "passportImg" TEXT,
    "transcriptImg" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "country" TEXT,
    "eligible_countries" TEXT[],
    "level" TEXT[],
    "fields_of_study" TEXT[],
    "benefits" TEXT[],
    "required_documents" TEXT[],
    "deadline" TEXT,
    "application_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scholarship_application" (
    "id" TEXT NOT NULL,
    "userApplicationId" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "status" "ScholarshipApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "score" INTEGER,
    "adminNotes" TEXT,
    "externalRef" TEXT,
    "appliedAt" TIMESTAMP(3),
    "reviewer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scholarship_application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotivationLetter" (
    "id" TEXT NOT NULL,
    "scholarshipApplicationId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "aiGenerated" BOOLEAN NOT NULL DEFAULT true,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MotivationLetter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scholarship_application_userApplicationId_scholarshipId_key" ON "scholarship_application"("userApplicationId", "scholarshipId");

-- AddForeignKey
ALTER TABLE "user_application" ADD CONSTRAINT "user_application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholarship_application" ADD CONSTRAINT "scholarship_application_userApplicationId_fkey" FOREIGN KEY ("userApplicationId") REFERENCES "user_application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholarship_application" ADD CONSTRAINT "scholarship_application_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotivationLetter" ADD CONSTRAINT "MotivationLetter_scholarshipApplicationId_fkey" FOREIGN KEY ("scholarshipApplicationId") REFERENCES "scholarship_application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_scholarshipApplicationId_fkey" FOREIGN KEY ("scholarshipApplicationId") REFERENCES "scholarship_application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview" ADD CONSTRAINT "interview_scholarshipApplicationId_fkey" FOREIGN KEY ("scholarshipApplicationId") REFERENCES "scholarship_application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
