import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 flex-shrink-0">
    <Image
      src="/images/android-chrome-512x512.png"
      alt="Binova Labs"
      width={40}
      height={40}
      className="h-10 w-10 object-contain"
    />
    <div className="flex flex-col leading-none gap-[4px]" style={{ fontFamily: "var(--font-inter)" }}>
      <span className="text-white font-black text-[22px] tracking-[0.06em] leading-none">BINOVA</span>
      <div className="flex items-center gap-2 w-full">
        <div className="h-[1.5px] flex-1 bg-[#00C3C1]" />
        <span className="text-[#00C3C1] text-[9px] tracking-[0.4em] font-semibold">LABS</span>
        <div className="h-[1.5px] flex-1 bg-[#00C3C1]" />
      </div>
    </div>
  </Link>
);

export default Logo;
