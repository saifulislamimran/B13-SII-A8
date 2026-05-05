import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // baseURL is automatically inferred in the browser
    baseURL: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL
});
