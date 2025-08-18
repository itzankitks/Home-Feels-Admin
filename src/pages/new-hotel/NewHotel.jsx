import "./new-hotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Select from "react-select";
import { useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const NewHotel = ({ inputs, title }) => {
  const [files, setFiles] = useState(null);
  const [hotelInfo, setHotelInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setHotelInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/ankitks/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newHotel = { ...hotelInfo, photos: list, rooms };
      await axios.post("/hotels", newHotel);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  console.log("Selected Files:", files);

  const handleSelect = (selectedOptions) => {
    const selectedRoomIds = selectedOptions.map((option) => option.value);
    setRooms(selectedRoomIds);
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
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <Select
                  isMulti
                  name="rooms"
                  options={data.map((room) => ({
                    value: room._id,
                    label: room.title,
                  }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleSelect}
                  isLoading={loading}
                  placeholder="Select Room(s)"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPlacement="auto"
                  noOptionsMessage={() => "No rooms available"}
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

export default NewHotel;

{
  /* <option value="">Select Room</option>
 {loading ? (
  <option>Loading...</option>
) : (
  data.map((room) => (
    <option key={room._id} value={room._id}>
      {room.title}
    </option>
  ))
)} */
}
