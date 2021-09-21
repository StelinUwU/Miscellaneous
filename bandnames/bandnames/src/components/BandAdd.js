import { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const BandAdd = () => {
  const [value, setValue] = useState("");
  const { socket } = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length > 0) {
      socket.emit("create-band", { name: value });
      setValue("");
    }
  };
  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="New band"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </form>
    </>
  );
};

export default BandAdd;
