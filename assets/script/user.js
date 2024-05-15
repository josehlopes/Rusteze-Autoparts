let cartItems = [];

async function fetchDataAndRender() {
  try {
    const response = await fetch("http://localhost:3000/parts");
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        renderProducts(data);
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

fetchDataAndRender();

async function renderProducts(products) {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("card", "mb-4");

    productElement.innerHTML = `
    <div class="h-100 d-inline-block" style="width: 100%;">
    <div class="d-flex flex-row row">
    <div class="d-block col-md-4 d-flex justify-content-center align-items-center">
        <img src="${product.imgSrc}" class="img-fluid object-s fit-contain" alt="${product.name}">
    </div>
    <div class="d-flex col-md-8">
        <div class="d-flex flex-column card-body align-self-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Fornecedor: ${product.supplier}</p>
            <p class="card-text">Estoque: ${product.stock}</p>
            <p class="card-text">Preço: $${product.sale_value}</p>
            <div class="input-group mb-3">
                <input type="number" class="form-control" placeholder="Quantidade" id="inputQuantity${product.id}">
                <button class="btn btn-primary addToCartButton" type="button" data-product-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        </div>
    </div>
</div>
`;

    productContainer.appendChild(productElement);

    const addToCartButton = productElement.querySelector(".addToCartButton");
    addToCartButton.addEventListener("click", () => {
      const inputQuantity = productElement.querySelector(
        `#inputQuantity${product.id}`
      );

      const quantity = parseInt(inputQuantity.value);
      if (isNaN(quantity) || quantity <= 0) {
        console.log("Quantidade inválida.");
        return;
      }

      const item = {
        id: product.id,
        name: product.name,
        price: product.sale_value,
        stock: product.stock,
        quantity: quantity,
      };

      cartItems.push(item);

      updateCartSummary();

      Swal.fire({
        title: "Tudo Certo!",
        text: quantity + " " + product.name + " adicionado ao carrinho!",
        icon: "success"
      });
    });
  });
}

function updateCartSummary() {
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  let subtotal = 0;

  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  subtotalElement.textContent = `$${subtotal}`;
  totalElement.textContent = `$${subtotal}`;
}

function updateStock(id) {
  const product = cartItems.find((item) => item.id === id);
  if (product) {
    product.quantity = item.quantity;
    product.stock -= product.quantity;
  }
  fetchDataAndRender();
}

async function fetchProductById(productId) {
  try {
    const response = await fetch(`http://localhost:3000/parts/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const productData = await response.json();
      return productData;
    } else {
      console.error(
        `Erro ao buscar produto com ID ${productId}: ${response.statusText}`
      );
      return null;
    }
  } catch (error) {
    console.error(
      `Erro ao buscar produto com ID ${productId}: ${error.message}`
    );
    return null;
  }
}

async function finishOrder() {
  try {
    const updateRequests = cartItems.map(async (item) => {
      const product = await fetchProductById(item.id);
      if (product) {
        const newStock = product.stock - item.quantity;
        if (newStock >= 0) {
          const payload = {
            id: product.id,
            data: { stock: newStock },
          };
          const response = await fetch(
            `http://localhost:3000/parts/${product.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );

          if (!response.ok) {
            console.error(
              `Erro ao atualizar estoque para o produto ${product.id}`
            );
            throw new Error(
              `Erro ao atualizar estoque para o produto ${product.id}`
            );
          }
        } else {
          console.error(`Estoque insuficiente para o produto ${product.id}`);
          throw new Error(`Estoque insuficiente para o produto ${product.id}`);
        }
      }
    });

    await Promise.all(updateRequests);

    await postSale();

    // Após o término do pedido com sucesso, exibir o SweetAlert
    Swal.fire({
      title: "Compra Finalizada!",
      text: "Seu pedido foi processado com sucesso.",
      icon: "success",
      confirmButtonText: "Ok",
    });

    console.log("Pedido finalizado com sucesso!");
    cartItems = [];
    updateCartSummary();
    fetchDataAndRender();
  } catch (error) {
    console.error("Erro ao processar pedidos:", error);

    // Exibir SweetAlert em caso de erro
    Swal.fire({
      title: "Erro ao Processar Pedido",
      text: "Ocorreu um erro ao processar o seu pedido. Por favor, tente novamente.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

async function postSale() {
  try {
    let totalSaleValue = 0;
    for (let item of cartItems) {
      totalSaleValue += item.price * item.quantity;
    }

    const salePayload = {
      data: {
        total: totalSaleValue,
      },
    };
    const saleResponse = await fetch(`http://localhost:3000/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salePayload),
    });
    const saleData = await saleResponse.json();

    const saleId = saleData.sale.id;

    const saleItemRequests = cartItems.map(async (item) => {
      const product = await fetchProductById(item.id);
      if (product) {
        const saleItemPayload = {
          data: {
            part_id: product.id,
            sale_id: saleId,
          },
        };
        const response = await fetch(`http://localhost:3000/saleItem`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saleItemPayload),
        });
      }
    });

    await Promise.all(saleItemRequests);
    console.log("Pedido finalizado com sucesso!");
  } catch (error) {
    console.error("Erro ao processar pedidos:", error);
  }
}
