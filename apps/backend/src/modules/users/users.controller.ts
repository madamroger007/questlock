import { Context } from 'hono';
import { UserService } from './users.service';

export class UserController {
  constructor(
    private service = new UserService()
  ) {}

  getAll = async (c: Context) => {
    const users =
      await this.service.getAllUsers();

    return c.json(users);
  };

  getById = async (c: Context) => {
    const id = c.req.param('id');

    const user =
      await this.service.getUser(id);

    return c.json(user);
  };
}