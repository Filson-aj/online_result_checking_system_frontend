import { Link } from 'react-router-dom'

import { urls, icons } from '../../../assets/constants/data'
const Footer = () => {
  return (
    <footer className='bg-gray-700 pt-4 text-center text-sm font-ligt'>
        <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 py-8'>
            {/* Page info */}
            <div>
                <h2 className='mb-6 text-sm font-semibold text-gray-400 hover:text-gray-100 uppercase'>
                   Computer Science Department NACEST™
                </h2>
                <ul className='text-gray-400'>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={urls.about}>About us</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={urls.contact}>Contact us</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/board-of-directors`}>Board of Directors</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/commission`}>Commission</Link>
                    </li>
                </ul>
            </div>
            {/* Help center section */}
            <div>
                <h2 className='mb-6 text-sm font-semibold text-gray-400 hover:text-gray-100 uppercase'>
                    Help Center
                </h2>
                <ul className='text-gray-400'>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/customer-care`}>Customer Care</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/https://facebook.com/nrsc`}>Facebook</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`https://twitter.com/nrsc`}>Twitter</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`https://instagram.com/nrsc`}>Instagram</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/email-us`}>Email us</Link>
                    </li>
                </ul>
            </div>
            {/* Legal section */}
            <div>
                <h2 className='mb-6 text-sm font-semibold text-gray-400 hover:text-gray-100 uppercase'>
                    Legal
                </h2>
                <ul className='text-gray-400'>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/privacy-policy`}>Privacy &amp; Policy</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/licensing`}>Licensing</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/terms-condition`}>Terms &amp; Conditions</Link>
                    </li>
                </ul>
            </div>
            {/* Legal section */}
            <div>
                <h2 className='mb-6 text-sm font-semibold text-gray-400 hover:text-gray-100 uppercase'>
                    Download
                </h2>
                <ul className='text-gray-400'>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/download`}>iOs</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/download`}>Android</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/download`}>Windows</Link>
                    </li>
                    <li className='hover:text-gray-100 mb-3'>
                        <Link to={`/download`}>MacOS</Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className='px-4 py-6 bg-gray-600 md:flex md:items-center md:justify-between'>
            <span className="text-sm text-gray-400 sm:text-center">
                © 2023 <Link to={urls.root} className="text-gray-100">CS Department™</Link>. All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
                {/* Social Media Icons */}
                <Link to={`https://facebook.com`} className="text-gray-400 hover:text-indigo-600">
                <icons.facebook size={20} />
                </Link>
                <Link to={`https://twitter.com`} className="text-gray-400 hover:text-indigo-600">
                <icons.twitter size={20} />
                </Link>
                <Link to={`https://instagram.com`} className="text-gray-400 hover:text-indigo-600">
                <icons.instagram size={20} />
                </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer