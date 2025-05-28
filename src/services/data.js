// eclaim-backend/src/services/data.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getAllCompanies() {
  return prisma.company.findMany({ select: { id: true, name: true, address: true } })
}

async function getAllFactories() {
  return prisma.factory.findMany({
    select: { id: true, name: true, address: true, companyId: true }
  })
}

// **This** line is crucial:
module.exports = { getAllCompanies, getAllFactories }
