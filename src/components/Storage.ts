import { v4 } from 'uuid';
import { UserData } from '../redux/myFormSlice';

export default class Storage {
  private static key: string = 'USER_DATA';

  private static getDataFromLocalStorage(): UserData[] {
    const dataString = localStorage.getItem(this.key);
    if (dataString) {
      return JSON.parse(dataString);
    }
    return [];
  }

  private static saveDataToLocalStorage(data: UserData[]): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  private static generateUserId(): string {
    return v4(); // Use uuidv4 to generate a unique ID
  }

  static saveOrUpdate(userData: UserData): void {
    const allData = this.getDataFromLocalStorage();
    const index = allData.findIndex(
      (data) => data.user_id === userData.user_id
    );

    if (index !== -1) {
      // Existing user, update data
      allData[index] = userData;
    } else {
      // New user, generate user_id and add to data
      userData.user_id = this.generateUserId();
      allData.push(userData);
    }

    this.saveDataToLocalStorage(allData);
  }

  static remove(user_ids: string[]): void {
    const allData = this.getDataFromLocalStorage();
    const newData = allData.filter((data) => !user_ids.includes(data.user_id));
    this.saveDataToLocalStorage(newData);
  }

  static getAll(): UserData[] {
    return this.getDataFromLocalStorage();
  }

  static getDataLength(): number {
    const allData = this.getDataFromLocalStorage();
    return allData.length;
  }

  static getUserData(user_id: string): UserData | undefined {
    const allData = this.getDataFromLocalStorage();
    return allData.find((data) => data.user_id === user_id);
  }
}
