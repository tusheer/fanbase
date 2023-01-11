import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const admin = await prisma.admin.upsert({
        where: { email: 'admin007@fanbase.com' },
        update: {},
        create: {
            email: 'admin007@fanbase.com',
            password: 'hello1234#$23-==-2323;l;l',
            firstName: 'Super',
            lastName: 'Admin',
        },
    });
    console.log({ admin });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
