import { v2 as cld } from "cloudinary";
cld.config({
  cloud_name: process.env.CLD,
  api_key: process.env.CLD_KEY,
  api_secret: process.env.CLD_SECRET,
});

export default cld;
