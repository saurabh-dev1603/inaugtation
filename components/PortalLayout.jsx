// import Footer from "../component/footer";

export default function PortalLayout({ children, customStyle }) {
  return (
    <>
      <style jsx>
        {`
          ${customStyle
            ? customStyle
            : `
          .multi-gradient {
            background-color: #ffffff;
            background-image: 
              radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
              radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
              radial-gradient(at 0% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
              radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
              radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
              radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
              radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
            background-repeat: no-repeat;
            background-size: cover;
            min-height: 100vh;
          }`}
        `}
      </style>
      <div className="relative z-[1] py-14 pb-20 md:pb-24 md:pt-14 h-full min-h-screen multi-gradient">
        {/* logo */}
        <div className="cursor-pointer -mt-2 mx-auto mb-10 w-[140px] md:w-[160px]">
          <img
            className="w-full"
            src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/logo/vedic-rishi-logo.png"
          />
        </div>
        <div className="w-full h-full">{children}</div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
