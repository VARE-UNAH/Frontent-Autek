const Loader = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center  dark:bg-black">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      <p className="pt-2 text-primary font-bold">Cargando...</p>
    </div>
  );
};

export default Loader;
