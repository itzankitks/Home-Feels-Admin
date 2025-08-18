import "./new-room.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Select from "react-select";
import axios from "axios";

const NewRoom = ({ inputs, title }) => {
  const [roomInfo, setRoomInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setRoomInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms
      .split(",")
      .map((room) => ({ number: room.trim() }));

    try {
      await axios.post(`/rooms/${hotelId}`, {
        ...roomInfo,
        roomNumbers,
      });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  placeholder="give comma between room numbers"
                  onChange={(e) => setRooms(e.target.value)}
                ></textarea>
              </div>
              <div className="formInput">
                <label>Choose a Hotel</label>
                <Select
                  name="hotels"
                  options={data.map((hotel) => ({
                    value: hotel._id,
                    label: hotel.name,
                    id: "hotelId",
                    key: hotel._id,
                  }))}
                  className="basic-select"
                  classNamePrefix="select"
                  onChange={(selectedOption) => {
                    setHotelId(selectedOption.value);
                  }}
                  isLoading={loading}
                  placeholder="Select Hotel"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPlacement="auto"
                  noOptionsMessage={() => "No hotels available"}
                />
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
