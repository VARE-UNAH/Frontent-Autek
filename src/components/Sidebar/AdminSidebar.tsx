"use client";

import { logoutUser } from "@/services/user/authService";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "@nextui-org/react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: (
          <i className="fa-solid fa-user"></i>
        ),
        label: "Clientes",
        route: "/admin/clientes",
      },
      {
        icon: (
          <i className="fa-solid fa-car"></i>
        ),
        label: "Vehículos",
        route: "/admin/vehiculos",
      },
      {
        icon: (
          <i className="fa-solid fa-warehouse"></i>
        ),
        label: "Talleres",
        route: "/admin/talleres",
      },
      {
        icon: (
          <i className="fa-solid fa-calendar-check"></i>
        ),
        label: "Citas",
        route: "/admin/citas",
      },
    ],
  }
];


const AdminSidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
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
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark  lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex bg-white items-center shadow-lg justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">

            <strong className="text-primary font-medium" style={{ fontSize: '30px' }}>AUTEK</strong>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-black">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
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
            <Button color="danger" onClick={handleLogout} className='w-full h-10 bg-gradient-to-r from-red to-rose-700 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition mt-2' >
              Cerrar Sesion
            </Button>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default AdminSidebar;
