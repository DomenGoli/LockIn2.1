import Spinner from "@/app/_ui/Spinner";

function Loading() {
    return (
        <div className="grid items-center justify-center">
            <Spinner />
            <p className="text-xl text-primary-200">Loading saved days...</p>
        </div>
    );
}

export default Loading;
