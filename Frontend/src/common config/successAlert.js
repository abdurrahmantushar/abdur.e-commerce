import Swal from 'sweetalert2'
const SuccessAlert=(title) =>{
  const allert = Swal.fire({
  title: title,
  icon: "success",
  confirmButtonColor : '#00b050'
});
return allert
}

export default SuccessAlert
