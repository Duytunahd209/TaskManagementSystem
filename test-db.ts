import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load biến môi trường từ .env

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => {
    console.log("Kết nối thành công đến PostgreSQL!");
    return client.end();
  })
  .catch(err => {
    console.error("Kết nối thất bại:", err);
  });