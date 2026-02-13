exports.cloudinarySourceOptions = {
  cloudName: process.env.CLOUDINARY_CLOUD,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  maxResults: 1000,
}

exports.cloudinaryTransformerOptions = {
  transformTypes: ["CloudinaryMedia"],
  defaultTransformations: process.env.MINIMAL
    ? ["c_fit", "h_300", "w_300"]
    : ["c_fit", "h_1600", "w_1600"],
}
