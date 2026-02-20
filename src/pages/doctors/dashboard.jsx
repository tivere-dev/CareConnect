import { Bell } from 'lucide-react';
import { Search } from 'lucide-react';
import Doctorsimage1 from '../../assets/images/dr1.png';

function DoctorDashboard() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    return (
        <>
            <div>
                <header className='bg-white py-4 px-4 flex' >
                    <h2 className='font-bold text-3xl'>Welcome back, Dr. Ademide Akinlolu</h2>

                    <p className="text-md bg-gray-200 rounded-4xl w-fit h-10 p-2 mx-5">{currentDate}</p>

                    <div className='flex ml-110 bg-gray-300 rounded-4xl w-60 h-10 p-2'>
                        <Search className='ml-2 mt-1.5 mx-2 w-3 h-3'/>
                        <input type="search" name="" id="" placeholder="Search records..." />
                    </div>
                    <Bell className='mx-6 mt-2'/>

                    <div className='bg-gray-300 w-0.5 h-10 mr-5'></div>

                    <img src={Doctorsimage1} alt="" className='rounded-full w-10 h-10' />
                    <p className='mx-2 mt-2'>Dr. Vance</p>





                </header>
            </div>

        </>
    )

}
export default DoctorDashboard