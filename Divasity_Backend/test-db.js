const { Sequelize } = require('sequelize');

// Test SQLite connection
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log
});

async function testConnection() {
    try {
        await database.authenticate();
        console.log('Database connection successful');
        
        // Test sync
        await database.sync({ force: false });
        console.log('Database sync successful');
        
    } catch (error) {
        console.error('Database connection failed:', error);
    } finally {
        await database.close();
    }
}

testConnection();