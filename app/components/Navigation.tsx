import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  return (
   <nav>
        <ul className='inline-block list-none navlist' >
            <li>
                <Link href={"/"}>
                    Home
                </Link>
            </li>
            <li>
                <Link href="/menus">
                    Menu
                </Link>
            </li>
        </ul>
   </nav>
    
  )
}



export default Navigation