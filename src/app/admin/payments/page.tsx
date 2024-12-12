import ProtectedLayout from '@/components/Layouts/ProtectedLayout';
import { payments } from './data';
import PaymentsTable from './paymentsTable';
import AdminDefaultLayout from '@/components/Layouts/AdminLayout';
import PaymentsList from './paymentsList';

export default function Home() {
    return (
        <ProtectedLayout>
            <AdminDefaultLayout>
                <h1 className="text-2xl font-bold mb-6">Pagos Realizados al Taller</h1>
                <PaymentsList payments={payments} />
            </AdminDefaultLayout>
        </ProtectedLayout>
    );
}

