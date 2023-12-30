const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountUserSchema = new Schema(
  {
    username: String,
    password: String,
    date: { type: Date, default: Date.now },
  },
  { collection: "accountUser" }
);

const ProductTypeLaptopSchema = new Schema(
  {
    name_product_type: String,
    description: String,
    product_brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },
    create_date: {
      type: Date,
      default: Date.now,
    },
    update_date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "type_product_laptop" }
);
const ProductLaptopSchema = new Schema(
  {
    name_product: String,
    total: Number,
    description: String,
    thumbnail: [
      {
        type: String,
      },
    ],
    totalPurchases: Number,
    details: {
      cpu: String,
      ram: String,
      hard_drive: String,
      card_graphics: String,
      pin: String,
      screen: String,
      connector: [
        {
          type: String,
        },
      ],
      keyboard: String,
      audio: String,
      wifi_bluetooth: String,
      cam: String,
      system: String,
      weight: String,
      size: String,
      brands: String,
    },
    discount_percent: Number,
    inventory: Number,
    product_category: {
      type: Schema.Types.ObjectId,
      ref: "type_product_laptop",
      required: true,
    },
    product_brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },
    create_product: { type: Date, default: Date.now },
    update_product: { type: Date, default: Date.now },
  },
  { collection: "product_laptop" }
);
const MouseTypeSchema = new Schema(
  {
    name_type: String,
    description: String,
    product_brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },
    create_date: { type: Date, default: Date.now() },
    update_date: { type: Date, default: Date.now() },
  },
  {
    collection: "type_product_mouse",
  }
);
const MouseSchema = new Schema(
  {
    name: String,
    total: Number,
    guarantee: String,
    description: String,
    totalPurchases: Number,
    thumbnail: [
      {
        type: String,
      },
    ],
    details: {
      color: String,
      polling_rate: String,
      microprocessor: String,
      manufacturer: String,
      similar: String,
      connector: [
        {
          type: String,
        },
      ],
      wireless_technology: String,
      battery: String,
      sensor: String,
      resolution: String,
      max_acceleration: String,
      max_speed: String,
      size: String,
      weight: Number,
    },
    discount_percent: Number,
    inventory: Number,
    product_type__mouse: {
      type: Schema.Types.ObjectId,
      ref: "type_product_mouse",
      required: true,
    },
    product_brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },
  },
  {
    collection: "product_mouse",
  }
);
const CartSchema = new Schema(
  {
    id_account: {
      type: Schema.Types.ObjectId,
      ref: "accountUser",
      required: true,
    },
    account_name: String,
    email: String,
    items: {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      productType: { type: String, required: true },
      quantity: { type: Number, default: 1 },
    },
  },
  { collection: "cart" }
);
const BannerQcSchema = new Schema(
  {
    thumbnail: String,
    description: String,
  },
  { collection: "banner-qc" }
);
const BrandsSchema = new Schema(
  {
    name: String,
    type: String,
    description: String,
    thumbnail: String,
  },
  {
    collection: "brands",
  }
);
const KeybourdSchema = new Schema(
  {
    name: String,
    thumbnail: [
      {
        type: String,
      },
    ],
    layout: String,
    switch_key: String,
    pin: String,
    personal: String,
    foam: String,
    weight: String,
    size: String,
    connector: [
      {
        type: String,
      },
    ],
    configuration: String,
    keycap: String,
    support: String,
    accessory: String,
    software: String,
    compatibility: String,
    discount_percent: Number,
    inventory: Number,
    create_date: { type: Date, default: Date.now() },
    update_date: { type: Date, default: Date.now() },
    product_type_keybourd: {
      type: Schema.Types.ObjectId,
      ref: "type_product_keybourd",
      required: true,
    },
    product_brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },
  },
  {
    collection: "product-mouse",
  }
);
const KeybourdTypeSchema = new Schema(
  {
    name_type: String,
    description: String,
    product_brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },

    create_date: { type: Date, default: Date.now() },
    update_date: { type: Date, default: Date.now() },
  },
  {
    collection: "type_product_keybourd",
  }
);
const Brands = mongoose.model("brands", BrandsSchema);
const AccountDataUser = mongoose.model("accountUser", AccountUserSchema);
const ProductTypeLaptop = mongoose.model(
  "type_product_laptop",
  ProductTypeLaptopSchema
);
const ProductLaptop = mongoose.model("product_laptop", ProductLaptopSchema);
const MouseType = mongoose.model("type_product_mouse", MouseTypeSchema);
const Mouse = mongoose.model("product_mouse", MouseSchema);
const Cart = mongoose.model("cart", CartSchema);
const BannerQc = mongoose.model("banner_qc", BannerQcSchema);
const Keybourd = mongoose.model("product_keybourd", KeybourdSchema);
const KeybourdType = mongoose.model(
  "type_product_keybourd",
  KeybourdTypeSchema
);
module.exports = {
  AccountDataUser,
  ProductTypeLaptop,
  ProductLaptop,
  MouseType,
  Mouse,
  Cart,
  BannerQc,
  Brands,
  Keybourd,
  KeybourdType,
};
