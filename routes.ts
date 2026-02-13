

/**
 * An array of routes that are used for authentiaction 
 * These routes will redirect logged in users to /settings
 */
export const authRoutes = ["/"]



/**
 * THe prefix for API authentiaction routes 
 * Routes that start with this prefix are used for API authentiaciton puroposes
 */
export const apiAuthPrefix = "/auth"



/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/"