import { Bell } from 'lucide-react';
import { Search } from 'lucide-react';
import { CalendarDays, ClipboardCheck, Users, Star, TrendingUp } from 'lucide-react';
import { MoreVertical, Video, Check, X, NotebookPen } from 'lucide-react';
import Images from '../../assets/images/Doc11.png.jpg';
import Images2 from '../../assets/images/Skepta.png.jpg';
import Images3 from '../../assets/images/NaomiS.png.jpg';
import Images4 from '../../assets/images/yatchy.png.jpg';
import Images5 from '../../assets/images/indiaL.png.jpg';

function RightDashboard() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const cards = [
        {
            title: "Total Appointments",
            value: "1,284",
            icon: CalendarDays,
            arrow: <TrendingUp className='w-4 h-4 mx-1' />,
            badge: "+12%",
            badgeColor: "text-green-500",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Pending Approvals",
            value: "8",
            icon: ClipboardCheck,
            badge: "Requires Action",
            badgeColor: "text-orange-500",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
        },
        {
            title: "Today's Patients",
            value: "12",
            icon: Users,
            badge: "Today",
            badgeColor: "text-gray-500",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            title: "Satisfaction Rate",
            value: "98.2%",
            icon: Star,
            badge: "4.9 Avg",
            badgeColor: "text-green-500",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
        },
    ];

    const schedule = [
        { time: "08:00 AM", name: "Naomi Sharron", desc: "Annual Routine Checkup", status: "ARRIVED", image: Images3 },
        { time: "09:30 AM", name: "Skepta", desc: "Post-Op Consultation • Room 302", status: "IN-PROGRESS", active: true, image: Images2},
        { time: "11:00 AM", name: "India Love", desc: "Flu Symptoms • Physical Exam", status: "CONFIRMED", image: Images5 },
        { time: "01:30 PM", name: "Lil Yatchy", desc: "Cardiology Referral Discussion", status: "CONFIRMED", image: Images4 },
    ];

    const requests = [
        { name: "David Miller", desc: "Diabetes Follow-up • Oct 26" },
        { name: "Sophia G.", desc: "Vaccination • Oct 28" },
    ];

    return (
        <>
            <div>
                <header className='bg-white py-4 px-4 flex' >
                    <h2 className='font-bold text-3xl'>Welcome back, Dr. Ademide Akinlolu</h2>

                    <p className="text-md bg-gray-200 rounded-full w-fit h-10 p-2 mx-5">{currentDate}</p>

                    <div className='flex ml-auto bg-gray-300 rounded-full w-60 h-10 p-2'>
                        <Search className='ml-2 mt-1.5 mx-2 w-3 h-3' />
                        <input type="search" name="" id="" placeholder="Search records..." />
                    </div>
                    <Bell className='mx-6 mt-2' />

                    <div className='bg-gray-300 w-0.5 h-10 mr-5'></div>

                    <img src={Images} alt="" className='rounded-full w-10 h-11' />
                    <p className='mx-2 mt-2'>Dr. Vance</p>
                </header>

                <section className="p-8 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {cards.map((card, index) => {
                            const Icon = card.icon

                            return (
                                <div
                                    key={index}
                                    className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                                >

                                    {/* Icon + Bandge */}

                                    <span
                                        className={`absolute top-4 flex right-4 text-xs px-2 py-1 mb-2.5 rounded-full bg-gray-100 ${card.badgeColor}`}
                                    >
                                        {card.arrow} {card.badge}
                                    </span>

                                    <div className="mt-1.5 mb-2.5">
                                        <div className={`p-3 rounded-2xl w-fit ${card.iconBg}`}>
                                            <Icon className={`w-6 h-6 ${card.iconColor}`} />
                                        </div>
                                    </div>

                                    {/* Top Row: Title */}
                                    <div className="flex justify-between items-start">
                                        <p className="text-gray-500 text-sm">
                                            {card.title}
                                        </p>
                                    </div>

                                    {/* Value */}
                                    <h2 className="text-3xl font-semibold text-gray-800 mt-1.5">
                                        {card.value}
                                    </h2>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Schedule + Pending Requests  */}
                <section className='py-8 px-10'>
                    <main className='w-auto grid grid-cols-1 lg:grid-cols-3'>

                        {/* Schedule  */}
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 mx-10  shadow">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">Today's Schedule</h2>
                                <button className="px-4 py-1 rounded-full bg-gray-100 text-sm">
                                    View All
                                </button>
                            </div>

                            <div className="space-y-4">
                                {schedule.map((item, idx) => (

                                    <div
                                        key={idx}
                                        className={`flex items-center justify-between p-4 rounded-xl border ${item.active ? "bg-[#1e3b8a] text-white" : "bg-gray-50"
                                            }`}>

                                        <div className='flex gap-4'>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-10 h-10 rounded-full object-cover border"
                                            />
                                            <div className='flex flex-col'>
                                                <h4 className="font-semibold"> {item.name}</h4>
                                                <p className={`text-sm ${item.active ? "text-indigo-200" : "text-gray-500"}`}>
                                                    {item.desc}
                                                </p>
                                            </div>

                                        </div>

                                        <span
                                            className={`text-xs px-3 py-1 rounded-full ${item.status === "ARRIVED"
                                                ? "bg-green-100 text-green-600"
                                                : item.status === "IN-PROGRESS"
                                                    ? "bg-[#4e62a3] text-white"
                                                    : "bg-gray-200 text-gray-600"
                                                }`}>
                                            {item.status}
                                        </span>

                                        {item.active ? (
                                            <>
                                                <button className="bg-white text-indigo-700 px-4 py-1 rounded-full text-sm">
                                                    View Records
                                                </button>
                                                <button className="p-2 bg-[#4e62a3] rounded-lg">
                                                    <Video size={18} />
                                                </button>
                                            </>
                                        ) : (
                                            <MoreVertical size={18} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6 mx-15">
                            {/* Pending Requests */}
                            <div className="bg-white rounded-2xl p-6 shadow">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold">Pending Requests</h3>
                                    <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                                        8 Action Items
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {requests.map((req, idx) => (
                                        <div key={idx} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{req.name}</p>
                                                <p className="text-sm text-gray-500">{req.desc}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="p-1 bg-green-100 text-green-600 rounded-full">
                                                    <Check size={16} />
                                                </button>
                                                <button className="p-1 bg-red-100 text-red-600 rounded-full">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* Scratchpad */}
                            <div className="bg-gray-100 border-2 border-dashed border-indigo-300 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <NotebookPen className="text-indigo-600" size={18} />
                                    <h3 className="font-semibold">Doctor's Scratchpad</h3>
                                </div>

                                <textarea
                                    className="w-full h-40 bg-transparent outline-none text-sm"
                                    placeholder="Write quick patient notes here..."
                                />

                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>Auto-saved 2 mins ago</span>
                                    <button className="text-indigo-600">Clear</button>
                                </div>
                            </div>


                        </div>
                        <div className='relative pt-6 '>
                            <div className='absolute left-245 bg-white border w-100 h-60 rounded-3xl'>
                                <h2 className='text-gray-600 pt-2 px-4'>
                                    Facility Traffic
                                </h2>

                                <div className="w-full h-87.5 p-4">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6085992148487!2d3.400170275981058!3d6.444274493547049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4cf886977d5%3A0x7e2c77c6c788be1a!2sMelodia%20Coding%20Academy!5e0!3m2!1sen!2sng!4v1771847582119!5m2!1sen!2sng" frameborder="10" className='rounded-3xl w-90'></iframe>
                                    <p className='pt-3 text-gray-400'>Wait Time Avg: <span className='font-bold text-black'>12m</span></p>

                                </div>
                            </div>
                        </div>

                    </main>
                </section>
            </div>
        </>
    )

}
export default RightDashboard