'use client'
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ArrowBigLeft, MoveLeft } from "lucide-react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <Navbar className="bg-white backdrop-blur-md shadow-md h-15">
      <NavbarContent className="relative flex items-center justify-center">
        <button
          onClick={() => router.back()}
          className="absolute flex items-center gap-2 text-primary text-xl font-medium hover:text-primary-dark"
        >
          <MoveLeft></MoveLeft>
          
        </button>
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

