import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "./ui/separator";


const navbarItems = [
  {
    link: "#About",
    label: "About"
  },
  {
    link: "#Students",
    label: "Students"
  },
  {
    link: "#Team",
    label: "Team"
  },
  {
    link: "#Recruiters",
    label: "Recruiters"
  },
  {
    link: "#Contact",
    label: "Contact"
  },
]
const Navbar = () => {
  return (
    <div className="absolute left-10 right-10 top-4">
      <nav className="bg-white md:block hidden bg-opacity-70 backdrop-blur-lg backdrop-filter w-full h-4 rounded-[50px] py-8 px-8">
        <div className="w-full h-full flex items-center gap-x-8 justify-end">
          {
            navbarItems.map((navItem, i) => {
              return (
                <a key={i} href={navItem.link} className="font-medium text-lg text-primary">
                  {navItem.label}
                </a>
              )
            })
          }
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
                {
                  navbarItems.map((navItem, i) => {
                    return (
                      <>
                        <a key={i} href={navItem.link} className="font-medium text-lg text-primary">
                          {navItem.label}
                        </a>
                        <Separator className="last:hidden"/>
                      </>
                    )
                  })
                }
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

    </div>
  );
};
export default Navbar;
