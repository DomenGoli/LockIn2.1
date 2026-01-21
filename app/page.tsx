import { Toaster } from "react-hot-toast";
import CurrentDay from "@/app/_components/days/currentDay/CurrentDay";
import StoreProvider from "./StoreProvider";
import Sidebar from "@/app/_ui/Sidebar";
import { Suspense } from "react";
import Spinner from "@/app/_ui/Spinner";
import SavedDaysListServerComponent from "@/app/_components/days/savedDays/SavedDaysListServerComponent";

function Page() {
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

                <div className="bg-(--day) mt-5 mr-5 mb-5">
                    <Sidebar />
                </div>
                </StoreProvider>
            </div>
        </div>
    );
}

export default Page;
