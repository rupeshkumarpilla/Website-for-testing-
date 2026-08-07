// database.js: The JavaScript file for database connections

// Import required libraries
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { createPool } from 'mysql2/promise';

// Load environment variables from .env file
dotenv.config();

// Define database connection options
const dbOptions = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB_NAME,
  },
  // MySQL connection options
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  // PostgreSQL connection options
  postgres: {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  },
};

// Create a MongoDB client
const mongoClient = new MongoClient(dbOptions.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MySQL pool
const mysqlPool = createPool({
  host: dbOptions.mysql.host,
  user: dbOptions.mysql.user,
  password: dbOptions.mysql.password,
  database: dbOptions.mysql.database,
});

// Create a PostgreSQL Sequelize instance
const postgresSequelize = new Sequelize(dbOptions.postgres.database, dbOptions.postgres.user, dbOptions.postgres.password, {
  host: dbOptions.postgres.host,
  port: dbOptions.postgres.port,
  dialect: 'postgres',
});

// Define a function to connect to the database
async function connectToDatabase(dbType) {
  try {
    switch (dbType) {
      case 'mongo':
        await mongoClient.connect();
        console.log('Connected to MongoDB');
        return mongoClient;
      case 'mysql':
        await mysqlPool.getConnection();
        console.log('Connected to MySQL');
        return mysqlPool;
      case 'postgres':
        await postgresSequelize.authenticate();
        console.log('Connected to PostgreSQL');
        return postgresSequelize;
      default:
        throw new Error('Invalid database type');
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

// Define a function to disconnect from the database
async function disconnectFromDatabase(dbType, dbClient) {
  try {
    switch (dbType) {
      case 'mongo':
        await dbClient.close();
        console.log('Disconnected from MongoDB');
        break;
      case 'mysql':
        await dbClient.end();
        console.log('Disconnected from MySQL');
        break;
      case 'postgres':
        await dbClient.close();
        console.log('Disconnected from PostgreSQL');
        break;
      default:
        throw new Error('Invalid database type');
    }
  } catch (error) {
    console.error('Error disconnecting from database:', error);
    throw error;
  }
}

// Export the database connection functions
export { connectToDatabase, disconnectFromDatabase };
