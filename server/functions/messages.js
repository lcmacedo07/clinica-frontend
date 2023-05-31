import swal from 'sweetalert2';

function sweetAlert(code, header, msg) {

  let type;
  let title;
  let text;

  if (code == 200) {
    title = header || "Tudo certo!";
    text = msg || "";
    type = "success";
  }

  else if (code == 201) {
    title = header || "Registro Inserido!";
    text = msg || "";
    type = "success";
  }

  else if (code == 400) {
    title = header || "Conexão interrompida";
    text = msg ||
      "A conexão do seu dispositivo não está respondendo. Tente novamente.";
    type = "error";
  }

  else if (code == 401 || code == 403) {
    title = header || "Sessão Inativa ou sem Permissão";
    text = msg || "Você não está em uma sessão ativa (pode ter expirado) ou não tem permissão para executar essa ação. Clique em sair, e faça um novo login.";
    type = "error";
  }

  else if (code == 404) {
    title = header || "Paginão não encontrada";
    text = msg ||
      "A página de verificação foi alterada ou não existe mais. Por favor, acione a administração.";
    type = "error";
  }

  else if (code == 405) {
    title = header || "Ação Proibida";
    text = msg || "";
    type = "error";
  }

  else if (code == 500) {
    title = header || "Erro Interno";
    text = msg ||
      "Houve um error interno no servidor. Por favor, acione a administração.";
    type = "error";
  }

  else {
    title = header || "Erro desconhecido";
    text = msg ||
      "Ocorreu um erro desconhecido no sistema. Tente novamente mais tarde.";
    type = "error";
  }

  if (type == "success") {
    new swal({
      icon: 'success',
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 2000
    });
  } else {
    new swal({
      icon: 'warning',
      title: title,
      text: text,
      showCloseButton: false,
      showConfirmButton: false,
    });
  }
};

export default sweetAlert;