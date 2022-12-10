

let deletedProduct = document.getElementById('deleted');
let id = document.getElementById("productId");


deletedProduct.addEventListener('click', (e) => {
    console.log(id.value)
   deleteProductById(id.value);
   id.value = "";
})

const deleteProductById = (item) => {
    let url = `/api/products/${item}`
    fetch(url,{
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => showResult(data.status))
};

const showResult = (result) => {
    alert(result)
}