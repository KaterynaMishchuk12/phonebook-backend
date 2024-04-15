import app from "./app.js";
import { connectDB } from "./db/connection.js";

const { PORT } = process.env;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
