'use client'

import { useEffect, useState } from "react";
import AdminDefaultLayout from "@/components/Layouts/AdminLayout";
import TallerCardContainer from "@/components/Dashboard/TallerCardContainer";
import Loader from "@/components/common/Loader";
import { toast } from "sonner";


export interface Address {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
}
interface Workshop {
  id: number;
  name: string;
  phone: number;
  address: Address;
  rating: number;
}

const Home = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workshop/show/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }
        const data = await response.json();
        setWorkshops(data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
        toast.error('Failed to load workshops. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <AdminDefaultLayout>
      <h1 className="text-3xl font-bold text-black pb-2">Presupuesto</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader />
        </div>
      ) : (
        <TallerCardContainer cards={workshops} />
      )}
    </AdminDefaultLayout>
  );
};

export default Home;

