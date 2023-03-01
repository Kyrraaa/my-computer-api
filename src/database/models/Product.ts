import { DataTypes, Model } from 'sequelize';
import sequelize from '../instance';
import Category from './Category';

class Product extends Model {}
Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Title cannot be null',
      },
    },
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 0,
      notNull: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  pictures: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'products',
  timestamps: false,
  underscored: true,
});

Category.hasMany(Product, { foreignKey: { allowNull: false, name: 'category_id' } });

export default Product;
