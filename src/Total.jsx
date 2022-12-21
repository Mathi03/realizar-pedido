import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Total = () => {
  const order = useSelector((state) => state.counter.order);
  const subTotal = order.reduce(
    (acumulador, actual) =>
      acumulador + parseFloat(actual.priceList) * parseFloat(actual.quantity),
    0
  ).toFixed(2);
  const totalDirector = order.reduce(
    (acumulador, actual) =>
      acumulador +
      parseFloat(actual.priceOfferDirector) * parseFloat(actual.quantity),
    0
  ).toFixed(2);
  const totalPartner = order.reduce(
    (acumulador, actual) =>
      acumulador +
      parseFloat(actual.priceOfferPartner) * parseFloat(actual.quantity),
    0
  ).toFixed(2);

  useEffect(() => {
    console.log("total");
  }, [order]);

  return (
    <div className="card mb-4">
      <div className="card-header">Totales</div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-3 col-6">
            <div className="form-group mb-3">
              <small className="form-text text-muted">Sub-total</small>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">S/.</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sub-total"
                  aria-label="Sub-total"
                  value={subTotal}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="form-group mb-3">
              <small className="form-text text-muted">Descuento</small>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">S/.</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descuento"
                  aria-label="Descuento"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="form-group mb-3">
              <small className="form-text text-muted">Total Director</small>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">S/.</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Costo de envío"
                  aria-label="Costo de envío"
                  value={totalDirector}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="form-group mb-3">
              <small className="form-text text-muted">Total Socio</small>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">S/.</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Total"
                  aria-label="Total"
                  aria-describedby="basic-addon1"
                  value={totalPartner}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Total;
