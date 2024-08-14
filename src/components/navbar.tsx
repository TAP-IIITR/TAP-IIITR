const Navbar = () => {
  return (
    <nav className="relative top-5 mx-auto w-[85%] ml-auto bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg z-20 rounded-3xl">
        <div className="w-[40%] ml-[auto]  flex-col space-x-8  py-4">
          <a href="#about" className="text-[#0928A0] hover:text-blue-700">
            About
          </a>
          <a href="#students" className="text-[#0928A0] hover:text-blue-700">
            Students
          </a>
          <a href="#recruiters" className="text-[#0928A0] hover:text-blue-700">
            Recruiters
          </a>
          <a href="#team" className="text-[#0928A0] hover:text-blue-700">
            Team
          </a>
          <a href="#contact" className="text-[#0928A0] hover:text-blue-700">
            Contact
          </a>
        </div>
    </nav>
  );
};
export default Navbar;
