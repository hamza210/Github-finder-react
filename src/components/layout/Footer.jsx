import React from 'react'
import { FaGithub } from 'react-icons/fa'

function Footer() {
  return (
    <footer className='footer p-8 bg-gray-700 text-primary-content footer-center'>
        <p>
            <FaGithub className='text-5xl inline'/> 
            CopyRight &copy; 2022, All Right Reserved
        </p>
    </footer>
  )
}


export default Footer
