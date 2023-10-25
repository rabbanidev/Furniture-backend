import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import cloudinary from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: "dirz3oect",
  api_key: "889752758548599",
  api_secret: "s2_IwbY7KI5vXlsB5gi1M6Yzi5o",
});

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, `./uploads`));
  },
  filename: (req, file, cb) => {
    const extensionName = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(extensionName, "")
        .toLowerCase()
        .split(" ")
        .join("-") + Date.now();
    cb(null, fileName + extensionName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only png, jpg, jpeg and pdf files are supported."), false);
    }
  },
});

const singleImageUpload = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath);
    const image = { id: result.public_id, url: result.secure_url };
    return image;
  } catch (error) {
    return error.message;
  }
};

const multipleImageUpload = (files) => {
  let resPromises = files.map(
    (file) =>
      new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path, (error, result) => {
          if (error) reject(error);
          else {
            const images = { id: result.public_id, url: result.secure_url };
            resolve(images);
          }
        });
      })
  );
  return Promise.all(resPromises);
};

export { upload, singleImageUpload, multipleImageUpload };
