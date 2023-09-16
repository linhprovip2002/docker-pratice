import mongoose, { Schema } from 'mongoose';


const itemSchema = new Schema({
    name: String,
    stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }]
  });

  const storeSchema = new Schema({
    name: String,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
  });

const Item = mongoose.model('Item', itemSchema);
const Store = mongoose.model('Store', storeSchema);
export { Item, Store };