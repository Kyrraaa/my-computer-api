import { DataTypes, Model } from 'sequelize';
import sequelize from '../instance';

class Category extends Model {}
Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
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
  modelName: 'Category',
  tableName: 'categories',
  timestamps: false,
  underscored: true,
});

export default Category;
