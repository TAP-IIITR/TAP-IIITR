import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { Link } from "react-scroll";
import navbarImage from "@/assets/navbar-name.png";

const navbarItems = [
  {
    link: "#About",
    label: "About",
  },
  {
    link: "#Students",
    label: "Alumni",
  },
  {
    link: "#Recruiters",
    label: "Recruiters",
  },
  {
    link: "#Team",
    label: "Team",
  },
  {
    link: "#Contact",
    label: "Contact",
  },
];
const Navbar = () => {
  return (
    <div className="fixed z-10 left-10 right-10 top-4">
      <nav className="bg-gray-400 md:block hidden bg-opacity-70 backdrop-blur-lg backdrop-filter w-full h-4 rounded-[50px] py-8 px-8">
        <div className="w-full h-full flex items-center gap-x-8 ">
          <img
            src={navbarImage}
            alt="College Name"
            className="lg:h-14 md:h-10  items-start mr-auto "
          />
          {navbarItems.map((navItem, i) => {
            return (
              <Link
                activeClass="active"
                to={navItem.label}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                <a
                  key={i}
                  href={navItem.link}
                  className="text-lg text-primary font-bold"
                >
                  {navItem.label}
                </a>
              </Link>
            );
          })}
          <div className="rounded-[32px] bg-[#1E39A4] h-[48px] w-[115px] flex items-center justify-center cursor-pointer">
            <p className="font-[700] text-lg text-[#FFF] text-center ">
              TAP Portal
            </p>
          </div>
        </div>
      </nav>

      <Sheet>
        <SheetTrigger>
          <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-full w-10 h-10 flex items-center justify-center md:hidden absolute right-0">
            <Menu className="" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="flex flex-col items-start gap-y-4 ">
                {navbarItems.map((navItem, i) => {
                  return (
                    <>
                      <Link
                        activeClass="active"
                        to={navItem.label}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                      >
                        <a
                          key={i}
                          href={navItem.link}
                          className="font-medium text-lg text-primary"
                        >
                          {navItem.label}
                        </a>
                      </Link>
                      <Separator className="last:hidden" />
                    </>
                  );
                })}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Navbar;
