// Path: Kandban Board/client/src/utils/auth.ts

import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    console.log("Checking login status, token:", token ? "exists" : "none");
    return token && !this.isTokenExpired(token) ? true : false;
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload & { exp: number }>(token);
      const isExpired = decoded.exp < Date.now() / 1000;
      console.log("Token expiration check:", isExpired ? "expired" : "valid");
      return isExpired;
    } catch (err) {
      console.error("Error checking token expiration:", err);
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    console.log("Storing token in localStorage");
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    console.log("Removing token from localStorage");
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();