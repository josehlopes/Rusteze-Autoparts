const Part = require("../service/Part");

class PartApplication {
  constructor(PartRepository) {
    this.PartApplication = partapplication;
  }

  async getTotalPriceByQuantity(code, quantity) {
    let productData = await this.PartApplication.getPartById(code);
    let part = new Part().toModel(productData);
    return product.getTotalPriceByQuantity(quantity);
  }

  async get(code) {
    return await this.PartApplication.getPartById(code);
  }

  async getAll() {
    return await this.PartApplication.getAll();
  }
}

module.exports = PartApplication;