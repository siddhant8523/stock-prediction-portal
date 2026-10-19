
import { useEffect } from "react";
import axiosInstance from "../axiosInstance";

function Dashboard() {

    const accessToken=localStorage.getItem("accessToken");
    useEffect(()=>{

        const fetchProtectedData= async()=>{
            try{
                const response=await axiosInstance.get("/protected-view",{
                    headers:{
                        Authorization:`Bearer ${accessToken}`
                    }
                })
                console.log('Success',response.data);

            }catch(error){
                console.log("Error:",error);
            }
        }
        fetchProtectedData();
    },[])
  return (
    <div className="text-light">
        Dashboard
    </div>
  )
}

export default Dashboard