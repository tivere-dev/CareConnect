import { Link, useNavigate } from 'react-router-dom';
import { BriefcaseMedical, LayoutDashboard, CalendarCheck2, Clock9, Users, ChartNoAxesCombined, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function LeftSidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
        <div className='bg-[#1e3b8a] text-white px-5 py-4 h-full'>
            <div className='flex text-2xl'>
                <div className='bg-[#4e62a3] py-3 px-2 rounded-2xl'>
                    <BriefcaseMedical />
                </div>
                <Link to="/" className='px-3 py-2 font-bold'>CareConnect</Link>
            </div>

            <div className='mt-15 space-y-7 pl-5 text-xl'>
                <div className='flex gap-3 hover:bg-[#365096] hover:py-2 rounded-2xl hover:border-0'>
                    <LayoutDashboard />
                    <Link to="/doctor/dashboard">Dashboard</Link>
                </div>

                <div className='flex gap-3'>
                    <CalendarCheck2 />
                    <Link to="/doctor/dashboard">Appointments</Link>
                </div>

                <div className='flex gap-3'>
                    <Clock9 />
                    <Link to="/doctor/find-doctors">Availability</Link>
                </div>

                <div className='flex gap-3'>
                    <Users />
                    <Link to="/doctor/dashboard">Patients</Link>
                </div>

                <div className='flex gap-3'>
                    <ChartNoAxesCombined />
                    <Link to="/doctor/dashboard">Analytics</Link>
                </div>

                <div className="border-t mt-40 flex text-gray-400 text-sm"></div>

                <div className='relative'>
                    <div className='flex py-5 gap-3'>
                        <User />
                        <Link to="/doctor/dashboard">Profile</Link>
                    </div>

                    <button className='flex text-red-400 gap-3 bg-transparent border-none cursor-pointer text-xl' onClick={handleLogout}>
                        <LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LeftSidebar;
