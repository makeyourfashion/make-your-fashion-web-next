import { observable, action, computed } from 'mobx';
import 'isomorphic-fetch';
import Router from 'next/router';
import { HOST } from '../utils';

let store = null;
class IdentityStore {
  @observable id = null
  @observable phone = null
  @observable name = null
  @observable address = null
  @observable email = null
  @observable isLoading = null
  @observable error = null
  @observable histories = []

  constructor(histories = []) {
    this.isServer = typeof window === 'undefined';
    if (!this.isServer) {
      this.initSession();
    }
    this.histories = histories;
  }

  async initSession() {
    const res = await fetch('/api/users', {
      credentials: 'include',
    });
    try {
      const user = await res.json();
      this.id = user.id;
      this.phone = user.phone;
      this.name = user.name;
      this.address = user.address;
      this.email = user.email;
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
      this.id = user.id;
      this.name = user.name;
      this.address = user.address;
      this.phone = user.phone;
      this.email = user.email;
      this.error = null;
    } catch (e) {
      this.error = 'server error';
    }

    this.isLoading = false;
  }

  // @action async saveAccountDetails(details) {
  //   this.name = details.name;
  //   this.phone = details.phone;
  //   this.address = details.address;
  //   this.email = details.email;
  // }

  @action async fetchHistories() {
    if (!this.histories.length) {
      this.isLoading = true;
      try {
        const res = await fetch(`${HOST}api/orders`, {
          credentials: 'include',
        });
        this.histories = await res.json();
      } catch (e) {
        this.error = 'server error';
      }
    }
    this.isLoading = false;
  }

  @action async logout() {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      this.name = null;
      this.phone = null;
      this.address = null;
      this.email = null;
      Router.push('/login');
    });
  }

  @action async createAccount(account) {
    this.isLoading = true;
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });
      const user = await res.json();
      this.id = user.id;
      this.phone = user.phone;
      this.name = user.name;
      this.address = user.address;
      this.phone = user.phone;
      this.email = user.email;
      this.error = null;
    } catch (e) {
      this.error = 'server error';
    }

    this.isLoading = false;
  }

  @action async saveAccountDetails(account) {
    this.isLoading = true;
    try {
      const res = await fetch(`/api/users/${this.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });
      const user = await res.json();
      this.phone = user.phone;
      this.name = user.name;
      this.address = user.address;
      this.phone = user.phone;
      this.error = null;
    } catch (e) {
      this.error = 'server error';
    }

    this.isLoading = false;
  }
}

export default function init(histories) {
  if (store === null || typeof window === 'undefined') {
    store = new IdentityStore(histories);
  }
  return store;
}
