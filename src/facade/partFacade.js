class PartFacade {
    constructor(PartApplication) {
      this.PartApplication = PartApplication;
    }
  
    async getTotalPrice(code) {
      if (this.PartApplication.get(code)) {
        return this.PartApplication.getTotalPriceByQuantity(code);
      }
  
      return "Peça não encontrada";
    }
  
    async getTotalPriceByQuantity(code, quantity) {
      if (this.PartApplication.get(code)) {
        return this.PartApplication.getTotalPriceByQuantity(code, quantity);
      }
  
      return "Peça não encontrada";
    }
  
    async getAll() {
    if (this.PartApplication.getAll()) {
      return this.PartApplication.getAll();
    }
  
    return "Peça não encontrada";
  }
}
  module.exports = PartFacade;
  