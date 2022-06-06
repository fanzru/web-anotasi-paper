const Navbar = ({...props}) => {

  return (
    <>
      <nav className={`z-50 w-full top-0 bg-[#171717] backdrop-blur-sm fixed bg-gray-200 h-[70px] flex items-center`}>
        <div className="flex flex-row justify-between items-center content-center w-full">
          <div className="mx-10">
            Anotation Paper
          </div>
          {/* <button className="border border-black p-2 mx-10 rounded-md ">
            Menu
          </button> */}
        </div>
      </nav>
    </>
  )
}

export default Navbar;