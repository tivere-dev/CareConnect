


function DoctorDashboard() {
    const today = new Date()
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    return (
        <>
        <div>
            <header>
                <h2>Welcome back, Dr. Ademide Akinlolu</h2>
                <p className="text-3xl">{currentDate}</p>
            </header>
        </div>
        
        </>
    )
    
}
export default DoctorDashboard