export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="bg-white shadow-lg flex items-center justify-between px-8 py-4 border-b border-gray-200">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-[57%] ">
          <img
            src="https://realcash.in/img/axis-max-life-insurance-logosvg-1.png"
            alt="Axis Logo"
            className="h-10 object-contain"
          />
          <span className="text-[#9A145D] font-semibold text-2xl tracking-wide">
            Axis Max Life Blog
          </span>
        </div>

        {/* Button Section */}
        <button className="bg-[#9A145D] hover:bg-[#7f104d] transition-colors duration-200 px-5 py-2 rounded-md text-white text-sm font-medium shadow-sm">
          Login
        </button>
      </header>

      {/* Custom Dual Divider */}
      <div className="flex flex-col">
        <hr className="h-[2px] bg-[#9A145D] border-0" />
        <hr className="h-[1.5px] bg-blue-700 border-0" />
      </div>
    </div>
  );
}
