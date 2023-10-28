import { Link } from 'react-router-dom'

import { icons } from '../../assets/constants/data'

const Sidedraw = ({menus, open, onOpen}) => {
    return (
        <aside className={`bg-gray-900 min-h-screen ${open ? 'w-72' : 'w-16'} pb-4 text-gray-100 duration-500 opacity-65`}>
            <div className="py-3 flex justify-end px-4">
                <icons.menus size={26} className='cursor-pointer' onClick={onOpen} />
            </div>
            <hr />
            <div className='mt-4 flex flex-col gap-2 relative'>
                {menus?.map((menu, i) =>(
                    <Link key={i} to={menu?.link} className={`${menu?.margin && 'mt-0'} group flex items-center 
                        text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 hover:text-teal-200 rounded-md`}>
                        <div><menu.icon size={22} /></div>
                        <h2 style={{transitionDelay: `${i + 3}00ms`}}
                            className={`whitespace-pre duration-500 ${!open && `opacity-0 translate-x-28
                            overflow-hidden`}`}>{menu?.name}</h2>
                        <h2 className={`${open && 'hidden'} absolute opacity-75 left-48 bg-gray-800 font-semibold
                            whitespace-pre text-gray-200 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden 
                            group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 
                            group-hover:w-fit z-50`}>{menu?.name}</h2>
                    </Link>
                ))}
            </div>
        </aside>
    )
}

export default Sidedraw