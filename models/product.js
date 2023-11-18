const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
     
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, price,description) {
    this.id =id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    
    this.description = description;
    
  }

  save() {
    getProductsFromFile(products =>{
     
      if(this.id){
        const exisingProductIndex = products.findIndex(prod => prod.id.trim()===this.id.trim());
        const updatedProducts = [...products];
        updatedProducts[exisingProductIndex] = this;
        console.log(this);  
        fs.writeFile(p,JSON.stringify(updatedProducts),err =>{
          if(err) console.log(err)
        });
      }else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    })
     
  }
  //function to delete a product
  static deleteProductById(id){
    getProductsFromFile( products =>{
      const productIndex = products.findIndex(prod => prod.id.trim()===id.trim());
      products.splice(productIndex,1);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id,cb){
    getProductsFromFile((products) =>{
      const product = products.find((p) =>p.id.trim() === id.trim());
      cb(product);
    })
  }
};