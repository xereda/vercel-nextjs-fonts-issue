import Image from 'next/image';

export default function Aside() {
  return (
    <>
      <aside className="aside-bg">
        <div className="logo">
          <a href="https://www.benvisavale.com.br/">
            <Image
              src="/svg/icon-ben.svg"
              alt="Ben Visa Vale"
              width={70}
              height={70}
            />
          </a>
        </div>
        <div>
          <Image
            src="/png/avatar-home.png"
            alt="Ben Visa Vale"
            width={420}
            height={380}
          />
        </div>
      </aside>

      <style jsx="true">{`
        .aside-bg {
          background: var(--avatar-blue);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: -webkit-fill-available;
          position: fixed;
          width: 40vw;
        }
        .logo {
          position: absolute;
          top: 0;
          padding-top: 2.5rem;
        }
      `}</style>
    </>
  );
}
