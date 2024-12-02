import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { NavbarBrand, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark">
      <div className="flex flex-grow items-center justify-between px-4 py-4  md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden text-primary">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm  bg-white p-1.5   lg:hidden text-primary"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 text-primary top-0 my-1 block h-0.5 w-0 rounded-sm bg-primary delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-300"
                    }`}
                ></span>
                <span
                  className={`relative text-primary left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-primary delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "delay-400 !w-full"
                    }`}
                ></span>
                <span
                  className={`relative text-primary left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-primary delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-500"
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute text-primary left-2.5 top-0 block h-full w-0.5 rounded-sm bg-primary delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                ></span>
                <span
                  className={`delay-400 text-primary absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-primary duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>
        <div className="relative flex items-center justify-center">
            <Image
              src="/images/autek/autek.png"
              alt="Autek Logo"
              width={30}
              height={32}
              style={{ height: 'auto', maxWidth: '100%' }}
            />
            <p className="font-bold text-inherit ps-1 text-blue-800">AUTEK</p>
        </div>

      </div>
    </header>
  );
};

export default Header;

