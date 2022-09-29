import { Sequelize, Dialect } from 'sequelize';

const DEFAULT_DB_NAME = 'takeoff_staff';
const DEFAULT_DB_USER = 'root';
const DEFAULT_DB_PASSWORD = 'root';


const dialect = process.env.SQL_DIALECT as Dialect || 'mysql';
const host = process.env.DB_HOST || 'localhost';
const port = +process.env.DB_PORT || 3306;


const sequelize = new Sequelize(
    process.env.DB_NAME || DEFAULT_DB_NAME,
    process.env.DB_USER || DEFAULT_DB_USER,
    process.env.DB_PASSWORD || DEFAULT_DB_PASSWORD,
    {
        dialect,
        host,
        port,
    }
)

export default sequelize;