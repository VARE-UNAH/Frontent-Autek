'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginLayout from "@/components/Layouts/LoginLayout";
import { SignUpFormValidator } from "@/validators/auth/authValidators";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import Alert from "@/components/Alert/alertred";
import axios from 'axios';
import { FirebaseError } from "firebase/app";
import { toast } from 'sonner'
import Footer from "@/components/Footer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [warningMessage, setWarningMessage] = useState([""]);

  const handleSignUp = async () => {
    const wa = SignUpFormValidator(email, password, confirmPassword, name, lastName);
    setWarningMessage(wa);
    if (wa.length === 0) {
    } else {
      wa.forEach(element => {
        toast.error(`${wa}`);
      });
    };
    if (password !== confirmPassword) {
      console.error("Las contraseñas no coinciden");
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const nameParts = name.trim().split(" ");
    const lastNameParts = lastName.trim().split(" ");

    if (nameParts.length < 1 || nameParts.length > 2) {
      console.error("El campo 'Nombres' debe contener una o dos palabras.");
      toast.error("El campo 'Nombres' debe contener una o dos palabras.");
      return;
    }

    if (lastNameParts.length < 1 || lastNameParts.length > 2) {
      console.error("El campo 'Apellidos' debe contener una o dos palabras.");
      toast.error("El campo 'Apellidos' debe contener una o dos palabras.");
      return;
    }


    try {
      // Crear el usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el usuario autenticado en localStorage o sessionStorage
      localStorage.setItem("user", JSON.stringify(user));
      const token = await user.getIdToken();
      localStorage.setItem("accessToken", token);

      // Aquí haces el console log del usuario
      console.log("Usuario autenticado:", user);

      try {
        // Intentar registrar al usuario en el backend
        console.log(name, lastName)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
          email: user.email,
          uid: user.uid,
          name: name,
          lastName: lastName
        });
        console.log(process.env.NEXT_PUBLIC_API_URL);

        if (response.status !== 201) {
          throw new Error('Error al registrar el usuario en la base de datos.');
        }

        router.push("/"); // Redirige a la página del dashboard tras iniciar sesión
      } catch (backendError) {
        console.error(`Error al registrar el usuario en la base de datos : `, backendError,);
        toast.error("Error al registrar el usuario en la base de datos")
        setError("Error al registrar el usuario. Inténtalo de nuevo.");
      }

    } catch (firebaseError) {
      console.error("Error al crear el usuario en Firebase:", firebaseError);
      if (firebaseError instanceof FirebaseError) {
        console.log(firebaseError.code)
        switch (firebaseError.code) {
          case "auth/email-already-in-use":
            setError("El email ya esta en uso, utiliza otro.");
            break;
          case "auth/user-disabled":
            setError("Este usuario ha sido deshabilitado.");
            break;
          case "auth/user-not-found":
            setError("No se encontró una cuenta con este correo electrónico.");
            break;
          case "auth/wrong-password":
            setError("La contraseña es incorrecta.");
            break;
          case "auth/too-many-requests":
            setError("Demsiados intentos usuario bloqueado momentaneamente.");
            break;
          default:
            setError("Ocurrió un error al iniciar sesión. Inténtalo de nuevo.");
        }
      } else {
        setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
      }
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // Intenta volver a la página anterior
    } else {
      router.push('/home'); // Si no hay una página anterior, redirige a /home
    }
  };

  return (
    <LoginLayout>
      <nav className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button type="button" onClick={handleBack} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <svg className="w-5 h-5 text-primary fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z" />
            </svg>
          </button>
          <a href="https://flowbite.com/" className="flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-3 rtl:space-x-reverse">
            <Image src="/images/autek/autek.png" className="h-8" alt="Flowbite Logo" width={40} // Set your desired width here
              height={32}/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary dark:text-white">AUTEK</span>
          </a>
        </div>
      </nav>
      <div className="max-w-md w-full bg-white pt-1 p-8 relative">
        <h1 className="text-title-lg font-bold text-black pb-2">Registro</h1>
        <p className="text-base text-black pb-5">
          Registrate llenando los siguientes datos
        </p>
        <form onSubmit={handleSignUp} className="space-y-6">
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
          <div className="mb-6">
            <label className="mb-2.5 block font-bold text-black dark:text-white">
              Confirma tu contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Ingresa de nuevo tu contraseña"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
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
          <div className="mb-4">
            <label className="mb-2.5 block font-bold text-black dark:text-white">
              Nombre
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ingrese su nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off" //
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
                      d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                      fill=""
                    />
                    <path
                      d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
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
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <a href="/auth/signin" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    <Footer></Footer>
    </LoginLayout>
  );
};

export default SignUp;
