import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context';
import { IoHomeSharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { FaFireAlt } from "react-icons/fa";

const BottomNavbar = () => {
  const Navigate = useNavigate();
  const { theme, cid } = useContext(Context);

  const navItems = [
    {
      title: 'Home',
      icon: <IoHomeSharp className='my-2 text-xl' />,
      onClick: () => Navigate('/'),
    },
    {
      title: 'Shorts',
      icon: <FaPlay className='my-2 text-xl' />,
      onClick: () => Navigate(`shorts/:id/${cid}`),
    },
    {
      title: 'Trending',
      icon: <FaFireAlt className='my-2 text-xl' />,
      onClick: () => Navigate('trending'),
    },
  ];

  return (
    <>
      <div className="z-10">
        <nav className={`fixed bottom-0 w-full h-[50px] flex items-center`} style={{ backgroundColor: `${theme === 'light' ? 'white' : 'black'}` }}>
          <ul className={`flex justify-evenly w-full text-${theme === 'light' ? 'black' : 'white'}`}>
            {
              navItems.map((item) => (
                <li key={item.title} className='flex flex-col justify-center cursor-pointer' onClick={item.onClick} title={item.title}>
                  {item.icon}
                </li>
              ))
            }

          </ul>
        </nav>
      </div>
    </>
  )
}

export default BottomNavbar