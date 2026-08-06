import { Hono } from 'hono';
import { UserController } from './users.controller';

const users = new Hono();

const controller = new UserController();

users.get('/', controller.getAll);

users.get('/:id', controller.getById);

export default users;