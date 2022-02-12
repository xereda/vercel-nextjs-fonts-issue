import Image from 'next/image';
import iconBen from '@/public/svg/icon-ben.svg';
import homeBackground from '@/public/png/homebackground.png';

export default function Aside() {

  return (
    <>
      <aside className="aside-bg">
        <div className="logo">
          <a href="https://www.benvisavale.com.br/">
            <Image src={iconBen} alt="Ben Visa Vale" width={70} height={70} />
          </a>
        </div>
        <div className="">
          <Image src={homeBackground} alt="Ben Visa Vale" width={410} height={550} />
        </div>
      </aside>

      <style jsx="true">{`
        .aside-bg {
          background: #4e2789;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          min-height: -webkit-fill-available;
          position: fixed;
          width: 40vw;
        }
        .logo {
          padding: 3rem 0;
        }
      `}</style>
    </>
  );
}