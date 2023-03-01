import { Sequelize } from 'sequelize';
import 'dotenv/config';

// instance with all the variables

const database: any = {
  host: process.env.DATABASE_HOST,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialect: process.env.DATABASE_DIALECT,
};

// create a new instance of sequelize

const sequelize = new Sequelize(database.name, database.username, database.password, {
  host: database.host,
  dialect: database.dialect,
  logging: false, // Avoid default execution sequelize
  timezone: '+02:00',
});

export default sequelize;
