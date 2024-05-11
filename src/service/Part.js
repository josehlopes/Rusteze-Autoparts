class Part {
    constructor(code, name, supllier, stock, purchase_price, sale_value) {
      this.code = code;
      this.name = name;
      this.supllier = supllier;
      this.stock = stock;
      this.purchase_price = purchase_price;
      this.sale_value = sale_value;
    }
  
    getTotalValueByQuantity(quantity) {
      return this.sale_value * quantity;
    }
  
    toString() {
      return `${this.code} - ${this.name} - ${this.supllier}- ${this.stock} - ${this.purchase_price} - ${this.sale_value}`;
    }
  
    toModel(productData) {
      this.code = productData.productId;
      this.name = productData.name;
      this.supllier = productData.supllier;
      this.stock = productData.stock;
      this.purchase_price = productData.purchase_price;
      this.sale_value = productData.sale_value;
  
      return this;
    }
  }
  
  module.exports = Part;