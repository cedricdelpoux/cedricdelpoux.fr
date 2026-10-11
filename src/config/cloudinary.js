exports.cloudinarySourceOptions = {
  cloudName: process.env.CLOUDINARY_CLOUD,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  maxResults: 1000,
}

// No size in `defaultTransformations`: appended to the size of each image,
// it overrides it, placeholders included
exports.cloudinaryTransformerOptions = {
  transformTypes: ["CloudinaryMedia"],
}
