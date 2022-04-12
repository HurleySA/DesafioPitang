-- CreateTable
CREATE TABLE "VaccineSchedule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "born_date" TIMESTAMP(3) NOT NULL,
    "vaccination_date" TIMESTAMP(3) NOT NULL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "conclusion" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VaccineSchedule_pkey" PRIMARY KEY ("id")
);
