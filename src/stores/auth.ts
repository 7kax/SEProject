import { defineStore } from "pinia";

export interface User {
    username: string;
    uid: string;
    token: string;
    isAdmin: boolean;
}

interface AuthState {
    isLoggedIn: boolean;
    user?: User;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isLoggedIn: false,
        user: undefined
    }),
    actions: {
        login(user: User) {
            this.isLoggedIn = true;
            this.user = user;

            // Save to local storage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout() {
            this.isLoggedIn = false;
            this.user = undefined;

            // Remove from local storage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
        },
        checkLoginStatus() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (isLoggedIn) {
                const user = JSON.parse(localStorage.getItem('user') || '{}') as User;
                this.isLoggedIn = true;
                this.user = user;
            }

            return this.isLoggedIn;
        }
    }
});