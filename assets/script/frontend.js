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
    newPartBtn = document.querySelector(".newPart");

newPartBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit',
        modalTitle.innerText = "Cadastro da peça:"
    isEdit = false
    imgInput.src = "./assets/img/admin/holder.png"
    form.reset()
})

function renderTableData(parts) {
    const tableBody = document.getElementById('data');
    tableBody.innerHTML = ''; // Limpa o conteúdo atual da tabela

    parts.forEach((part, index) => {
        const row = tableBody.insertRow(); // Cria uma nova linha na tabela

        // Insere as células (colunas) na linha
        row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${part.image}" alt="Imagem da Peça" width="50"></td>
                <td>${part.name}</td>
                <td>${part.supplier}</td>
                <td>${part.stock}</td>
                <td>${part.purchase_price}</td>
                <td>${part.sale_value}</td>
            `;
    });
}

setInterval(renderTableData, 30000);
file.onchange = function () {
    if (file.files[0].size < 1000000) {  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else {
        alert("This file is too large!")
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/parts', {
                method: 'GET',
                mode: 'cors', // Garante que a requisição seja feita usando CORS
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }

            const parts = await response.json(); // Converte a resposta para JSON
            console.log('Dados recebidos:', parts);

            // Exibe os dados na tabela HTML
            renderTableData(parts);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    fetchData(); // Chama a função para buscar os dados ao carregar a página
});



