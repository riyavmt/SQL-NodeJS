const path = require('path');
const rootDir = require('../util/path')
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',//this is used for highlighting navigation item
    editing :false

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

//here we will pass edit product info
/*Editing a product : using id to edit the poduct and save it by not creatingh 
a new product rather replacing the xisting one*/

/*Query Parameter - they are provided in the url
they can be added to a url by adding a question mark (?)
and key -value pair separted by = and multiple pairs by &

e.g., ?edit=true&title=new
also called optional data

The route is determined upto the querstion mark*/
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;// Note: The extracted value is always a string so "true" instead of true
  if(!editMode) return res.redirect('/'); 
  const prodId = req.params.productId;  
  Product.findById(prodId, product =>{
    if(!product) return res.redirect('/');
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product//this is used for highlighting navigation item
    });
  })
  
};
/*Here we will get the product, edit it and replace it with the exising one */
exports.postEditProducts = (req,res)=>{

  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(prodId,updatedTitle,updatedImageUrl,updatedPrice,updatedDesc);
  updatedProduct.save();
  res.redirect('/admin/products')

}

//controller for deleteProduct route
exports.deleteProduct = (req,res)=>{
  const prodId = req.body.productId;
  console.log('id= '+prodId);
  Product.deleteProductById(prodId);
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
// exports.getContactPage = (req,res)=>{
//   res.sendFile(path.join(rootDir,'views','contactus.html'));
// }