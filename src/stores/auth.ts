import { defineStore } from "pinia";

interface AuthState {
    isLoggedIn: boolean;
    user?: AuthUser;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isLoggedIn: false,
        user: undefined
    }),
    actions: {
        login(user: AuthUser) {
            this.isLoggedIn = true;
            this.user = user;

            // Save to local storage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', user.token);
        },
        logout() {
            this.isLoggedIn = false;
            this.user = undefined;

            // Remove from local storage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        checkLoginStatus() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (isLoggedIn) {
                const user = JSON.parse(localStorage.getItem('user') || '{}') as AuthUser;
                this.isLoggedIn = true;
                this.user = user;
            }

            return this.isLoggedIn;
        }
    }
});