import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

import Menu from "./menu";
const Header = () => {
  return (
    <header className=" border-b w-full">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="/images/ah_logo.svg"
              alt={`${APP_NAME} logo`}
              height={100}
              width={100}
              priority={true}
            />
            <h1 className="hidden text-2xl font-bold lg:block ml-3">
              {APP_NAME}
            </h1>
          </Link>
        </div>
        <div className="space-x-2">
        <Menu/>
        </div>
      </div>
    </header>
  );
};

export default Header;
