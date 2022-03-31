import Dashboard from '@/modules/dashboard/Dashboard';
import { revalidateUserSession } from '@/utils/session';

export default Dashboard;

export const getServerSideProps = (context) => revalidateUserSession(context);
