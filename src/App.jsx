import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import Total from "./Total";
import Persona from "./Persona";
import { addPartners, cleanValues } from "./store/PersonaSlice";
import { cleanOrder } from "./store/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import url from "./Setting";
import notify from "./components/Notify";

const App = () => {
  const [pila, setPila] = useState(1);

  const dispatch = useDispatch();

  const order = useSelector((state) => state.counter.order);
  const partner = useSelector((state) => state.persona.select);
  const date = useSelector((state) => state.persona.date);

  useEffect(() => {
    console.log(url);
    const searchPartners = async () => {
      await axios
        .get(url + "?personaId=" + PERSON_ID + "&isDirector=true")
        .then((resp) => {
          // let temp = [{ value: "", label: "Selecciona un Socio" }];
          let temp = [];
          resp.data.map((s) => {
            let part = {};
            part.value = s[0];
            part.label = s[1];
            temp.push(part);
          });
          dispatch(addPartners(temp));
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    searchPartners();
  }, []);

  const generateOrder = async () => {
    console.log("generando orden", order, partner, date);
    if (order.length !== 0 && partner && date) {
      let tempXML = "<Root>";
      order.map((o, i) => {
        i++;
        tempXML += '<row id="' + i + '">';
        tempXML += "<sku>" + o.sku + "</sku>";
        tempXML += "<nam>" + o.name + "</nam>";
        tempXML += "<qty>" + o.quantity + "</qty>";
        tempXML += "<mst>" + o.priceList + "</mst>";
        tempXML += "<mts>" + o.priceOfferPartner + "</mts>";
        tempXML += "<mtd>" + o.priceOfferDirector + "</mtd>";
        tempXML += "<est>" + o.state + "</est>";
        tempXML += "</row>";
      });
      tempXML += "</Root>";
      console.log("tempXML", tempXML);
      let jsonTotal = {
        fechaCierre: date,
        xmlDetalle: tempXML,
        personaIns: PERSON_ID,
        socioId: partner,
      };
      await axios
        .post(url, jsonTotal, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {
          console.log("POST", resp);
          notify("success", "La order fue grabado con exito.");
          dispatch(cleanValues());
          dispatch(cleanOrder());
        })
        .catch((err) => {
          console.log("err", err);
          notify("error", "Error con la peticion de grabado");
        });
    } else {
      console.log("VACIO");
      notify(
        "error",
        "Oops...",
        "Debe agregar al menos una order y seleccionar un socio"
      );
    }
  };

  return (
    <div className="container my-4">
      {pila == 1 && <Cart />}
      {pila == 2 && <Persona />}
      <Total />
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-4">
            <a href="#" className="btn btn-success" onClick={generateOrder}>
              Generar Orden
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
