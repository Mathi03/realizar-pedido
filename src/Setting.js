let url = "../catalogo_api_blank/catalogo_api_blank.php";
var URLActual = window.location.hostname;
if (URLActual === "localhost" || URLActual === "127.0.0.1") {
  url = "http://localhost:3000/api.php";
}

export default url;
