let url = URL;
var URLActual = window.location.hostname;
if (URLActual === "localhost" || URLActual === "127.0.0.1") {
  url = "http://localhost:3000/api.php";
}

export default url;
