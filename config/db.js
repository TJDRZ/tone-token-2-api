const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  /*
  TESTING ENV VARIABLES:
  
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  */
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Database is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { client, connectDB };
