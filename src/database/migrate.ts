import sequelize from './instance';
import Category from './models/Category';
import Product from './models/Product';
import User from './models/User';
import Order from './models/Order';
import OrderHasProduct from './models/OrderHasProduct';

// function that migrate models into database

async function migrate() {
  try {
    await sequelize.authenticate();

    await User.sync();
    await Category.sync();
    await Product.sync();
    await Order.sync();
    await OrderHasProduct.sync();
  } catch (error) {
    console.error('Error');
  } finally {
    await sequelize.close();
  }
}

migrate();
