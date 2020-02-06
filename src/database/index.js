import Sequelize from 'sequelize';
import databaseCofig from '../config/database';

import User from '../app/models/User';

const models = [User];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseCofig);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();