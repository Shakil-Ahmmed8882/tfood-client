



import { TConfig } from "./type";

/**
 * Application Configuration
 * Centralized settings for environment management, API, and frontend/backend URLs.
 */

const appConfig: TConfig = {
  // Define the current environment: "production" or "development"
  // env: "production",
  env: "development",

  // Backend API endpoints for different environments
  backend: {
    production: "https://api.tfoodbd.top/api/v1",
    development: "http://localhost:3000/api/v1",
  },
  roleBasedRouteOptions:["super_admin", "shop_owner", "admin"],
  // Frontend application URLs for different environments
  frontend: {
    production: "https://t-food.com",
    development: "http://localhost:5173",
  },

  // API-related settings
  api: {
    limit: 10, // Default pagination limit
  },

  /**
   * Returns the appropriate backend API URL based on the current environment.
   */
  getBackendUrl() {
    return this.backend[this.env] || this.backend.production;
  },

  /**
   * Returns the appropriate frontend URL based on the current environment.
   */
  getFrontendUrl() {
    return this.frontend[this.env] || this.frontend.production;
  },
    // Get the refresh token URL
    getRefreshTokenUrl() {
      return `${this.getBackendUrl()}/auth/refresh-token`;
    },
};

export default appConfig;
