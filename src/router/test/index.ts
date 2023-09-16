import { Router } from 'express';
import { Item, Store } from '../../models/Items.schema';

const router = Router();

router.get('/ping', async (_req, res) => {
  try {
    // Find the item with the name 'Item 1'
    const item = new Item({ name: 'Item 1' });
    await item.save();
    const findItem = await Item.findOne({ name: 'Item 1' });

    if (!findItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    const store = new Store({ name: 'Store 1' });
    store.items.push(findItem._id);
    await store.save();

    console.log('someone pinged here');
    return res.send('pong');
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
