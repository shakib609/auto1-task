// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

class LocalStorage {
  private store: { [key: string]: string } = {};

  getItem = (key: string) => {
    return this.store[key] || null;
  };

  setItem = (key: string, value: string) => {
    this.store[key] = value.toString();
  };

  removeItem = (key: string) => {
    delete this.store[key];
  };

  reset = () => {
    this.store = {};
  };

  length = Object.keys(this.store).length;

  clear = () => this.reset();

  key = (index: number) => null;
}

global.localStorage = new LocalStorage();
