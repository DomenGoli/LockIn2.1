"use client";

type ErrorObjectType = {
    message: string;
}

export default function Error({ error, reset }: { error: ErrorObjectType, reset: ()=> void }) {
    console.log(typeof(error));
    return (
        <main className="flex justify-center items-center flex-col gap-6">
            <h1 className="text-3xl font-semibold">Incorret credentials!</h1>
            {/* <p className="text-lg">{error.message}</p> */}

            <button
                onClick={reset}
                className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
            >
                Try again
            </button>
        </main>
    );
}
