{/* Schedule + Pending Requests  */ }
<section className='p-8'>
    <main className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule  */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
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
                        className={`flex items-center justify-between p-4 rounded-xl border ${item.active ? "bg-indigo-700 text-white" : "bg-gray-50"
                            }`}>
                        <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className={`text-sm ${item.active ? "text-indigo-200" : "text-gray-500"}`}>
                                {item.desc}
                            </p>
                        </div>

                        <span
                            className={`text-xs px-3 py-1 rounded-full ${item.status === "ARRIVED"
                                ? "bg-green-100 text-green-600"
                                : item.status === "IN-PROGRESS"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-gray-200 text-gray-600"
                                }`}>
                            {item.status}
                        </span>

                        {item.active ? (
                            <>
                                <button className="bg-white text-indigo-700 px-4 py-1 rounded-full text-sm">
                                    View Records
                                </button>
                                <button className="p-2 bg-indigo-600 rounded-lg">
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
        <div className="space-y-6">
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

    </main>
</section>