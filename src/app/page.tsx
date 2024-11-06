'use client';

import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import Loader from "@/components/common/Loader";
import { fetchUserProfile } from "@/services/user/userService";

interface Person {
  firstName: string;
  lastName: string;
}

interface UserProfile {
  user: {
    id: number;
    email: string;
    active: boolean;
    verified: boolean;
    firebaseUid: string;
  };
  person: Person;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const cachedProfile = localStorage.getItem("userProfile");

        if (cachedProfile) {
          setUserProfile(JSON.parse(cachedProfile));
        } else {
          const userinfo = await fetchUserProfile();
          setUserProfile(userinfo);
          localStorage.setItem("userProfile", JSON.stringify(userinfo));
        }
      } catch (err) {
        console.error("Error al obtener el perfil del usuario:", err);
        router.push("/auth/signin"); // Redirige al login si ocurre un error
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    const checkAuth = () => {
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          const tokenResult = await user.getIdTokenResult(true);
          const expirationTime = new Date(tokenResult.expirationTime).getTime() / 1000;
          const currentTime = Date.now() / 1000;

          if (expirationTime < currentTime) {
            router.push("/auth/signin");
          } else {
            loadUserProfile();
          }
        } else {
          router.push("/auth/signin");
        }
      });
    };

    const unsubscribe = checkAuth();

    return () => unsubscribe(); // Limpieza de suscripción
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
