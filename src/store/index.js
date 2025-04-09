// src/store/index.js
import { createStore } from 'vuex';

const savedData = JSON.parse(localStorage.getItem('appData')) || {
    users: [],
    currentUser: null,
    notes: []
};

export default createStore({
    state: {
        users: savedData.users,
        currentUser: savedData.currentUser,
        notes: savedData.notes
    },
    mutations: {
        setUser(state, { username, password, userData }) {
            const existingUserIndex = state.users.findIndex(u => u.username === username);
            if (existingUserIndex !== -1) {
                state.users[existingUserIndex].userData = { ...userData };
            } else {
                state.users.push({ username, password, userData });
            }
            localStorage.setItem('appData', JSON.stringify({
                users: state.users,
                currentUser: state.currentUser,
                notes: state.notes
            }));
        },
        login(state, username) {
            state.currentUser = username;
            localStorage.setItem('appData', JSON.stringify({
                users: state.users,
                currentUser: state.currentUser,
                notes: state.notes
            }));
        },
        logout(state) {
            state.currentUser = null;
            localStorage.setItem('appData', JSON.stringify({
                users: state.users,
                currentUser: state.currentUser,
                notes: state.notes
            }));
        },
        addNote(state, note) {
            state.notes.push(note);
            localStorage.setItem('appData', JSON.stringify({
                users: state.users,
                currentUser: state.currentUser,
                notes: state.notes
            }));
        }
    },
    actions: {
        updateUser({ commit }, { username, password, userData }) {
            commit('setUser', { username, password, userData });
        },
        login({ commit, state }, { username, password }) {
            const user = state.users.find(u => u.username === username && u.password === password);
            if (user) {
                commit('login', username);
                return true;
            }
            return false;
        },
        logout({ commit }) {
            commit('logout');
        },
        saveNote({ commit }, note) {
            commit('addNote', note);
        }
    },
    getters: {
        getUser: (state) => {
            if (!state.currentUser) return { name: '', email: '', favoriteThing: '' };
            const user = state.users.find(u => u.username === state.currentUser);
            return user ? user.userData : { name: '', email: '', favoriteThing: '' };
        },
        getNotes: (state) => state.notes,
        isLoggedIn: (state) => !!state.currentUser,
        isUserSet: (state, getters) => {
            const userData = getters.getUser;
            return userData.name && userData.email && userData.favoriteThing;
        }
    }
});
