import React from "react";
import Modal from "./SearchModal";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./store/OrderSlice";
import { selectPartner } from "./store/PersonaSlice";
import axios from "axios";
import url from "./Setting";

const Cart = () => {
  const order = useSelector((state) => state.counter.order);
  const partners = useSelector((state) => state.persona.partners);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = React.useState(false);
  const [sku, setSku] = React.useState("");
  const [data, setData] = React.useState({
    sku: "",
    name: "",
    stock: "",
    priceList: "",
    priceOfferDirector: "",
    priceOfferPartner: "",
    quantity: 0,
    quantityInput: true,
    image: "",
    state: "",
  });

  React.useEffect(() => {
    console.log("useEffect", sku);
    if (sku) {
      const searchSku = async (skuR) => {
        let response = await axios
          .get(url + "?sku=" + skuR + "&isPromoter=true")
          .then((resp) => {
            // console.log("resp", resp);
            let skuResp = resp.data;
            let dataRecibida = {
              ...data,
              sku: skuResp[5],
              name: skuResp[0],
              stock: skuResp[4],
              priceList: skuResp[1],
              priceOfferDirector: skuResp[3],
              priceOfferPartner: skuResp[2],
              image: skuResp[6],
              state: skuResp[9],
              quantityInput: false,
            };
            setData(dataRecibida);
            setSku("");
          })
          .catch((err) => {
            console.log("err", err);
          });
        return response;
      };

      searchSku(sku);
    }
  }, [sku]);

  const handleClickAdd = () => {
    console.log("clickAdd", data);
    if (data && data.quantity > 0) {
      // setOrder([...order, data]);
      dispatch(increment({ data }));

      // order.push(data);
      // console.log("Order", order);
      setData({
        sku: "",
        name: "",
        stock: "",
        priceList: "",
        priceOfferDirector: "",
        priceOfferPartner: "",
        quantity: 0,
        state: "",
        quantityInput: true,
      });
    }
  };

  const handleChangeQuantity = (e) => {
    setData({ ...data, quantity: e.target.value });
  };

  const handleClickRemove = (k) => {
    // let temp = order.filter((obj) => obj.sku !== k);
    // setOrder(temp);
    dispatch(decrement(k));
  };

  const handleSelectOnChange = (e) => {
    let partner = e.target.value;
    dispatch(selectPartner(partner));
  };

  return (
    <div>
      <div className="border rounded mb-4">
        <div className="card-body">
          <div className="col-sm-12 my-1">
            <div className="h5">Escoger un Socio</div>
          </div>
          <div className="col-sm-12 my-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <select className="custom-select" onChange={handleSelectOnChange}>
                {partners.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            <small className="form-text text-muted">Seleccionar Socio.</small>
          </div>
        </div>
      </div>
      <div className="border rounded mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12 my-1">
              <div className="h5">Buscar Productos</div>
            </div>
            <div className="col-sm-6 my-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-barcode"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sku"
                  disabled
                  value={data.sku}
                />
              </div>
              <small className="form-text text-muted">
                Código Sku del producto.
              </small>
            </div>

            <div className="col-sm-6 my-1">
              <a
                href="#"
                className="btn btn-primary btn-block"
                onClick={() => setOpenModal(true)}
              >
                <i className="fas fa-search"></i> Buscar Producto
              </a>
            </div>

            <div className="col-sm-12 my-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-box-open"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Producto"
                  value={data.name}
                  disabled
                />
              </div>
              <small className="form-text text-muted">
                Nombre del producto seleccionado.
              </small>
            </div>
            <div className="col-sm-3 my-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-calculator"></i>
                  </div>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Cantidad"
                  onChange={handleChangeQuantity}
                  value={data.quantity}
                  disabled={data.quantityInput}
                  min={1}
                />
              </div>
              <small className="form-text text-muted">
                Ingrese la cantidad que desea comprar.
              </small>
            </div>
            <div className="col-sm-3 my-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-warehouse"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Stock"
                  value={data.stock}
                  disabled
                />
              </div>
              <small className="form-text text-muted">
                Cantidad de stock del producto.
              </small>
            </div>
            <div className="col-sm-3 my-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">S/.</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio de Lista"
                  value={data.priceList}
                  disabled
                />
              </div>
              <small className="form-text text-muted">
                Precio de lista del producto.
              </small>
            </div>
            <div className="col-sm-3 my-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">S/.</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio Director"
                  value={data.priceOfferDirector}
                  disabled
                />
              </div>
              <small className="form-text text-muted">Precio Director.</small>
            </div>
            <div className="col-sm-3 my-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">S/.</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio Socio"
                  value={data.priceOfferPartner}
                  disabled
                />
              </div>
              <small className="form-text text-muted">Precio Socio.</small>
            </div>
            <div className="col-sm-12 my-1">
              <a
                href="#"
                className="btn btn-primary btn-block"
                onClick={() => handleClickAdd()}
              >
                <i className="fas fa-plus"></i> Agregar
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Productos</div>
        <div className="card-body">
          {order.map((p) => (
            <div className="row m-2" key={p.sku}>
              <div className="col-md-12 prodListCar">
                <div className="container p-2 border">
                  <div className="row">
                    <div className="col-lg-1 col-md-2 col-sm-3 col-12 text-center">
                      <img
                        src={p.image}
                        className="img-fluid"
                        alt="Responsive image"
                      />
                    </div>
                    <div className="col-lg-3 col-md-10 col-sm-5 col-12 text-center">
                      {p.name}
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-12 text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>Precio Unit.</div>
                        <div className="text-center">
                          <div className="row">
                            <div
                              className="col-12 text-right" // style={{ "text-decoration": "line-through" }}
                            >
                              {p.priceList}
                            </div>
                            <div className="col-12 text-right">54.87</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-12 text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>Cantidad</div>
                        <div className="text-center">
                          <div className="row">
                            <div className="col-12 text-right">
                              {p.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-12 text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>Precio Total</div>
                        <div className="text-center">
                          <div className="row">
                            <div className="col-12 text-right">
                              {p.priceOffer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-12 text-center">
                      <div className="input-group mb-3">
                        <a
                          href="#"
                          className="btn btn-danger btn-block delProdCar"
                          title="Eliminar"
                          onClick={() => handleClickRemove(p.sku)}
                        >
                          <i className="fas fa-trash-alt"></i> Eliminar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openModal && <Modal open={setOpenModal} setSku={setSku} />}
    </div>
  );
};

export default Cart;
