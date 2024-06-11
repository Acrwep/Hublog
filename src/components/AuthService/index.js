import { jwtDecode as decode } from "jwt-decode";
import config from "../../utils/config";

const { tokenStorageName: tokenName } = config.jwtToken;

class AuthService {
  getAuthHeader(feature, isPublic = false) {
    if (!this.loggedIn() || isPublic || config.isPublic(feature)) {
      return {
        Authorization: config.middleware.basicAuth,
        "user-id": "public",
      };
    }
    return {
      Authorization: `Bearer ${this.getToken()}`,
      "user-id": this.getProfile().username,
    };
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localStorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  loggedOut() {
    return !this.loggedIn();
  }

  setToken(idToken, user) {
    // Saves user token to localStorage
    localStorage.setItem(tokenName, idToken);
    localStorage.setItem(tokenName + "user_details", JSON.stringify(user));
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem(tokenName);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  clearToken() {
    localStorage.removeItem(tokenName);
    localStorage.removeItem(tokenName + "user_details");
  }

  logout() {
    // Clear user token and profile data from localStorage
    this.clearToken();
    return new Promise((resolve) => resolve(true));
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    const userStr = localStorage.getItem(tokenName + "user_details");
    return JSON.parse(userStr);
  }
}

export default AuthService;
