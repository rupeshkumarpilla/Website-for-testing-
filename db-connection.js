// db-connection.js: The JavaScript file for database connection options

// Import required libraries
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { Sequelize } from 'sequelize';
import { createPool } from 'mysql2/promise';
import { Pool } from 'pg';

// Load environment variables from .env file
dotenv.config();

// Define database connection options
const dbOptions = {
  // MongoDB connection options
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    database: process.env.MONGODB_DATABASE || 'rooz',
    username: process.env.MONGODB_USERNAME || 'roozuser',
    password: process.env.MONGODB_PASSWORD || 'roozpassword',
  },
  // MySQL connection options
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE || 'rooz',
    username: process.env.MYSQL_USERNAME || 'roozuser',
    password: process.env.MYSQL_PASSWORD || 'roozpassword',
  },
  // PostgreSQL connection options
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DATABASE || 'rooz',
    username: process.env.POSTGRES_USERNAME || 'roozuser',
    password: process.env.POSTGRES_PASSWORD || 'roozpassword',
  },
};

// Create a function to connect to the database
async function connectToDatabase(dbType) {
  try {
    switch (dbType) {
      case 'mongodb':
        const mongoClient = new MongoClient(dbOptions.mongodb.uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        await mongoClient.connect();
        console.log('Connected to MongoDB');
        return mongoClient;
      case 'mysql':
        const mysqlPool = createPool({
          host: dbOptions.mysql.host,
          port: dbOptions.mysql.port,
          database: dbOptions.mysql.database,
          user: dbOptions.mysql.username,
          password: dbOptions.mysql.password,
        });
        console.log('Connected to MySQL');
        return mysqlPool;
      case 'postgres':
        const postgresPool = new Pool({
          host: dbOptions.postgres.host,
          port: dbOptions.postgres.port,
          database: dbOptions.postgres.database,
          user: dbOptions.postgres.username,
          password: dbOptions.postgres.password,
        });
        console.log('Connected to PostgreSQL');
        return postgresPool;
      default:
        throw new Error('Invalid database type');
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

// Create a function to disconnect from the database
async function disconnectFromDatabase(dbType, dbConnection) {
  try {
    switch (dbType) {
      case 'mongodb':
        await dbConnection.close();
        console.log('Disconnected from MongoDB');
        break;
      case 'mysql':
        await dbConnection.end();
        console.log('Disconnected from MySQL');
        break;
      case 'postgres':
        await dbConnection.end();
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
