import React from "react";
import { NavigationData } from "./navigationdata";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
const Mobilenav = () => {
  const router = useRouter();
  const pathname = usePathname();

  // 🔥 Root click special behavior
  const handleRootClick = (href: string) => {
    // যদি root না হয় → normal navigation
    if (pathname !== href) {
      router.push(href);
      return;
    }

    // যদি already root এ থাকি
    if (window.scrollY > 0) {
      // scroll করা থাকলে → top এ যাবে
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // একদম top এ থাকলে → reload
      window.location.reload();
    }
  };
  return (
    <div className=" w-full  lg:hidden ">
      <div className="NavMobile   h-12 pb-2 flex  items-center">
        <ul className=" w-full flex items-center justify-between px-2  gap-2">
          {NavigationData.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            // 🔥 active হলে activeicon, না হলে icon
            const Icon = active ? item.activeIcon : item.icon;

            if (item.href === "/") {
              return (
                <li
                  key={item.name}
                  onClick={() => handleRootClick(item.href)}
                  className="flex flex-col  shrink-0  items-center   hover:bg-background-secondary rounded cursor-pointer"
                >
                  <div className={` text-[26px] relative `}>
                    {Icon && <Icon />}
                  </div>
                  <span className={`text-[10px] font-medium hidden`}>
                    {item.name}
                  </span>
                </li>
              );
            }

            return (
              <Link
                href={item.href}
                key={item.name}
                className=" flex flex-col  shrink-0  items-center   hover:bg-background-secondary rounded cursor-pointer"
              >
                <div className=" text-[26px] relative">
                  {Icon && <Icon />}
                  <div className="bg-green-600 hidden w-[11px] h-[11px] rounded-full border-background border-2 absolute top-0 right-0"></div>
                </div>
                <span className="  text-[10px] font-medium hidden   ">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Mobilenav;
