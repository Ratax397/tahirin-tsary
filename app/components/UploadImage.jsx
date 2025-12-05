import { useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";


export default function UploadImage({setFile}) {

    const [selectedFile,setSelectedFile]=useState();

  return (
    <div className="h-[450px] bg-[#e9e9e9] rounded-lg">
      <label className="m-5 flex flex-col justify-center items-center cursor-pointer h-[90%] border-[2ox] border-gray-300 border-dashed rounded-lg text-gray-600">
        {
          !selectedFile ? <div className="flex items-center flex-col">
            <FiArrowUpCircle className="text-[22px]"/>
            <h2 className="font-semibold">Cliquer pour telecharger</h2>
          </div>
          : null
        }
        {
          selectedFile ? 
            <img src={window.URL.createObjectURL(selectedFile)}
              className="object-contain h-[90%]"
              width={500}
              height={800}
              alt="selected image"
            />
            :null
        }

        <input type="file" id="dropzone-file" className="hidden" onChange={(e)=>{setFile(e.target.files[0]);setSelectedFile(e.target.files[0])}}/>
      </label>
    </div>
  )
}
