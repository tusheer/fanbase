const customConfig: { port: number; origin: string; dbUri: string } = {
    port: 8000,
    origin: process.env.API as string,
    dbUri: process.env.MONGODBURL as string,
};

export default customConfig;
