import { PrismaClient } from 'database';

const prisma = new PrismaClient();

export async function connectDB() {
    console.log(process.env.MONGODBURL);
    try {
        await prisma.$connect();
        console.log('? Database connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

export default prisma;
