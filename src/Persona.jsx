import React, { useState } from "react";
import axios from "axios";
import url from "./Setting";

const Persona = () => {
  const [optionsTypeDocument, setOptionsTypeDocument] = useState([
    { value: 1, text: "DNI" },
    { value: 2, text: "Carnet de Extanjeria" },
    { value: 3, text: "Pasaporte" },
  ]);
  const [ubigeos, setUbigeos] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChangeSelect = (v) => {
    console.log("value", v);
  };

  React.useEffect(() => {
    console.log("useEffect Person");
    const searchUbigeo = async () => {
      await axios
        .get(url + "?isZipcodeList=true&isList=true")
        .then((resp) => {
          let temp = [];
          resp.data.map((u) => {
            let part = {};
            part.value = u[0];
            part.text = u[1];
            temp.push(part);
          });
          setUbigeos(temp);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    searchUbigeo();
  }, []);

  return (
    <div>
      <div className="row mt-3 card1">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">Usuario</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fas fa-id-card"></i>
                        </span>
                      </div>
                      <select
                        className="custom-select form-control"
                        onChange={handleChangeSelect}
                        disabled
                      >
                        {optionsTypeDocument.map((i) => (
                          <option key={i.value} value={i.value}>
                            {i.text}
                          </option>
                        ))}
                      </select>
                    </div>
                    <small id="tipDocUserHelp" className="form-text text-muted">
                      Tipo de documento de identidad del usuario.
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fas fa-id-card"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="N??mero de documento"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </div>
                    <small id="numDocUserHelp" className="form-text text-muted">
                      N??mero de documento de identidad del usuario.
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fas fa-user"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombres"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </div>
                    <small id="nameUserHelp" className="form-text text-muted">
                      Nombres completos del usuario.
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fas fa-user"></i>
                        </span>
                      </div>
                      <input
                        id="lastUser"
                        type="text"
                        className="form-control"
                        placeholder="Apellidos"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </div>
                    <small id="lastUserHelp" className="form-text text-muted">
                      Apellidos completos del usuario.
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fas fa-at"></i>
                        </span>
                      </div>
                      <input
                        id="emailUser"
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </div>
                    <small id="emailUserHelp" className="form-text text-muted">
                      Email del usuario.
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fas fa-phone"></i>
                        </span>
                      </div>
                      <input
                        id="phoneUser"
                        type="text"
                        className="form-control"
                        placeholder="Celular"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </div>
                    <small id="phoneUserHelp" className="form-text text-muted">
                      N??mero de celular del usuario.
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={() => setChecked(!checked)}
                      />
                      <label className="form-check-label">
                        ??Desea factura?
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <small id="card1Help" className="form-text text-muted">
            Nota: Los datos ingresados en la secci??n usuarios, ser??n
            introducidos en la generaci??n y env??o de la boleta.
          </small>
        </div>
      </div>
      {checked && (
        <div className="row mt-3 card1">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Facturaci??n</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-id-card"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="N??mero de RUC"
                          aria-label="N??mero de RUC"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                      <small className="form-text text-muted">
                        N??mero de RUC.
                      </small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-store"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Raz??n social"
                          aria-label="Raz??n social"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                      <small className="form-text text-muted">
                        Nombre de la raz??n social.
                      </small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-map-signs"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Direcci??n"
                          aria-label="Direcci??n"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                      <small id="addFacHelp" className="form-text text-muted">
                        Direcci??n fiscal del RUC.
                      </small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-map-marked-alt"></i>
                          </span>
                        </div>
                        <select
                          className="selectpicker form-control"
                          data-show-subtext="true"
                          data-live-search="true"
                        >
                          {ubigeos.map((u) => (
                            <option key={u.value} value={u.value}>
                              {u.text}
                            </option>
                          ))}
                        </select>
                      </div>
                      <small className="form-text text-muted">
                        Distrito de la direcci??n fiscal del RUC.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Persona;
