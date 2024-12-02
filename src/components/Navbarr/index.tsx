import { NavbarBrand, NavbarContent, Navbar, Image, NavbarMenu, NavbarMenuItem, Link, NavbarMenuToggle } from "@nextui-org/react";
import React from "react";

const menuItems = [
    "Ver Perfil",
    "Inicio",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
];

const Navbarr = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Navbar className="bg-white backdrop-blur-md shadow-md h-15" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="relative flex items-center justify-center">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="absolute left-0 text-primary"
                />
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
            <NavbarMenu className="">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`} className="py-2 ms-0 rounded-md font-medium back">
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full text-zinc-600"
                            href="#"
                            size="lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-fill me-2" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}

export default Navbarr;
