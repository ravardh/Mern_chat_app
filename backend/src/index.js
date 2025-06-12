import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // Reflect the request origin
    },
    credentials: true,
  })
);


const rootPath  = path.join(process.env.UPLOAD_FILE_PATH,"uploads");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(rootPath));

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({ Message: "Server Connected and working properly" });
});

app.use((err, req, res, next) => {
  console.log(err.stack);

  const StatusCode = err.statusCode || 500;
  res.status(StatusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`,);
  connectDB();
});
