const Navbar = ({...props}) => {

  return (
    <>
      <nav className={`z-50 w-full top-0 backdrop-blur-sm fixed bg-gray-200 h-[70px] flex items-center`}>
        <div className="flex flex-row justify-between items-center content-center w-full">
          <div className="mx-10">
            Anotation Paper
          </div>
          
        </div>
      </nav>
    </>
  )
}

export default Navbar;