import UserStorage from './user';
import LanguageStorage from './language';

class Storage {
  constructor() {
    this.user = new UserStorage();
    this.language = new LanguageStorage();
  }

  initial = async () => {
    await this.user.retrieve();
    await this.language.retrieve();
  };
}

const storage = new Storage();
export default storage;
