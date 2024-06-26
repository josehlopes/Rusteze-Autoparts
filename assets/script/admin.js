const form = document.getElementById("myForm");
const imgInput = document.querySelector(".img");
const file = document.getElementById("imgInput");
const partName = document.getElementById("name");
const supplier = document.getElementById("supplier");
const quantity = document.getElementById("quantity");
const buy_price = document.getElementById("buyPrice");
const sell_price = document.getElementById("sellPrice");
const submitBtn = document.querySelector(".submit");
const partInfo = document.getElementById("data");
const indexUpdate = document.getElementById("indexUpdate");
const modal = document.getElementById("partForm");
const modalTitle = document.querySelector("#partForm .modal-title");
const newPartBtn = document.querySelector(".newPart");

$('#calendarModal').on('shown.bs.modal', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'pt-br',
      navLinks: true,
      selectMirror: true,
      editable: true,
      events: function(info, successCallback, failureCallback) {
          fetch('http://localhost:3000/sales')
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Erro ao buscar vendas');
                  }
                  return response.json();
              })
              .then(data => {
                  var events = data.map(sale => {
                      return {
                          title: `Venda: ${sale.id}`,
                          start: sale.createdAt,
                          allDay: true 
                      };
                  });

                  successCallback(events);
              })
              .catch(error => {
                  console.error('Erro ao buscar vendas:', error);
                  failureCallback(error);
              });
      }
  });

  calendar.render();
});



let isEdit = false;

newPartBtn.addEventListener("click", () => {
  submitBtn.innerText = "Cadastrar";
  submitBtn.setAttribute("onclick", "addInfo()");
  modalTitle.innerText = "Cadastro da peça:";
  isEdit = false;
  imgInput.src = "./assets/img/admin/holder.png";
  form.reset();

  const idField = document.getElementById("indexUpdate");
  if (idField) {
    idField.removeAttribute("required");
  }
});
function renderTableData(parts) {
  const tableBody = document.getElementById("data");
  tableBody.innerHTML = "";

  parts.forEach((part, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
            <tr class="partDetails">
                <td>${index + 1}</td>
                <td><img src="${part.imgSrc}"img-fluid" width="100" alt="${part.name}"></td>
                <td>${part.name}</td>
                <td>${part.supplier}</td>
                <td>${part.stock}</td>
                <td>${part.purchase_price}</td>
                <td>${part.sale_value}</td>
                <td>
                    <button class="btn btn-primary" onclick="editInfo(${
                      part.id
                    }, '${part.name}', '${part.supplier}', '${part.stock}', '${
      part.purchase_price
    }', '${
      part.sale_value
    }')" data-bs-toggle="modal" data-bs-target="#partForm"><i class="bi bi-pencil-square"></i></button>
                    
                    <button class="btn btn-danger" onclick="deleteInfo(${
                      part.id
                    })"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
  });
}

async function addInfo() {
  const partNameValue = partName.value;
  const supplierValue = supplier.value;
  const quantityValue = quantity.value;
  const buy_priceValue = buy_price.value;
  const imageValue = file.value;
  const sell_priceValue = sell_price.value;

  const payload = {
    data: {
      name: partNameValue,
      supplier: supplierValue,
      stock: quantityValue,
      purchase_price: buy_priceValue,
      sale_value: sell_priceValue,
      imgSrc: imageValue,
    },
  };

  const response = await fetch(`http://localhost:3000/parts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  fetchDataAndRender();

  Swal.fire({
    title: "Tudo Certo!",
    text: "O item foi cadastrado com sucesso!",
    icon: "success"
  });
}

function editInfo(
  index,
  nameValue,
  supplierValue,
  stockValue,
  purchase_priceValue,
  sell_priceValue
) {
  isEdit = true;
  indexUpdate.value = index;
  partName.value = nameValue;
  supplier.value = supplierValue;
  quantity.value = stockValue;
  buy_price.value = purchase_priceValue;
  sell_price.value = sell_priceValue;

  submitBtn.innerText = "Salvar";
  modalTitle.innerText = "Salvar formulário";
}

async function submitUpdate() {
  const partNameValue = partName.value;
  const supplierValue = supplier.value;
  const quantityValue = quantity.value;
  const buy_priceValue = buy_price.value;
  const sell_priceValue = sell_price.value;
  const index = indexUpdate.value;

  const payload = {
    id: index,
    data: {
      name: partNameValue,
      supplier: supplierValue,
      stock: quantityValue,
      purchase_price: buy_priceValue,
      sale_value: sell_priceValue,
      imgSrc: '../img/item/motor.jpg'
    },
  };

  const response = await fetch(`http://localhost:3000/parts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

   if(response.status === 200){
    Swal.fire({
      title: "Tudo Certo!",
      text: "O item foi atualizado com sucesso!",
      icon: "success"
    });

    fetchDataAndRender();

   }
   else {
    Swal.fire({
      title: "Algo deu errado!",
      text: "Não conseguimos atualizar seu item!",
      icon: "error"
    });
   }
  console.log(response);
}

async function deleteInfo(id) {
  const { value: confirmed } = await Swal.fire({
    title: "Você tem certeza?",
    text: "Esta ação não poderá ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar!",
  });



  if (confirmed) {
    const payload = {
        id: id
    }
    try {
      const response = await fetch(`http://localhost:3000/parts`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        Swal.fire({
          title: "Deletado!",
          text: "Seu item foi deletado com sucesso.",
          icon: "success",
        });
        fetchDataAndRender();
      } else {
        throw new Error("Falha ao deletar o item.");
      }
    } catch (error) {
      Swal.fire({
        title: "Erro!",
        text: "Falha ao deletar o item. Por favor, tente novamente.",
        icon: "error",
      });
    }
  }
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const information = {
    image:
    imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
    name: part.value,
    supplier: supp.value,
    stock: stoc.value,
    purchase_price: buy.value,
    sell_price: sell.value,
  };

  if (!isEdit) {
    parts.push(information);
  } else {
    isEdit = false;
    parts[editId] = information;
  }
  submitBtn.innerText = "Enviar";
  modalTitle.innerHTML = "Preencha os dados!";

  showInfo();

  form.reset();

  imgInput.src = "./image/Profile Icon.webp";
});
async function fetchDataAndRender() {
  try {
    const response = await fetch("http://localhost:3000/parts");
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        renderTableData(data);
      } else {
        console.error("Resposta inválida:", data);
      }
    } else {
      console.error("Erro ao buscar dados:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

file.onchange = function () {
  if (file.files[0].size < 1000000) {
    // 1MB = 1000000
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      imgUrl = e.target.result;
      imgInput.src = imgUrl;
    };

    fileReader.readAsDataURL(file.files[0]);
  } else {
    alert("This file is too large!");
  }
};

fetchDataAndRender();
setInterval(fetchDataAndRender, 30000);
