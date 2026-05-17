import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {

        setLoading(true);

        try {

            const data = await login({ email, password });

            setUser(data.user);

            return data;

        } catch (err) {

            throw err;

        } finally {

            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {

        setLoading(true);

        try {

            const data = await register({
                username,
                email,
                password
            });

            setUser(data.user);

            return data;

        } catch (err) {

            throw err;

        } finally {

            setLoading(false);
        }
    };

    const handleLogout = async () => {

        setLoading(true);

        try {

            await logout();

            localStorage.removeItem("token");

            setUser(null);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        const getAndSetUser = async () => {

            try {

                const token = localStorage.getItem("token");

                // STOP if token does not exist
                if (
                    !token ||
                    token === "undefined" ||
                    token === "null"
                ) {
                    return;
                }

                const data = await getMe();

                if (data?.user) {
                    setUser(data.user);
                }

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);
            }
        };

        getAndSetUser();

    }, []);

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
    };
};