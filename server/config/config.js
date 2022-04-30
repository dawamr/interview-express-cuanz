const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envSchema = Joi.object({

    NODE_ENV: Joi.string().default('development'),

    PORT: Joi.number(),

    DB_HOST: Joi.string().default('127.0.0.1'),

    DB_PORT: Joi.number().default(3306),

    DB_NAME: Joi.string().default('movies'),

    DB_USER: Joi.string().default('root'),

    DB_PASSWORD: Joi.string().empty(['', null]),
    
}).unknown()
    .required();

const { error, value: env } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: env.NODE_ENV,
    port: env.PORT,
    db_host: env.DB_HOST,
    db_port: env.DB_PORT,
    db_name: env.DB_NAME,
    db_user: env.DB_USER,
    db_password: env.DB_PASSWORD

};

module.exports = config;