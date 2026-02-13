import { Toaster } from "react-hot-toast";
import CurrentDay from "@/app/_components/days/currentDay/CurrentDay";
import StoreProvider from "./StoreProvider";
import Sidebar from "@/app/_ui/Sidebar";
import { Suspense } from "react";
import Spinner from "@/app/_ui/Spinner";
import SavedDaysListServerComponent from "@/app/_components/days/savedDays/SavedDaysListServerComponent";
import { auth } from "./_lib/auth";
import Logout from "./_ui/Logout";


export const metadata = {
    title: "LockIn"
}

async function Page() {
    // const session = await auth()

    // if(!session) return null


    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-[auto_22rem]">
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)",
                        },
                    }}
                />
                <StoreProvider>
                <div>
                    <div className="grid h-screen grid-rows-[1fr_auto] p-5 gap-4">
                        <Suspense fallback={<Spinner />}>
                            <SavedDaysListServerComponent />
                        </Suspense>
                            <CurrentDay />
                        
                    </div>
                </div>

                <div className="flex flex-col mt-5 mr-5 mb-5 gap-3">
                    <Logout />
                    <Sidebar />
                </div>
                </StoreProvider>
            </div>
        </div>
    );
}

export default Page;
