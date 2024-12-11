
'use client'
const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-white dark:bg-black z-50">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>


    );
};

export default Loader;