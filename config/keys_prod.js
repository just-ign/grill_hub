module.exports = {
  mongoURI: process.env.MONGO_URI,
  encryptKey: process.env.ENCRYPT_KEY,
  s3Bucket: process.env.BUCKET_NAME,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  razorKeyId: process.env.RAZOR_KEY_ID,
  razorKeySecret: process.env.RAZOR_KEY_SECRET,
  razorSecret: process.env.RAZOR_SECRET,
};
