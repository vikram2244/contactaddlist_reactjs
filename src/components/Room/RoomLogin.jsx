import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from '../Inputs/Input'
import Button from '../Buttons/Button'



const RoomLogin = () => {
  const [RoomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const submitCode = (e) => {
    e.preventDefault();
    navigate(`/room/${RoomCode}`);
  };

  return (
    <div className="mt-16">
            <h1 className="font-black text-center text-5xl font-serif">
              Video Call
            </h1>
            <div className="mt-28">

          <form
            onSubmit={submitCode}
            className="text-center"
          >
    
              <label className="text-black text-3xl font-serif">
                Enter Random code to join
              </label>
              <div className="w-2/6 text-center ml-96 align-middle pl-64 ">
              <Input type="text" name="email"  placeholder="Enter Random Code"
                value={RoomCode}
                onChange={(e) => setRoomCode(e.target.value)}/>
                </div>
                <div className='mt-10'>
           <Button>Submit</Button></div>
          </form>
          </div>
        </div>
  );
};

export default RoomLogin;