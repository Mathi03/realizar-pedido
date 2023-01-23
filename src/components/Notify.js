import Swal from "sweetalert2";

const notify = (type, title, message) => {
  Swal.fire({
    icon: type,
    title: title,
    text: message,
  });
};
export default notify;
