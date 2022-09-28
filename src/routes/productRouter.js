const express = require("express");
const router = express.Router();
const path = require("path")
const multer = require("multer")
const productsController = require("../controllers/productController");


const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) =>{
    const folder = path.join(__dirname, '../../public/img');
    callback(null, folder)
  },
  filename: (req, file, callback) => {
    const imageName = req.body.name + path.extname(file.originalname);
    callback(null, imageName.replace(/ /g, '-'))
  }
})

const uploadFile = multer({storage: multerDiskStorage})

router.get("/list", productsController.list);
router.get("/detail/:id", productsController.detail);
router.get("/create", productsController.create);
router.post("/create", uploadFile.single('productImg') ,productsController.store);
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", uploadFile.single('productImg'), productsController.update);
router.delete("/edit/:id", productsController.delete);




module.exports = router