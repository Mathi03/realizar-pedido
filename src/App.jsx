import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import Total from "./Total";
import Persona from "./Persona";
import { addPartners } from "./store/PersonaSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import url from "./Setting";

const App = () => {
  const [pila, setPila] = useState(1);

  const dispatch = useDispatch();

  const order = useSelector((state) => state.counter.order);
  const partner = useSelector((state) => state.persona.select);

  useEffect(() => {
    const searchPartners = async () => {
      await axios
        .get(url + "?personaId=" + PERSON_ID + "&isDirector=true")
        .then((resp) => {
          let temp = [{ value: "", name: "Selecciona un Socio" }];
          resp.data.map((s) => {
            let part = {};
            part.value = s[0];
            part.name = s[1];
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

  const nextPage = () => {
    setPila(pila + 1);
    console.log("next page", pila);
  };

  const backPage = () => {
    setPila(pila - 1);
    console.log("back page", pila);
  };

  const generateOrder = async () => {
    console.log("generando orden", order, partner);
    if (order.length !== 0 && partner) {
      // let tempOrder = [
      //   {
      //     image:
      //       "https://sip.footloose.pe/web/_images/1x/585_106611_00010010_040_2_168_001.jpg",
      //     name: "FOOTLOOSE FCH-WL021 (35-40) TRIXI - M SINTETICO NEGRO-38.0",
      //     priceList: "74.90",
      //     priceOfferDirector: "20.88",
      //     priceOfferPartner: "20.88",
      //     quantity: "1",
      //     quantityInput: false,
      //     sku: "18805085884",
      //     stock: 20,
      //     state: 44,
      //   },
      //   {
      //     image:
      //       "https://sip.footloose.pe/web/_images/1x/585_106611_00010010_040_2_168_001.jpg",
      //     name: "FOOTLOOSE FCH-WL021 (35-40) TRIXI - M SINTETICO NEGRO-35.0",
      //     priceList: "69.90",
      //     priceOfferDirector: "27.88",
      //     priceOfferPartner: "27.88",
      //     quantity: "3",
      //     quantityInput: false,
      //     sku: "18805085883",
      //     stock: 25,
      //     state: 44,
      //   },
      // ];

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
        fechaCierre: "2022-12-12",
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
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      console.log("VACIO");
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
