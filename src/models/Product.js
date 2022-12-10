

export default class Product {
  static get model() {
    return "products";
  }

  static get schema() {
    return {
      name: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true, max: 10 },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      thumbnail: { type: String, required: false },
      timestamp: { type: Number },
    };
  }
}
