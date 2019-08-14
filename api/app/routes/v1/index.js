import  Router from 'express';
import  customerRoute from './customer.routes';
import  departmentRoute from './department.routes';
import  categoryRoute from './category.routes';
import  attributeRoute from './attributes.routes';
import  productRoute from './product.routes';
import  orderRoute from './order.routes';
import  cartRoute from './cart.routes';
import  tsRoute from './tax.shipping.routes';
import  stripeRoute from './stripe.routes';

const routes = Router();

routes.use('/', customerRoute);
routes.use('/', departmentRoute);
routes.use('/', categoryRoute);
routes.use('/', attributeRoute);
routes.use('/', productRoute);
routes.use('/', orderRoute);
routes.use('/', cartRoute);
routes.use('/', tsRoute);
routes.use('/', stripeRoute);

module.exports = routes;
