/**
 * Supported Environment Types
 */
export type Env = "production" | "development";

/**
 * Configuration Interface
 * Defines the structure for centralized application settings.
 */
export interface TConfig {
  // Current environment (either "production" or "development")
  env: Env;

  // Backend API endpoints mapped to environments
  backend: Record<Env, string>;

  // Frontend URLs mapped to environments
  frontend: Record<Env, string>;
  roleBasedRouteOptions: string[];

  // API-related settings
  api: {
    limit: number; // Default pagination limit
  };

  // Methods to retrieve URLs based on the current environment
  getBackendUrl(): string;
  getFrontendUrl(): string;
  getRefreshTokenUrl(): string;
}
