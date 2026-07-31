const dns = require("dns");
const mongoose = require("mongoose");

const createConnectionOptions = () => ({
  serverSelectionTimeoutMS: 10000,
});

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const fallbackUri = process.env.MONGO_URI_FALLBACK;
  const dnsServers = process.env.MONGO_DNS_SERVERS;

  if (!uri) {
    throw new Error("Missing MONGO_URI environment variable. Check your .env file.");
  }

  if (dnsServers) {
    dns.setServers(dnsServers.split(",").map((server) => server.trim()));
    console.log(`Using custom DNS servers: ${dnsServers}`);
  }

  const connect = async (connectionString) => {
    const conn = await mongoose.connect(connectionString, createConnectionOptions());
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  };

  try {
    await connect(uri);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    if (fallbackUri) {
      console.warn("⚠️ Primary connection failed, trying fallback URI from MONGO_URI_FALLBACK.");
      try {
        await connect(fallbackUri);
        return;
      } catch (fallbackError) {
        console.error("❌ Fallback MongoDB Connection Error:", fallbackError.message);
      }
    }

    console.error("Ensure MongoDB Atlas network access is allowed for your IP and DNS SRV is supported.");
    console.error("If your environment blocks SRV DNS, use a standard mongodb:// connection string instead of mongodb+srv://.");
    console.error("You can also set MONGO_DNS_SERVERS=1.1.1.1,8.8.8.8 in .env to force external DNS resolution.");
    process.exit(1);
  }
};

module.exports = connectDB;
