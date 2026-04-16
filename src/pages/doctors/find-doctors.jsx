
import { Bell, BriefcaseMedical, Search, Shapes, ListFilter, Star, Heart, MapPin, CalendarCheck, Send } from 'lucide-react';
import { Link } from 'react-router-dom'
import Images2 from '../../assets/images/Skepta.png.jpg'




function FindDoctors() {

    const cards = [
        {
            images: Images2,
            names: 'Dr.Sarah Jenkins',
            title: 'Senior Cardiologist',
            Icon: <Star className='text-yellow-300' />,
            rating: '4.9',
            reviews: '(120 Reviews)',
            Icon3: <MapPin />,
            location: 'St. Marys Medical Plaza,NY',
            Icon4: <CalendarCheck />,
            availabilty: 'Available Tomorrow, 10:00 AM',
            Icon2: <Heart />,
        },
        {
            images: Images2,
            names: 'Dr.Sarah Jenkins',
            title: 'Senior Cardiologist',
            Icon: <Star className='text-yellow-300' />,
            rating: '4.9',
            reviews: '(120 Reviews)',
            Icon3: <MapPin />,
            location: 'St. Marys Medical Plaza,NY',
            Icon4: <CalendarCheck />,
            availabilty: 'Available Tomorrow, 10:00 AM',
            Icon2: <Heart />,
        },
        {
            images: Images2,
            names: 'Dr.Sarah Jenkins',
            title: 'Senior Cardiologist',
            Icon: <Star className='text-yellow-300' />,
            rating: '4.9',
            reviews: '(120 Reviews)',
            Icon3: <MapPin />,
            location: 'St. Marys Medical Plaza,NY',
            Icon4: <CalendarCheck />,
            availabilty: 'Available Tomorrow, 10:00 AM',
            Icon2: <Heart />,
        },
        {
            images: Images2,
            names: 'Dr.Sarah Jenkins',
            title: 'Senior Cardiologist',
            Icon: <Star className='text-yellow-300' />,
            rating: '4.9',
            reviews: '(120 Reviews)',
            Icon3: <MapPin />,
            location: 'St. Marys Medical Plaza,NY',
            Icon4: <CalendarCheck />,
            availabilty: 'Available Tomorrow, 10:00 AM',
            Icon2: <Heart />,
        },
        {
            images: Images2,
            names: 'Dr.Sarah Jenkins',
            title: 'Senior Cardiologist',
            Icon: <Star className='text-yellow-300' />,
            rating: '4.9',
            reviews: '(120 Reviews)',
            Icon3: <MapPin />,
            location: 'St. Marys Medical Plaza,NY',
            Icon4: <CalendarCheck />,
            availabilty: 'Available Tomorrow, 10:00 AM',
            Icon2: <Heart />,
        },
        {
            images: Images2,
            names: 'Dr.Sarah Jenkins',
            title: 'Senior Cardiologist',
            Icon: <Star className='text-yellow-300' />,
            rating: '4.9',
            reviews: '(120 Reviews)',
            Icon3: <MapPin />,
            location: 'St. Marys Medical Plaza,NY',
            Icon4: <CalendarCheck />,
            availabilty: 'Available Tomorrow, 10:00 AM',
            Icon2: <Heart />,
        },

    ]

    return (

        <>

            {/* Navbar  */}

            <div className='px-50 bg-white py-2 flex'>
                <header className='flex gap-60'>

                    <div className='flex '>
                        <div className='bg-[#1e3b8a] py-3 px-2 rounded-2xl w-10 h-13 text-white'>
                            <BriefcaseMedical />
                        </div>
                        <div className='px-3 py-2 font-bold text-xl text-[#1e3b8a]'>
                            <Link to="/">CareConnect</Link>
                        </div>
                    </div>

                    <div className='flex gap-7 items-center text-gray-500'>

                        <div className=' hover:text-[#1e3b8a]'>
                            <Link to="">Find a Doctor</Link>
                        </div>

                        <div className=' hover:text-[#1e3b8a]'>
                            <Link to="">Appointments</Link>
                        </div>

                        <div className=' hover:text-[#1e3b8a]'>
                            <Link to="">Messages</Link>
                        </div>

                        <div className=' hover:text-[#1e3b8a]'>
                            <Link to="">Health Records</Link>
                        </div>

                    </div>

                    <div className='flex'>

                        <button className='mx-4 hover:bg-gray-400/40 px-3 py-3 hover:rounded-full hover:text-black'>
                            <Bell className=' bg-none text-black' />
                        </button>
                        <div>
                            <img src={Images2} alt="" className='rounded-full w-10 h-10 mt-1' />
                        </div>
                    </div>
                </header>
            </div>

            {/* Main section  */}
            <section className='mx-60'>

                <div className='max-w-7xl px-6 pt-10 pb-5'>
                    <h2 className='text-4xl font-bold text-gray-900 mb-10"'>Find the right care for you</h2>
                </div>

                <div className='flex gap-2 rounded-2xl bg-gray-200 px-2 py-2'>

                    <div className='flex items-center flex-1 gap-2 bg-gray-50 rounded-2xl px-6 py-4 shadow-sm'>

                        <Search className='' />
                        <search className='text-gray-400'>
                            <input type="text" />
                        </search>
                        <input type='text' placeholder='Search by name, Clinic, or Keyword...' className='bg-transparent outline-none' />
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-6 py-4">

                        <Shapes />
                        <select name="" id="">
                            <option value="">All Specialization</option>
                            <option value="">Cardiologgy</option>
                            <option value="">Pediatics</option>
                            <option value="">Dermathology</option>
                            <option value="">Neurology</option>
                            <option value="">Orthopedics</option>
                        </select>
                    </div>

                    <div className='flex items-center gap-2 bg-[#1e3b8a] rounded-2xl text-white px-5 py-3'>
                        <ListFilter />
                        <button>Find Doctors</button>
                    </div>
                </div>

                <div className='flex gap-5 text-[#485469] mt-5'>

                    <h6 className='text-[#63748a]'>Popular:</h6>
                    <p className='rounded-3xl bg-gray-200 px-3 hover:text-white hover:bg-[#14b8a5]'>Cardiologist</p>
                    <p className='rounded-3xl bg-gray-200 px-3 hover:text-white hover:bg-[#14b8a5]'>Peditrician</p>
                    <p className='rounded-3xl bg-gray-200 px-3 hover:text-white hover:bg-[#14b8a5]'>Dentist</p>
                    <p className='rounded-3xl bg-gray-200 px-3 hover:text-white hover:bg-[#14b8a5]'>Therapist</p>
                </div>

                <div className='flex relative w-full'>
                    <div className='absolute right-0'>
                        <h6 className=''>Sort by:</h6>
                        <select name="" id="" className='text-[#1e3b8a]'>Most Recommended
                            <option value="">Most Recommended</option>
                            <option value="">Hisgest Rating</option>
                            <option value="">Experience</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Doctors cards section */}
            <section className="p-8 bg-gray-50 mx-60 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cards.map((card, index) => {
                        return (
                            <div
                                key={index}
                                className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                            >

                                {/* Cards components */}
                                <div className='flex gap-4'>

                                    <div>
                                        <img
                                            src={card.images}
                                            alt={card.names}
                                            className="w-17 h-20 rounded-2xl object-cover"
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <div>
                                            {card.names}
                                        </div>

                                        <div>
                                            {card.title}
                                        </div>

                                        <div className='flex gap-2'>

                                            <div className='flex'>
                                                <div >
                                                    {card.Icon}
                                                </div>

                                                <div className='font-bold'>
                                                    {card.rating}
                                                </div>

                                            </div>


                                            <div className='text-sm'>
                                                {card.reviews}
                                            </div>

                                        </div>

                                    </div>
                                </div>


                                <div className=" flex text-gray-800 mt-4 mb-2 gap-2">
                                    {card.Icon3}
                                    {card.location}
                                </div>

                                <div className='mb-2 flex gap-2'>
                                    {card.Icon4}
                                    {card.availabilty}
                                </div>

                                <div className=' flex gap-2 '>
                                    <button className='bg-[#1e3b8a] text-white p-3 w-full text-center rounded-2xl'>
                                        View Profile
                                    </button>

                                    <div className=' border hover:border rounded-xl px-2 hover:bg-red-100 hover:text-red-400 items-center flex '>
                                        {card.Icon2}
                                    </div>
                                </div>
                            </div>


                        )
                    })}
                </div>

                <div className='flex justify-center my-10'>
                    <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md">
                        <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                            <span class="sr-only">Previous</span>
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </a>
                        {/* <!-- Current: "z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-500 focus-visible:outline-indigo-500", Default: "inset-ring focus:outline-offset-0 text-gray-200 inset-ring-gray-700 hover:bg-white/5" --> */}
                        <a href="#" aria-current="page" class="relative z-10 inline-flex items-center bg-[#1e3b8a] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3b8a]">1</a>
                        <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">2</a>
                        <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                        <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 inset-ring inset-ring-gray-700 focus:outline-offset-0">...</span>
                        <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                        <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">9</a>
                        <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">10</a>
                        <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                            <span class="sr-only">Next</span>
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                </div>
            </section>

            <footer className='bg-white px-50  py-10 flex flex-col'>
                <div className='gap-30 flex'>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <div className='bg-[#1e3b8a] py-3 px-2 rounded-2xl w-10 h-13 text-white'>
                                <BriefcaseMedical />
                            </div>

                            <h2 className='px-3 py-2 font-bold text-xl text-[#1e3b8a]'>
                                CareConnect
                            </h2>

                        </div>

                        <div className='text-sm w-80 my-2'>
                            <p>Connecting patients with the world's best healthcare providers since 2024.</p>
                        </div>

                    </div>

                    <div>
                        <h3 className='font-bold'>
                            FOR PATIENTS
                        </h3>

                        <ul>
                            <li className='text-[#63748a] hover:text-[#1e3b8a]'><Link to="#" >Find a Doctor</Link></li>
                            <li className='text-[#63748a] hover:text-[#1e3b8a]'><Link to="#">Book Appointment</Link></li>
                            <li className='text-[#63748a] hover:text-[#1e3b8a]'><Link to="#">Reviews</Link></li>
                        </ul>

                    </div>

                    <div>

                        <h3 className='font-bold'>
                            FOR DOCTORS
                        </h3>

                        <ul>
                            <li className='text-[#63748a] hover:text-[#1e3b8a]'><Link to="">Join the Network</Link></li>
                            <li className='text-[#63748a] hover:text-[#1e3b8a]'><Link to="">Provider Portal</Link></li>
                            <li className='text-[#63748a] hover:text-[#1e3b8a]'><Link to="">Resources</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className=' font-bold'>
                            NEWSLETTER
                        </h3>

                        <div className=''>
                            <input type="email" placeholder="Email Address" className="bg-[#f5f5f7] h-12 w-50 text-[#6b7080] rounded-2xl outline-none flex-1 px-4 my-2" />
                            <button className="bg-[#1e3b8a] p-3 rounded-2xl mx-3 text-white">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="border-t mt-8 pt-4 flex text-gray-400 text-sm">
                </div>

                <div className='flex justify-between text-sm text-[#63748a]'>
                    <p>
                        © 2024 CareConnect Healthcare. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm">
                        <Link to="#">Privacy Policy</Link>
                        <Link to="#">Terms of Service</Link>
                        <Link to="#">Cookie Settings</Link>
                    </div>
                </div>

            </footer>

        </>
    )

}

export default FindDoctors