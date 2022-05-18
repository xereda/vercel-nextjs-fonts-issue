import { useSessionState } from '@/store/index';
import style from './CompanyGroup.style';
import ClientOnly from '../ClientOnly/ClientOnly';

export default function CompanyGroup() {
  const [session] = useSessionState();
  const companyGroupName = session?.grupoEmpresa?.nomeGrupo;

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <label>Grupo: </label>
          <ClientOnly>
            <span className="company-name">{companyGroupName}</span>
          </ClientOnly>
        </div>
      </div>
      <style jsx="true">{style}</style>
    </>
  );
}
