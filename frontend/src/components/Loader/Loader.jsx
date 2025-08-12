import React from "react";
import { ClipLoader } from "react-spinners";

const Loader=()=>{
    return (<>

    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-40">
  <ClipLoader color="#3B82F6" size={100} />
  <h1 className="font-black mt-4">Loading</h1>
</div>

    
    </>
    );
};
export default Loader;