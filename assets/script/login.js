const username = document.getElementById("form3Example3");
const password = document.getElementById("form3Example4");
const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", () => {
  if (username.value === "admin" && password.value === "admin") {
    Swal.fire({
      title: "Seja bem vindo!",
      text: "Login realizado com sucesso!",
      icon: "success"
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "assets/page/admin.html";
      }
    });
  } else if (username.value === "user" && password.value === "user") {
    Swal.fire({
      title: "Login",
      text: "Login realizado com sucesso!",
      icon: "success"
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "assets/page/user.html";
      }
    });
  } else {
    Swal.fire({
      title: "Erro!",
      text: "Nome de usuário ou senha inválidos.",
      icon: "error"
    });
  }
});
