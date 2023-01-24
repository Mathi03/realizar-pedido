let url = "";
var URLActual = window.location.hostname;
if (URLActual === "localhost" || URLActual === "127.0.0.1") {
  url = "http://localhost:3000/api.php";
}
if (
  URLActual === "catalogo.footloose.pe" ||
  URLActual === "192.168.3.70" ||
  URLActual === "sip.footloose.pe" ||
  URLActual === "scriptcase.footloose.pe"
) {
  url = "../catalogo_api_blank/catalogo_api_blank.php";
}

export default url;
