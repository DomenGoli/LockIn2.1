declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_MONGODB_URL: string;
        }
    }
}

export {}
