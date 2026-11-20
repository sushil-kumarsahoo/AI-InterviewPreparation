import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, googleLogin } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        error: err.response?.data?.message || "Invalid email or password",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async ({ idToken }) => {
    setLoading(true);
    try {
      const data = await googleLogin({ idToken });
      setUser(data.user);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        error: err.response?.data?.message || "Google Sign-In failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      return { success: true };
    } catch (err) {
      console.error(err);
      setUser(null);
      return { success: false };
    }
  };

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleLogin,
    handleRegister,
    handleGoogleAuth,
    handleLogout,
  };
};
