import  Router from 'express';
import  customerRoute from './customer.routes';

const routes = Router();

routes.use('/', customerRoute);

module.exports = routes;