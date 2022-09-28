const fs = require('fs');
const path = require('path')


const getData = () =>{
  const jsonData = fs.readFileSync(path.join(__dirname, '../data/products.json'));
  const data = JSON.parse(jsonData)
  return data
}


const writeData = (data) =>{
  const dataString = JSON.stringify(data, null, 4)
  fs.writeFileSync(path.join(__dirname, '../data/products.json'), dataString)
}


/*Controller*/

const productsController = {
  list: function(req, res){
      res.render("menu-products", {products: getData()});
  },

  detail: function(req, res){

    const data = getData();
    const product = data.find(element => element.id == req.params.id)
    res.render("product-detail", {product: product});
  },

  create: function(req, res){
    res.render("product-create-form");
  },

  store: function(req, res){

    const data = getData();

    const newProduct = {
      id: data.length+1,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      img: req.file.filename ? req.file.filename : "",
    }
  
    data.push(newProduct);
    writeData(data);
    res.redirect("/products/create");
  
  },

  edit: function(req, res){
    const data = getData();
    const product = data.find(element => element.id == req.params.id)
    res.render("product-update-form", {product: product});
  },

  update: function(req, res){
    const data = getData();
    const product = data.find(element => element.id == req.params.id);

    product.name = req.body.name;
    product.price = Number(req.body.price);
    product.description = req.body.description;
    product.img = req.file.filename;
    writeData(data)
    res.redirect('/products/list')
  },

  delete: function(req, res){
    const data = getData();
    const product = data.filter(element => element.id != req.params.id);
    writeData(product)
    res.redirect('/products/list')
  },
}   


module.exports = productsController;