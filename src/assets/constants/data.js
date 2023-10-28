import { IoIosSpeedometer } from 'react-icons/io'
import { HiHome, HiAcademicCap, HiUsers, HiUser, HiUserGroup, HiOfficeBuilding, 
    HiBookOpen, HiMenu, HiOutlineVariable } from 'react-icons/hi'
import { ImOffice } from 'react-icons/im'
import { AiOutlineLineChart } from 'react-icons/ai'
import { MdOutlineScore } from 'react-icons/md'
import { RiSettings4Line } from 'react-icons/ri'
import { Facebook, Twitter, Instagram, BarChart2, TrendingUp } from 'react-feather'

export const PORT = 5000
export const URL = `http://localhost:${PORT}`
export const URL_AUTH = `http://localhost:${PORT}/auth`

export const images = {
    logo: require('../images/logo.jpg'),
    photo1: require('../images/Photo1.jpg'),
    photo2: require('../images/Photo2.jpg'),
    photo3: require('../images/Photo3.jpg'),
    photo4: require('../images/Photo4.jpg'),
    photo5: require('../images/Photo5.jpg'),
    photo6: require('../images/Photo6.jpg'),
    photo7: require('../images/Photo7.jpg'),
}

export const features = [
    {
      title: 'Easy Result Checking',
      description:
        'Quickly check your grades and academic performance with just a few clicks.',
    },
    {
      title: 'Detailed Insights',
      description:
        'Get detailed insights into each course, including grades, credits, and more.',
    },
    {
      title: 'User-Friendly Interface',
      description:
        'Intuitive and user-friendly design for a seamless experience.',
    },
    {
      title: 'Mobile Responsive',
      description:
        'Access your results on the go with our mobile-responsive design.',
    },
]

export const testimonials = [
    {
      name: 'John Doe',
      position: 'Computer Science Student',
      quote:
        'The result checker made it incredibly easy for me to track my academic progress. I love the user-friendly interface and quick access to detailed insights.',
    },
    {
      name: 'Jane Smith',
      position: 'Graduate',
      quote:
        `As a graduate, I still use the result checker to access my past academic records. It's a valuable tool that I highly recommend to all students.`,
    },
    {
        name: 'Emily Johnson',
        position: 'Computer Science Student',
        quote:
        'The result checker is a game-changer! It not only helped me keep track of my grades but also provided valuable insights into my academic journey. Highly recommended!',
    },
    {
        name: 'Alex Turner',
        position: 'Alumnus',
        quote:
            `Even after graduating, I find myself using the result checker to reflect on my academic achievements. It's a simple yet powerful tool that stands the test of time.`,
    },
    {
        name: 'Sophie Rodriguez',
        position: 'Alumnus',
        quote:
            'As an Alumnus of the department of computer science NACEST, I appreciate the efficiency of the result checker. It allows me to monitor my progress in real-time, giving me the confidence to excel in my research.',
    },
    {
        name: 'Michael Chen',
        position: 'Alumnus',
        quote:
            'The result checker is a must-have for every student. It not only simplifies the process of checking grades but also serves as a valuable archive for academic accomplishments.',
    },
]

export const icons = {
    linechart: AiOutlineLineChart,
    outlinescore: MdOutlineScore,
    barchart2: BarChart2,
    trendingup: TrendingUp,
    speedometer: IoIosSpeedometer,
    home: HiHome,
    menus: HiMenu,
    academic: HiAcademicCap,
    users: HiUsers,
    user: HiUser,
    userGroup: HiUserGroup,
    officeBuilding: HiOfficeBuilding,
    offiiceBuildings: ImOffice,
    openBook: HiBookOpen,
    settings: RiSettings4Line,
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    evaluate: HiOutlineVariable,
}

export const styles = {
    btnToggler: `
      inline-flex items-center justify-center p-2 rounded-md text-gray-400 
      hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white
    `,
    btnNav: `
        text-indigo-100 font-bold px-4 py-2 rounded-full text-xs uppercase
    `,
    input: `
        bg-slate-100 border border-gray-200 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
        focus:border-primary-600 ark:text-gray-900 
        dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 mb-2
    `,
    inputLight: `
        border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
        focus:border-primary-600 block 
        w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-gray-900 
        dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2
    `,
    btnPrimary: `
        w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:border 
        focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
        dark:hover:bg-primary-700 
        dark:focus:ring-primary-800 hover:border my-2
    `,
    btnSecondary: `
        w-full text-white bg-primary-600 hover:bg-primary-200 focus:ring-4 focus:outline-none focus:border 
        focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
        dark:hover:bg-primary-700 disabled:bg-gray-100
        dark:focus:ring-primary-800 :hover:border my-2
    `,
    navLink: `
        flex items-center p-2 text-base font-normal text-gray-900 
        rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
    `,
    navDropdown: `
        flex items-center justify-between p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white
        w-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700
    `,
    navLinkItem: `
        text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium
    `,
    indicator: `
        text-lg border-2 border-dotted border-pink-100 p-1 rounded-full h-10 w-10 mx-auto
        font-bold text-center text-red-500
    `,
    button: `
        w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
        focus:border focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
        dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:border 
        disabled:bg-gray-800
    `,
    label: `
        block mb-2 text-md font-medium text-gray-900 dark:text-white
    `,
}

export const urls = {
    root: '/',
    signin: 'login',
    signup: 'signup',
    signout: 'signout',
    calendar: 'calendars',
    campuses: 'campuses',
    enterprises: 'enterprises',
    sitemap: 'sitemap',
    globalLocation: 'global-location',
    contact: 'contact-us',
    about: 'about-us',
    mission: 'our-mission',
    vision: 'our-vision',
    schools: 'schools', 
    settings: 'users',
    departments: 'departments',
    programmes: 'programmes',
    results: 'results',
    scores: 'scores',
    evaluate: 'evaluates',
    units: 'units',
    offices: 'offices',
    council: 'council',
    courses: 'courses',
    staffs: 'staffs',
    register: 'register',
    create: 'create',
    view: 'view',
    update: 'update',
    delete: 'delete',
    landing: 'landing',
    dashboard: 'dashboard',
    user: 'user',
    admin: 'admin',
    super: 'super',
    student: 'students',
    center: 'blood-bank',
    overview: 'overview',
    notification: 'notification',
    profile: 'profile',
}

export const menus = {
    admin: [
        {name: 'Dashboard', link: ``, icon: IoIosSpeedometer },
        {name: 'Courses', link: `${urls.courses}`, icon: icons.openBook },
        {name: 'Staff', link: `${urls.staffs}`, icon: icons.users },
        {name: 'Students', link: `${urls.student}`, icon: icons.userGroup},
        {name: 'Scores', link: `${urls.scores}`, icon: icons.outlinescore},
        {name: 'Results', link: `${urls.results}`, icon: icons.trendingup},
        {name: 'Settings', link: `${urls.settings}`, icon: icons.settings },
    ],
    lecturer: [
        {name: 'Dashboard', link: ``, icon: IoIosSpeedometer },
        {name: 'Courses', link: `${urls.courses}`, icon: icons.openBook },
        {name: 'Students', link: `${urls.student}`, icon: icons.userGroup},
        {name: 'Scores', link: `${urls.scores}`, icon: icons.outlinescore},
        {name: 'Results', link: `${urls.results}`, icon: icons.trendingup},
    ],
    student: [
        {name: 'Dashboard', link: ``, icon: IoIosSpeedometer },
        {name: 'Courses', link: `${urls.courses}`, icon: icons.openBook },
        {name: 'Scores', link: `${urls.scores}`, icon: icons.outlinescore},
        {name: 'Results', link: `${urls.results}`, icon: icons.trendingup},
    ],
}

export const links = [
    {name: 'About', submenu: true, sublinks: [
      {
        Head: 'About All NACEST',
        sublink: [
          {name: 'The Polytechnic', link: '/about-polytechnic'},
          {name: 'Mission & Vission', link: '/about-mission-vission'},
          {name: 'Projects', link: '/about-projects'},
          {name: 'Linkages', link: '/about-linkages'},
          {name: 'Staff Directory', link: '/about-staff-directory'},
        ]
      },
      {
        Head: 'The Management',
        sublink: [
          {name: `The Rector's Office`, link: '/about-principal-officer'},
          {name: 'Board of Trustees', link: '/about-board-of-trustees'},
          {name: 'Governing Council', link: '/about-governing-council'},
        ]
      },
      {
        Head: 'Support Units',
        sublink: [
          {name: 'Academic Planning', link: '/Academic-Planning'},
          {name: 'Physical Planning & Dev.', link: '/Physical-Planning-and-Development'},
          {name: 'Student Affairs Division', link: '/Students-Affairs-Division'},
          {name: 'Security Division', link: '/security-division'},
          {name: 'Polytechnic Advancement', link: '/polytechnic-advancement'},
          {name: 'Polytechnic Health Service', link: '/polytechnic-health-services'},
        ]
      },
    ]},
    {name: 'Administration', submenu: true, sublinks: [
        {
            Head: 'Centeral Administration',
            sublink: [
              {name: 'The Rector', link: '/rector'},
              {name: 'Deputy Rector', link: '/deputy-rector'},
              {name: 'Registrar', link: '/registrar'},
            ]
        },
        {
            Head: 'Directorates & Units',
            sublink: [
              {name: 'Consultancy Servicees', link: '/consultancy-services'},
              {name: 'Guidance & counseling', link: '/guidance-counseling'},
              {name: 'Information & Protocol', link: '/information-protocol'},
            ]
        },
        {
            Head: 'Centers',
            sublink: [
              {name: 'ERDC', link: '/ERDC'},
              {name: 'ICT', link: '/ICT'},
            ]
        },
    ]},
    {name: 'Academics', submenu: true, sublinks: [
        {
            Head: 'Schools',
            sublink: [
              {name: 'School of Environmental Studies', link: '/environmental-studies'},
              {name: 'School of Management Business Studies', link: '/management-business-studies'},
              {name: 'School of Applied & Natural Sciences', link: '/school-of-applied-and-natural-sciences'},
              {name: 'Schoool of Engineering Technology', link: '/schoool-of-engineering-technology'},
            ]
        },
        {
            Head: 'The Polytechnic'
        },
        {
            Head: 'Planning',
            sublink: [
              {name: 'Academic Planning', link: '/academic-planning'},
              {name: 'Academic Calendar', link: '/academic-calendar'},
            ]
        },
    ]},
    {name: 'Admission', submenu: true, sublinks: [
      {
        Head: 'Programs',
        sublink: [
          {name: 'Pre-ND', link: '/Pre-nd'},
          {name: 'Ordinary Diploma', link: '/ordinary-diploma'}, 
          {name: 'National Diploma', link: '/national-diploma'},
          {name: 'Higher National Diploma', link: '/higher-national-diploma'},
        ]
      },
      {
        Head: 'Fees & Scholarship',
        sublink: [
          {name: 'Schedule of fees', link: '/schedule-fees'},
          {name: 'Part Time Fees', link: '/part-time-fees'},
          {name: 'Available Scholarship', link: '/avaiable-schoolarship'},
        ]
      },
      {
        Head: 'Life At All NACEST',
        sublink: [
          {name: 'Sports', link: '/sport'},
          {name: 'Cafteria', link: '/cafteria'},
        ]
      },
    ]},
    {name: 'Research', submenu: true, sublinks: [
        {
            Head: 'Research',
            sublink: [
              {name: 'Research Policy', link: '/research-policy'},
              {name: 'Academic Journals', link: '/academic-journals'},
              {name: 'Publications', link: '/publications'},
            ]
        },
        {
            Head: 'Resources',
            sublink: [
              {name: 'Library Policy', link: '/library-policy'},
              {name: 'Repository Journals', link: '/repository-journals'},
              {name: 'E-Learning', link: '/e-learning'},
              {name: 'OER', link: '/oer'},
            ]
        },
    ]},
    {name: 'Library'},
    {name: 'Contact'},
]
