let eventList = document.querySelectorAll(".addCart");
let cartId = document.getElementById("cartId").textContent;
let eventDetail = document.querySelectorAll(".seeDetail");

let inStock;
let url = `/api/carts/${cartId}/products`;

eventList.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    let prodID = element.value;

    ///////////////////////
    fetch(`/api/products/${prodID}`)
      .then((response) => response.json())
      .then((json) => {
        inStock = json.stock;
        if (inStock <= 0) {
          Swal.fire('Sin stock')
        } else {
          console.log("con stock");
          fetch(url, {
            method: "PUT",
            body: JSON.stringify({
              product: prodID,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Agregado al carrito",
                showConfirmButton: false,
                timer: 1000,
              });
            })
            .then(() => {
              fetch(`/api/products/${prodID}`, {
                method: "PUT",
                body: JSON.stringify({
                  stock: (inStock-1),
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => response.json())
                .then(() => {
                  location.reload();
                });

                // fetch(url, {
                //   method: "PUT",
                //   body: formData,
                // });


            })
        }
      });


  });
});

eventDetail.forEach((product) => {
  product.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign(`/productdetail?productId=${product.value}`);
  });
});
