'use client'
import React, { useState } from "react";
import Link from "next/link";
import LoginLayout from "@/components/Layouts/LoginLayout";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "@/services/user/userService";
import { toast } from "sonner";
import TrLoader from "@/components/common/TrLoader";
import { Button, Card, CardFooter, CardHeader, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Image } from "@nextui-org/react";
import { AutekLogo } from "@/assets/autekLogo/autekLogo";
import { signIn } from "@/services/user/authService";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la visibilidad del loader
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn(email, password);

      if (result.success) {
        localStorage.setItem("accessToken", result.data.access_token);
        localStorage.setItem("refreshToken", result.data.refresh_token);
        localStorage.setItem("role", result.data.role);
        const userProfile = await fetchUserProfile();
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        console.log(result.role)
        if (result.role === "Admin") {
          router.push("/admin/home");
        } else {
          router.push("/user/home");
        }
      } else {
        setError("Invalid email or password");
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <LoginLayout>
      {isLoading && <TrLoader />} {/* Mostrar el loader solo cuando isLoading sea true */}
      <Image
        alt="Relaxing app background"
        className="z-0 w-full h-15 object-cover rounded-none absolute"
        src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Navbar className="bg-black/40 backdrop-blur-md shadow-lg h-15">
        <NavbarContent className="relative flex items-center justify-center">
          <div className="absolute left-0">
            <Link href="/home">
              <svg
                className="w-4 h-4 text-white fill-current"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z" />
              </svg>
            </Link>
          </div>
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
              src="/images/autek/autek_white.png"
              alt="Autek Logo"
              width={30}
              height={32}
              style={{ height: 'auto', maxWidth: '100%' }}
            />
            <p className="font-bold text-inherit ps-1 text-white">AUTEK</p>
          </NavbarBrand>
        </NavbarContent>
      </Navbar>

      <Card className="w-full h-50 col-span-12 sm:col-span-7 rounded-none">
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover rounded-none"
          src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <CardFooter className="absolute flex flex-col bg-black/5 bottom-0 z-10 items-start backdrop-blur-sm" >
          <h1 className="text-white/90 text-md font-bold">MONITOREA EN TIEMPO REAL EL MANTENIMIENTO DE TU VEHÍCULO</h1>
          <p className="text-white/60 font-medium text-sm">Programa citas, paga mantenimientos y más</p>
        </CardFooter>
      </Card>
      <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-title-lg font-bold text-black pb-2">Inicio de Sesión</h1>
          <p className="text-base text-black pb-5">
            Inicia sesión con tu cuenta de <span className="font-bold">AUTEK</span>
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="mb-2.5 block font-bold text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                        fill=""
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-bold text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                        fill=""
                      />
                      <path
                        d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                        fill=""
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Inicia sesión
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <a href="/auth/signup" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </LoginLayout>
  );
};

export default SignIn;
