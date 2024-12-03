"use client";

import { logoutUser } from "@/services/user/authService";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "@nextui-org/react";
import { CalendarDays, CarFront, CircleUser, CircleX, Home, LayoutDashboard, LogIn, LogOut, Wrench } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      //CLIENTES
      {
        icon: (
          <CircleUser></CircleUser>
        ),
        label: "Perfil",
        route: "/user/profile",
      },
      //MENU DASHBOARD
      {
        icon: (
          <LayoutDashboard></LayoutDashboard>
        ),
        label: "Inicio",
        route: "/user/home",
      },
      //MENU DASHBOARD
      {
        icon: (
          <Wrench></Wrench>
        ),
        label: "Talleres",
        route: "/user/talleres",
      },
      {
        icon: (
          <CalendarDays></CalendarDays>
        ),
        label: "Citas",
        route: "/user/appointments",
      },
      //CALENDARIO 
      {
        icon: (
          <CarFront></CarFront>
        ),
        label: "Vehículos",
        route: "/user/cars",
      },
      //MENU DASHBOARD

    ],
  },
  

];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const handleLogout = async () => {
    // Llama a la función logoutUser desde el servicio
    const logoutSuccessful = await logoutUser();

    if (logoutSuccessful) {
      // Si el logout fue exitoso, limpia el almacenamiento
      localStorage.clear();
      sessionStorage.clear();
      // Elimina el token del almacenamiento local y de la sesión
      // Redirige al usuario a la página de login
      router.push("/auth/signin");
    } else {
      // Si hubo un error, muestra un mensaje o maneja el error
      console.error("No se pudo cerrar sesión correctamente.");
    }
  };
  /* const handleLogout = async () => {
    try {
      router.push("/auth/signin"); // Redirigir al usuario a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);

    }
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = 'firebase-auth-token=; Max-Age=0';
  }; */
  return (
    <div>
    {sidebarOpen && (
      <div className="z-9999 w-full h-full absolute bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-linear"></div>
    )}
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      
      <aside
        className={`border-e-2 border-stroke shadow-xl fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark  lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex bg-white items-center shadow-lg justify-between gap-2 px-6 py-4 lg:py-6.5">
          <Link href="/">

            <strong className="font-bold text-inherit  text-primary text-lg">AUTEK</strong>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden xl:hidden"
          >
            <CircleX className="text-primary"></CircleX>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-1 lg:mt-5 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-black">
                  {group.name}
                </h3>

                <ul className="mb-2 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
            <Button color="danger" onClick={handleLogout} startContent={<LogOut/>} className='w-full h-10 bg-gradient-to-r from-red to-rose-700 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition mt-2' >
              Cerrar Sesion
            </Button>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
    </div>
  );
};

export default Sidebar;
