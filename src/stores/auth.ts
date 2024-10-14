import { defineStore } from "pinia";

interface AuthState {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user?: {
        username: string;
        uid: string;
    };
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isLoggedIn: false,
        isAdmin: false,
        user: undefined
    }),
    actions: {
        login(user: { username: string; uid: string }) {
            this.isLoggedIn = true;
            this.isAdmin = user.username === 'admin';
            this.user = user;

            // Save to local storage
            localStorage.setItem('isLoggedIn', 'true');
            if (this.isAdmin) {
                localStorage.setItem('isAdmin', 'true');
            } else {
                localStorage.setItem('isAdmin', 'false');
            }
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout() {
            this.isLoggedIn = false;
            this.isAdmin = false;
            this.user = undefined;

            // Remove from local storage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('user');
        },
        checkLoginStatus() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (isLoggedIn) {
                const user = JSON.parse(localStorage.getItem('user') || '{}') as { username: string; uid: string };
                this.isLoggedIn = true;
                this.isAdmin = localStorage.getItem('isAdmin') === 'true';
                this.user = user;
            }

            return this.isLoggedIn;
        }
    }
});