import { Link } from 'react-router-dom';
import { BriefcaseMedical, LayoutDashboard, CalendarCheck2, Clock9, Users, ChartNoAxesCombined, User, LogOut } from 'lucide-react';





function LeftSidebar() {
    return (
        <>

            <div className='bg-[#1e3b8a] text-white px-5 py-4'>
                <div className='flex text-2xl'>
                    <div className='bg-[#4e62a3] py-3 px-2 rounded-2xl'>
                        <BriefcaseMedical />
                    </div>
                    <Link to="/" className='px-3 py-2 font-bold'>CareConnect</Link>
                </div>

                <div className='mt-15 space-y-7 pl-5 text-xl'>
                    <div className='flex gap-3 hover:bg-[#365096] hover:py-2 rounded-2xl hover:border-0' >
                        <LayoutDashboard />
                        <Link to="">Dashboard</Link>
                    </div>

                    <div className='flex gap-3'>
                        <CalendarCheck2 />
                        <Link to="">Appointments</Link>
                    </div>

                    <div className='flex gap-3'>
                        <Clock9 />
                        <Link to="/doctor/find-doctors">Availability</Link>
                    </div>

                    <div className='flex gap-3'>
                        <Users />
                        <Link to="">Patients</Link>
                    </div>

                    <div className='flex gap-3'>
                        <ChartNoAxesCombined />
                        <Link to="">Analytics</Link>
                    </div>

                    <div className="border-t mt-118 flex text-gray-400 text-sm">

                    </div>

                    <div className='relative'>
                        {/* <hr className='mt-120' /> */}

                        <div className='flex py-5 gap-3'>
                            <User />
                            <Link to="">Profile</Link>
                        </div>

                        <div className='flex text-red-400 gap-3'>

                            <LogOut />
                            <Link to="/">Logout</Link>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default LeftSidebar