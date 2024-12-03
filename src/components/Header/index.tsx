import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import Image from "next/image";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";
import { Menu } from "lucide-react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <Navbar className="bg-white backdrop-blur-md shadow-md h-15">
            <NavbarContent className="relative flex items-center justify-center">
                <Menu className="absolute left-0 text-primary cursor-pointer lg:hidden xl:hidden" onClick={(e) => {
                  e.stopPropagation();
                  props.setSidebarOpen(!props.sidebarOpen);
                }}></Menu>
                <NavbarBrand className="flex items-center justify-center">
                    {/* <Image
              src="/images/autek/autek_white.png"
              alt="Autek Logo"
              className="h-8"
              width={30}
              height={32}
              layout="intrinsic"
            /> */}
                    <Image
                        src="/images/autek/autek.png"
                        alt="Autek Logo"
                        width={30}
                        height={32}
                        style={{ height: 'auto', maxWidth: '100%' }}
                    />
                    <p className="font-bold text-inherit ps-1 text-primary">AUTEK</p>
                </NavbarBrand>
            </NavbarContent>
        </Navbar>
  );
};

export default Header;

