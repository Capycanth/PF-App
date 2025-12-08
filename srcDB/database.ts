import mongoose from 'mongoose';

export async function initializeDatabase(port: number) {
    const url: string = `mongodb://127.0.0.1:${port}/pf-app`;

    try {
        await mongoose.connect(url, {
            dbName: 'pf-app'
        });

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}
