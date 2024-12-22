-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "admins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "doctors_services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doctor_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    CONSTRAINT "doctors_services_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "doctors_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doctor_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "booking_date" DATETIME NOT NULL,
    "booking_hour" TEXT NOT NULL,
    CONSTRAINT "appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
