import { observable, action, computed } from 'mobx';
import 'isomorphic-fetch';

let store = null;
class IdentityStore {
  @observable phone = null
  @observable name = null
  @observable isLoading = null
  @observable error = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.initSession();
    }
  }

  async initSession() {
    const res = await fetch('/api/account', {
      credentials: 'include',
    });
    try {
      const user = await res.json();
      this.phone = user.phone;
      this.name = user.name;
      this.error = null;
    } catch (e) {
      this.error = 'server error';
    }
  }

  @computed get isLoggedIn() {
    return !!this.phone;
  }

  @action async login(userInfo) {
    this.isLoading = true;
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const user = await res.json();
      this.phone = user.phone;
      this.name = user.name;
      this.error = null;
    } catch (e) {
      this.error = 'server error';
    }

    this.isLoading = false;
  }

  @action async createAccount(account) {
    this.isLoading = true;
    try {
      const res = await fetch('/api/account', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });
      const user = await res.json();
      this.phone = user.phone;
      this.name = user.name;
      this.error = null;
    } catch (e) {
      this.error = 'server error';
    }

    this.isLoading = false;
  }
}

export default function init() {
  if (store === null || typeof window === 'undefined') {
    store = new IdentityStore();
  }
  return store;
}
