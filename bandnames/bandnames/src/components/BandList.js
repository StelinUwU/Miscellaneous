import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
    return () => socket.off("current-bands");
  }, [socket]);

  const changeName = ({ target }, id) => {
    const newName = target.value;
    console.log(newName);
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onLostFocus = (id, name) => socket.emit("rename-band", { id, name });

  const voteBand = (id) => {
    socket.emit("vote-band", id);
  };
  const removeBand = (id) => {
    socket.emit("remove-band", id);
  };

  const createRows = () => {
    return bands.map(({ id, name, votes }) => (
      <tr key={id}>
        <td>
          <button className="btn btn-primary" onClick={() => voteBand(id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => changeName(e, id)}
            onBlur={() => onLostFocus(id, name)}
          />
        </td>
        <td>
          <h3>{votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => removeBand(id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};

export default BandList;
