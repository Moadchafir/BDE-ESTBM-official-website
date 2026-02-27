console.log('Starting seed script...')
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()
console.log('Env loaded, URL found:', !!process.env.DATABASE_URL)

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
})

async function main() {
    console.log('Starting seed process...')
    const dbPath = path.join(process.cwd(), 'lib/db.json')

    if (!fs.existsSync(dbPath)) {
        console.log('No db.json found at:', dbPath)
        return
    }

    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
    console.log('Loaded db.json with', data.members?.length || 0, 'members,', data.events?.length || 0, 'events.')

    console.log('Seeding members...')
    for (const member of data.members || []) {
        console.log(`  Adding member: ${member.name}`)
        await prisma.member.upsert({
            where: { id: member.id },
            update: {},
            create: {
                id: member.id,
                name: member.name,
                role: member.role,
                src: member.src,
                ig: member.socials?.ig || null,
                li: member.socials?.li || null,
                order: member.order,
                bio: member.bio,
            },
        })
    }

    console.log('Seeding events...')
    for (const event of data.events || []) {
        console.log(`  Adding event: ${event.title}`)
        await prisma.event.upsert({
            where: { id: event.id },
            update: {},
            create: {
                id: event.id,
                title: event.title,
                date: event.date,
                location: event.location,
                type: event.type,
                image: event.image,
                description: event.description,
            },
        })
    }

    console.log('Seeding recruitment requests...')
    for (const recruit of data.recruit || []) {
        console.log(`  Adding recruitment for role: ${recruit.role}`)
        await prisma.recruit.create({
            data: {
                fullName: recruit.fullName || "Ancien Candidat",
                email: recruit.email || "inconnu@estbm.ac.ma",
                phoneNumber: recruit.phoneNumber || "0000000000",
                role: recruit.role,
                motivation: recruit.motivation,
                capability: recruit.capability,
                cv: recruit.cv,
                createdAt: new Date(recruit.createdAt),
            },
        })
    }

    console.log('Seeding contact requests...')
    for (const contact of data.contact || []) {
        console.log(`  Adding contact from: ${contact.email}`)
        await prisma.contact.create({
            data: {
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
                subject: contact.subject,
                message: contact.message,
                createdAt: new Date(contact.createdAt),
            },
        })
    }

    console.log('Seed finished successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
