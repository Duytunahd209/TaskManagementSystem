import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";


dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Task Management System!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/tasks", taskRoutes);