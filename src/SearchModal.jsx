import React from "react";
import axios from "axios";
import url from "./Setting";
import notify from "./components/Notify";

const Modal = ({ open, setSku }) => {
  const [arrayProducts, setArrayProducts] = React.useState([]);

  const handleKeyPressModelOrSku = async (e) => {
    let {
      key,
      target: { value },
    } = e;
    if (key === "Enter") {
      console.log("destructuring", key, value);
      let response = await searchModel(value);
      console.log("resultado", response);
      setArrayProducts(response);
    }
  };

  const handleClickSelect = (k) => {
    console.log("click", k);
    setSku(k);
    open(false);
  };

  const searchModel = async (model) => {
    let response = await axios
      .get(url + "?model=" + model + "&isList=true")
      .then((resp) => {
        console.log("resp", resp);
        return resp.data;
      })
      .catch((err) => {
        console.log("err", err);
        notify(
          "error",
          "Error al obtener lista.",
          "Error: " + err.response.statusText
        );
        return [];
      });
    // if (response.status === false) return response.statusText;
    // return response.data;
    return response;
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Buscar Producto</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => open(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por SKU | Modelo"
                onKeyPress={handleKeyPressModelOrSku}
              />
            </div>
            <div className="border border-secondary mt-2">
              <div className="table-responsive" style={{ height: "496px" }}>
                <table className="table table-hover table-bordered">
                  <thead style={{ position: "sticky" }}>
                    <tr>
                      <th scope="col">Sku</th>
                      <th scope="col">Articulo</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Imagen</th>
                      <th scope="col">Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrayProducts.map((p) => (
                      <tr key={p[0]}>
                        <td>{p[0]}</td>
                        <td>{p[1]}</td>
                        <td>{p[2]}</td>
                        <td>
                          <img src={p[4]} width="50" />
                        </td>
                        <td>
                          <a
                            className="btn btn-primary"
                            href="#"
                            onClick={() => handleClickSelect(p[0])}
                            key={p[0]}
                          >
                            <i className="fas fa-plus-square"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => open(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
