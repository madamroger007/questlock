import { UserRepository } from './users.repository';

export class UserService {
  constructor(
    private repository = new UserRepository()
  ) {}

  async getAllUsers() {
    const { data, error } =
      await this.repository.findAll();

    if (error) throw error;

    return data;
  }

  async getUser(id: string) {
    const { data, error } =
      await this.repository.findById(id);

    if (error) throw error;

    return data;
  }
}