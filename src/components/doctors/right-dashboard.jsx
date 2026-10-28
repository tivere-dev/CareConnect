import { useEffect, useState } from 'react';
import { Bell, Search, CalendarDays, ClipboardCheck, Users, Star, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { appointmentsAPI } from '../../services/api';

const statusColors = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    Accepted: { bg: 'bg-green-100', text: 'text-green-700' },
    Rejected: { bg: 'bg-red-100', text: 'text-red-700' },
    Completed: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    Confirmed: { bg: 'bg-green-100', text: 'text-green-700' },
    "In Progress": { bg: 'bg-blue-100', text: 'text-blue-700' },
    Canceled: { bg: 'bg-red-100', text: 'text-red-700' },
};

function RightDashboard() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    useEffect(() => {
        if (user?.name) {
            appointmentsAPI.getAll()
                .then(setAppointments)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [user]);

    async function handleStatus(id, status) {
        try {
            const updated = await appointmentsAPI.updateStatus(id, status);
            setAppointments((prev) => prev.map((a) => (a._id === id ? updated : a)));
            setMessage(`Appointment ${status.toLowerCase()} successfully!`);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
        }
    }

    const pending = appointments.filter((a) => a.status === 'Pending');
    const today = appointments.filter((a) => {
        const d = new Date(a.date);
        const now = new Date();
        return d.toDateString() === now.toDateString();
    });

    const cards = [
        { title: "Total Appointments", value: String(appointments.length), icon: CalendarDays, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
        { title: "Pending Approvals", value: String(pending.length), icon: ClipboardCheck, iconBg: "bg-orange-100", iconColor: "text-orange-600" },
        { title: "Today's Patients", value: String(today.length), icon: Users, iconBg: "bg-green-100", iconColor: "text-green-600" },
        { title: "Accepted", value: String(appointments.filter((a) => a.status === 'Accepted' || a.status === 'Confirmed').length), icon: Star, iconBg: "bg-purple-100", iconColor: "text-purple-600" },
    ];

    return (
        <div>
            <header className='bg-white py-4 px-6 flex items-center border-b'>
                <h2 className='font-bold text-2xl'>Welcome back, {user?.name || 'Doctor'}</h2>
                <p className="text-sm bg-gray-200 rounded-full px-3 py-1 ml-4">{currentDate}</p>
                <div className='flex ml-auto items-center gap-4'>
                    <Bell className='text-gray-500 cursor-pointer' size={20} />
                    <div className='w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold'>
                        {user?.name?.charAt(0)?.toUpperCase() || 'D'}
                    </div>
                </div>
            </header>

            <section className="p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                                <div className={`p-2.5 rounded-xl w-fit ${card.iconBg} mb-3`}>
                                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                                </div>
                                <p className="text-gray-500 text-sm">{card.title}</p>
                                <h2 className="text-2xl font-semibold text-gray-800 mt-1">{card.value}</h2>
                            </div>
                        );
                    })}
                </div>
            </section>

            {message && (
                <div className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm">
                    {message}
                </div>
            )}

            <section className='p-6'>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">My Appointments</h2>
                        <span className="text-sm text-gray-500">{appointments.length} total</span>
                    </div>

                    {loading ? (
                        <p className="text-gray-400 py-8 text-center">Loading appointments...</p>
                    ) : appointments.length === 0 ? (
                        <p className="text-gray-400 py-8 text-center">No appointments assigned to you yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-gray-500 text-xs uppercase">
                                        <th className="pb-3 pr-4">Patient</th>
                                        <th className="pb-3 pr-4">Type</th>
                                        <th className="pb-3 pr-4">Date</th>
                                        <th className="pb-3 pr-4">Time</th>
                                        <th className="pb-3 pr-4">Status</th>
                                        <th className="pb-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appt) => {
                                        const sc = statusColors[appt.status] || { bg: 'bg-gray-100', text: 'text-gray-600' };
                                        return (
                                            <tr key={appt._id} className="border-b last:border-0">
                                                <td className="py-3 pr-4 font-medium">{appt.patient}</td>
                                                <td className="py-3 pr-4 text-gray-600">{appt.type}</td>
                                                <td className="py-3 pr-4">{appt.date}</td>
                                                <td className="py-3 pr-4">
                                                    <span className="flex items-center gap-1 text-gray-600">
                                                        <Clock size={13} /> {appt.time}
                                                    </span>
                                                </td>
                                                <td className="py-3 pr-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
                                                        {appt.status}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    {appt.status === 'Pending' ? (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleStatus(appt._id, 'Accepted')}
                                                                className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-medium hover:bg-green-100 cursor-pointer"
                                                            >
                                                                <CheckCircle2 size={13} /> Accept
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatus(appt._id, 'Rejected')}
                                                                className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-medium hover:bg-red-100 cursor-pointer"
                                                            >
                                                                <XCircle size={13} /> Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default RightDashboard;
