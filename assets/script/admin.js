var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    partName = document.getElementById("name"),
    supplier = document.getElementById("supplier"),
    quantity = document.getElementById("quantity"),
    buy_price = document.getElementById("buyPrice"),
    sell_price = document.getElementById("sellPrice"),
    submitBtn = document.querySelector(".submit"),
    partInfo = document.getElementById("data"),
    modal = document.getElementById("partForm"),
    modalTitle = document.querySelector("#partForm .modal-title"),
    newPartBtn = document.querySelector(".newPart")

let isEdit = false, editId
showInfo()

newPartBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Cadastro da peça:"
    isEdit = false
    imgInput.src = "./assets/img/admin/holder.png"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}