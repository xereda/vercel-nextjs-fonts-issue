import TermoPrivacidade from '@/modules/termo-privacidade/TermoPrivacidade.js';
import { revalidateUserSession } from '@/utils/session';

export default TermoPrivacidade;

export const getServerSideProps = (context) => revalidateUserSession(context);
