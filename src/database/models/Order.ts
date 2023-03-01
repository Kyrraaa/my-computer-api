import { DataTypes, Model } from 'sequelize';
import sequelize from '../instance';
import User from './User';

class Order extends Model {}
Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'orders',
  timestamps: false,
  underscored: true,
});

User.hasOne(Order, { foreignKey: { allowNull: false, name: 'user_id' } });

export default Order;
