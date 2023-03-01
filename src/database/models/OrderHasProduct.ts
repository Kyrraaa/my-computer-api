import { DataTypes, Model } from 'sequelize';
import sequelize from '../instance';
import Order from './Order';
import Product from './Product';

class OrderHasProduct extends Model {}
OrderHasProduct.init({
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'orders_has_products',
  timestamps: false,
  underscored: true,
});

Product.hasMany(OrderHasProduct, { foreignKey: 'product_id' });
Order.hasMany(OrderHasProduct, { foreignKey: 'order_id' });

export default OrderHasProduct;
