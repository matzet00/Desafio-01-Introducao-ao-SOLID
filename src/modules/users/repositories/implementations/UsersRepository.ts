import { v4 as uuidV4 } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    user.id = uuidV4();
    user.email = email;
    user.name = name;
    user.admin = false;
    user.created_at = new Date();
    user.updated_at = new Date();
    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.filter((x) => x.id === id)[0];
  }

  findByEmail(email: string): User | undefined {
    return this.users.filter((x) => x.email === email)[0];
  }

  turnAdmin(receivedUser: User): User {
    let userdb: User;
    const users = this.users.map((user) => {
      if (user.id === receivedUser.id) {
        user.admin = true;
        user.updated_at = new Date();
        userdb = user;
      }
      return user;
    });

    this.users = users;

    return userdb;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
