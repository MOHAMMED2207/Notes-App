import  dbConnect  from "../../lib/db";

export default async function handler(req, res) {
  try {
    await dbConnect();
    res.status(200).json({ success: true, message: "✅ Connected to MongoDB Atlas successfully!" });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    res.status(500).json({ success: false, message: "❌ Connection failed", error: error.message });
  }
}
