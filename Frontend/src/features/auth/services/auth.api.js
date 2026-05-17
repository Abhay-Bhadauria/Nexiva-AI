import axios from "axios";

//  Create API instance
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

//  ADD INTERCEPTOR (THIS FIXES YOUR MAIN ISSUE)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN FROM STORAGE:", token); // debug

    if (token && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// ================= REGISTER =================
export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        });

        return response.data;

    } catch (err) {
        console.log(err);
    }
}


// ================= LOGIN =================
export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        });

        //  Store token properly
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        } else {
            console.error(" Token not received from backend");
        }

        return response.data;

    } catch (err) {
        console.log(err);
    }
}


// ================= LOGOUT =================
export async function logout() {
    try {
        const response = await api.get("/api/auth/logout");

        //  Clear token on logout
        localStorage.removeItem("token");

        return response.data;

    } catch (err) {
        console.log(err);
    }
}


// ================= GET ME =================
export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me");

        return response.data;

    } catch (err) {

        console.log(err);

        return null;
    }
}