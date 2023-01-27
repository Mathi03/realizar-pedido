import React from "react";
import axios from "axios";
import url from "./Setting";
import notify from "./components/Notify";
import { Button, Input, Modal, Table } from "antd";
const { Column } = Table;

const SearchModal = ({ open, setSku, onOk, onCancel }) => {
  const [arrayProducts, setArrayProducts] = React.useState([]);

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
      <Table dataSource={arrayProducts} rowKey={[0]}>
        <Column title="Sku" dataIndex={[0]} key="sku" />
        <Column
          title="Articulo"
          dataIndex={[1]}
          key="article"
          responsive={["sm"]}
        />
        <Column title="Nombre" dataIndex={[2]} key="name" responsive={["sm"]} />
        <Column
          title="Imagen"
          dataIndex={[4]}
          key="image"
          responsive={["sm"]}
          render={(_, record) => <img src={record[4]} width="50" />}
        />
        <Column
          title="Imagen"
          key="image"
          render={(_, record) => (
            <a
              className="btn btn-primary"
              href="#"
              onClick={() => handleClickSelect(record[0])}
              key={record[0]}
            >
              <i className="fas fa-plus-square"></i>
            </a>
          )}
        />
      </Table>
    </Modal>
  );
};
export default SearchModal;
