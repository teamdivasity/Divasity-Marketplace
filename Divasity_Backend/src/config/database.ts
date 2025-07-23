import {Sequelize} from 'sequelize';
import Dotenv from 'dotenv';

Dotenv.config()

export const database = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});