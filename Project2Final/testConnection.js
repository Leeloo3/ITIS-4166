const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Successfully connected to MongoDB Atlas!');
        
        // Create a test document
        const TestModel = mongoose.model('Test', new mongoose.Schema({
            message: String,
            timestamp: { type: Date, default: Date.now }
        }));

        const testDoc = await TestModel.create({
            message: 'Test connection successful!'
        });
        
        console.log('✨ Test document created:', testDoc);

        // Clean up
        await TestModel.deleteMany({});
        await mongoose.connection.close();
        console.log('🔚 Connection closed successfully');
        
    } catch (error) {
        console.error('❌ Connection error:', error.message);
    }
}

testConnection(); 