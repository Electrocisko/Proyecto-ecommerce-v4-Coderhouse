let array = document.getElementsByClassName("precios");
let totalPrice = document.createElement("p");
let sendMail = document.getElementById("sendMail");
let total = document.getElementById("total-price");
let orderToSend = document.getElementById("order");
let cartId = document.getElementById("cartId").textContent;
let userMail = document.getElementById("email").textContent;
let addressBuyer = document.getElementById("address-buyer").textContent;

let sum = 0;
let orderNro;

for (let index = 0; index < array.length; index++) {
  const element = array[index];
  sum = parseFloat(element.textContent) + sum;
}

let currency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "ARS",
}).format(sum);

totalPrice.innerHTML = `<h3> Precio Total : ${currency} Pesos `;

total.append(totalPrice);

let emptyCart = (id) => {
  let url = `/api/carts/${id}`;
  Swal.fire({
    title: "Esta seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ok, vaciar carrito",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Borrado!", "Tu carrito se ha vaciado.");
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      }).then(window.history.back());
    }
  });
};

sendMail.addEventListener("click", () => {
  let url = "/api/carts/" + cartId + "/products";

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const items = result[0].products.map((item) => {
        return {
          name: item.product.name,
          quantity: item.quantity,
        };
      });

      let data = {
        items: items,
        buyerEmail: userMail,
        buyerAddress: addressBuyer,
      };
      let = url = "api/orders";
      handleSubmit(url, data);
    });
});

const handleSubmit = (url, order) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      orderNro = data.orderNro;

      const sweet = () => {
        Swal.fire({
          title: "Su orden fue enviado",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");

            window.location.href = "/";
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      };
      sweet();
      url = "/api/carts/" + cartId;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      });

      let items = data.items;
      let text = `<h3>Orden Nro: ${orderNro} </h3>`;
      for (let i = 0; i < items.length; i++) {
        text = text + `<p> ${items[i].name} x ${items[i].quantity} un </p>`;
      }
      text =
        text +
        `<h4>Dirección de entrega: ${addressBuyer}</h4>
        <h4>Email: ${userMail}</h4>`;

      let orderMail = { message: text, cartId, userMail };

      fetch("/api/messages/mail/order", {
        method: "POST",
        body: JSON.stringify(orderMail),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });
};

let addProduct = (prodID, cartId) => {
  let url = `/api/carts/${cartId}/products`;
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
    .then(() => {
      location.reload();
    });
};

let subtractProduct = (prodID, cartId) => {
  let url = `/api/carts/${cartId}/subtract`;
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
    .then(() => {
      location.reload();
    });
};
