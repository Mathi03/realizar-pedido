import React from "react";
import axios from "axios";
import url from "./Setting";
import notify from "./components/Notify";
import { Button, Input, Modal, Table } from "antd";

const SearchModal = ({ open, setSku, onOk, onCancel }) => {
  const [arrayProducts, setArrayProducts] = React.useState([]);
  const formatColumns = [
    {
      title: "Sku",
      dataIndex: "sku",
      key: "sku",
      responsive: ["sm"],
    },
    {
      title: "Articulo",
      dataIndex: "article",
      key: "article",
      responsive: ["sm"],
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
    },
    {
      title: "Imagen",
      dataIndex: "image",
      key: "image",
      responsive: ["sm"],
      render: (_, record) => <img src={record.image} width="50" />,
    },
    {
      title: "Seleccionar",
      key: "action",
      responsive: ["sm"],
      render: (_, record) => (
        <a
          className="btn btn-primary"
          href="#"
          onClick={() => handleClickSelect(record.sku)}
          key={record.sku}
        >
          <i className="fas fa-plus-square"></i>
        </a>
      ),
    },
  ];

  const handleKeyPressModelOrSku = async (e) => {
    let {
      key,
      target: { value },
    } = e;
    console.log("destructuring", key, value);
    let response = await searchModel(value);
    console.log("resultado", response);
    setArrayProducts(response);
  };

  const handleClickSelect = (k) => {
    console.log("click", k);
    setSku(k);
    onOk();
  };

  const searchModel = async (model) => {
    let response = await axios
      .get(url + "?model=" + model + "&isList=true")
      .then((resp) => {
        console.log("resp", resp);
        let data = resp.data;
        let temp = [];
        data.map((item) => {
          temp.push({
            key: item[0],
            sku: item[0],
            article: item[1],
            name: item[2],
            image: item[4],
          });
        });
        return temp;
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
    <Modal
      title="Selecciona un producto"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={1000}
      footer={[
        <Button key="back" onClick={onCancel}>
          Salir
        </Button>,
      ]}
    >
      <Input
        placeholder="Buscar por SKU | Modelo"
        onPressEnter={handleKeyPressModelOrSku}
      />
      <Table columns={formatColumns} dataSource={arrayProducts} />
    </Modal>
  );
};
export default SearchModal;
