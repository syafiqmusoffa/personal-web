function deleteConfirm(event) {
    event.preventDefault()
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Benarkah mau dihapus? :(",
        text: "Blog akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya, hapus saja!",
        cancelButtonText: "Tidak, jangan!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            document.getElementById("deleteBlog").submit()
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Dibatalkan",
                text: "Blog tidak jadi tersingkir :D",
                icon: "error"
            });
        }
    });
}