import RightDashboard from "../../components/doctors/right-dashboard";
import LeftSidebar from "../../components/doctors/left-dashboard";


function DoctorDashboard() {
    return (
        <>

            <div className="grid grid-cols-[260px_1fr] w-full h-screen" >

                <div className="h-screen">
                    <LeftSidebar />
                </div>
                <div className="h-screen overflow-y-auto">
                    <RightDashboard />
                </div>
            </div>
        </>
    )
}

export default DoctorDashboard