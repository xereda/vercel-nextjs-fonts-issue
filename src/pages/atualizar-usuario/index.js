import AtualizarUsuario from '@/modules/atualizar-usuario/AtualizarUsuario';
import { revalidateUserSession } from '@/utils/session';

export default AtualizarUsuario;

export const getServerSideProps = (context) => revalidateUserSession(context);
