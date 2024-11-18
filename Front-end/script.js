const boxModalPerfil = document.getElementById("boxModalPerfil");
const txtNovaSenha = document.getElementById("m-novaSenha");
const txtConfirmarSenha = document.getElementById("m-confirmarSenha");
const modalFade = document.getElementById("modalFade");
const modal = document.querySelector(".modal-container");
const modalExcluir = document.querySelector(".modal-container-excluir");
const tbody = document.querySelector("tbody");
const txtDataEmissao = document.getElementById("m-data");
const txtCliente = document.getElementById("m-cliente");
const ClienteLabelModal = document.getElementById("m-cliente-label-modal");
const clienteLabelLista = document.getElementById("th-cliente");
const txtFerramenta = document.getElementById("m-ferramenta");
const labelFerramentaModal = document.getElementById("l-ferramenta");
const labelFerramenta = document.getElementById("th-ferramenta");
const txtQuantidade = document.getElementById("m-quantidade");
const txtFuncionario = document.getElementById("m-funcionário");
const txtDataDevolucao = document.getElementById("m-dataDevolucao");
const txtQuantidadeDevolvida = document.getElementById("m-quantidadeDevolvida");
const btnAlterar = document.getElementById("btnAlterar");
const btnSalvar = document.getElementById("btnSalvar");
const dvMensagemErroModal = document.getElementById("dv-modal-mensagem-erro");
const mensagemErroModal = document.getElementById("m-modal-mensagem-erro");
const dvData = document.getElementById("dv-data");
const txtDataInicial = document.getElementById("m-dataInicial");
const txtDataFinal = document.getElementById("m-dataFinal");
const dvDescricao = document.getElementById("dv-descricao");
const selectPesquisa = document.getElementById("selectPesquisa");
const txtDescricaoPesquisa = document.getElementById("m-descricao")
const dvNenhumRegistroEncontrado = document.getElementById("dvNenhumRegistroEncontrado");
const formAlterarSenhaContainer = document.getElementById("form-alterarSenha-container");

let itens;
let itensFiltrado;
let IdAlmoxarifado;
let usuarioLogado;

document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    IsValidLogin();
  }

  if(txtNovaSenha){
    txtNovaSenha.focus();
  }

  var almoxarifadoFormModal = document.getElementById("almoxarifado-form-modal");
  if (almoxarifadoFormModal) {
    enviarFormularioAlmoxarifado();
  }

  var tittleAlmoxarifado = document.getElementById("tittle-almoxarifado");
  if (tittleAlmoxarifado) {
    carregaListaAlmoxafadoFerramenta();

    const ehTelaAlmoxarifadoFerramenta = localStorage.getItem("ehTelaAlmoxarifadoFerramenta");

    if(ehTelaAlmoxarifadoFerramenta == "true"){
      txtCliente.style.display = "none";
      ClienteLabelModal.style.display = "none";
      clienteLabelLista.style.display = "none";
      labelFerramentaModal.innerHTML = "Ferramenta"
      labelFerramenta.innerHTML = "Ferramenta"
      tittleAlmoxarifado.innerHTML = "Controle de saída de Ferramentas";
    }
    else{
      txtCliente.style.display = "block";
      ClienteLabelModal.style.display = "block";
      clienteLabelLista.style.display = "block";
      labelFerramentaModal.innerHTML = "Produto";
      labelFerramenta.innerHTML = "Produto";
      tittleAlmoxarifado.innerHTML = "Controle de saída de Materiais";
    }

    const dataAtual = new Date();

    txtDataInicial.value = formataDataAtualCampoTipoDate(dataAtual);
    txtDataFinal.value = formataDataAtualCampoTipoDate(dataAtual);
  }

  var BoxLoad = document.getElementById("BoxLoad");
  var boxWolcome = document.getElementById("boxWolcome");

  if (BoxLoad) {
    exibeElemento("BoxLoad", "box", false);
  }

  if (boxWolcome) {
    exibeElemento("boxWolcome", "boxPanels", true);
  }
});

// METODO POST - VALIDAR LOGIN
function IsValidLogin() {
  document
    .getElementById("login-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Impede o comportamento padrão do formulário

      const usuario = document.getElementById("usuario").value;
      const senha = document.getElementById("senha").value;
      const mensagemLoginIncorreto = document.getElementById("boxIsValid");

      if (usuario && senha) {
        const loginData = {
          Nome: usuario,
          Senha: senha,
        };

        try {
          const response = await fetch(
            "https://localhost:7111/api/Auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(loginData),
            }
          );

          if (response.ok) {

            const data = await response.json();

            // Armazenar o nome do usuário no localStorage
            localStorage.setItem("IdUsuario", data.idUsuario);
            localStorage.setItem("usuario", usuario);
            localStorage.removeItem("usuarioLogado");
            
            location.href = "home.html";
          } else {
            mensagemLoginIncorreto.style.display = "block";

            setTimeout(function () {
              mensagemLoginIncorreto.style.display = "none";
            }, 8000);
          }
        } catch (ex) {}
      }
    });
}

// window.addEventListener('click', (event) => {

//   if (boxModalPerfil.classList.contains("boxModalPerfil-show")) {
//     boxModalPerfil.classList.remove("boxModalPerfil-show");
//     boxModalPerfil.classList.add("boxModalPerfil-hidden");
//   }
// });

function exibeModalPerfil(){

  var estaEscondido = boxModalPerfil.classList.contains("boxModalPerfil-hidden");

  if(estaEscondido){
    boxModalPerfil.classList.remove("boxModalPerfil-hidden");
    boxModalPerfil.classList.add("boxModalPerfil-show");
  }
  else{
    boxModalPerfil.classList.remove("boxModalPerfil-show");
    boxModalPerfil.classList.add("boxModalPerfil-hidden");
  }
}

async function alterarSenha(){
  const mensagemSenhasDivergentes = document.getElementById("boxIsValid");

  const IdUsuario = parseInt(localStorage.getItem("IdUsuario"));
  const nomeUsuario = localStorage.getItem("usuario");
  const txtNovaSenhaValue = txtNovaSenha.value;
  const txtConfirmarSenhaValue = txtConfirmarSenha.value;

  if(txtNovaSenhaValue != txtConfirmarSenhaValue)
  {
    mensagemSenhasDivergentes.style.display = "block"

    setTimeout(function () {
      mensagemSenhasDivergentes.style.display = "none";
    }, 6000);

    txtNovaSenhaValue.focus();
    
    return;
  }

  if ( txtNovaSenhaValue && txtConfirmarSenhaValue) { 

        const UsuarioSenha = {
          idUsuario: IdUsuario,
          nome: nomeUsuario,
          senha: txtNovaSenhaValue,
        };

        try {
        const response = await fetch(`https://localhost:7111/api/Auth/AlterarSenha/${IdUsuario}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(UsuarioSenha),
        });

        if (response.ok) {  
            animarCheck();
        }
        } catch (ex) {
          console.log(ex);
        }
            
    }
}

function animarCheck() {

  formAlterarSenhaContainer.style.display = "none"

  const checkIcon = document.getElementById('check-icon');
  const successMessage = document.getElementById('success-message');

  // Adiciona a classe de animação para preencher o ícone
  checkIcon.classList.add('animate');
    
    
    // Exibe a mensagem após a animação do check
    setTimeout(() => {
      successMessage.classList.add('show');
    }, 1000);
    
    // Remove as classes após a animação para reutilizar
    setTimeout(() => {
      checkIcon.classList.remove('animate');
      successMessage.classList.remove('show');
      window.location.href = "home.html";
    }, 3000);

}


function enviarFormularioAlmoxarifado() {

  document.getElementById("almoxarifado-form-modal").addEventListener("submit", async function (event) {
      event.preventDefault(); // Impede o comportamento padrão do formulário

      var ehAlterar = btnAlterar.style.display == "block";
      var ehNovo = btnSalvar.style.display == "block";

      const almoxarifado = {
        dataEmissao: formataDataJson(txtDataEmissao.value),
        cliente: txtCliente.value,
        produto: txtFerramenta.value,
        quantidade: parseFloat(txtQuantidade.value),
        funcionario: txtFuncionario.value,
        quantidadeDevolvida: txtQuantidadeDevolvida.value != "" ? parseFloat(txtQuantidadeDevolvida.value) : 0,
        dataDevolucao: txtDataDevolucao.value != "" ? formataDataJson(txtDataDevolucao.value) : null,  
        ehControleFerramenta: false,
        idAlmoxarifado: IdAlmoxarifado
      };

      const ehTelaAlmoxarifadoFerramenta = localStorage.getItem("ehTelaAlmoxarifadoFerramenta");

      if(ehTelaAlmoxarifadoFerramenta == "true")
      {
        almoxarifado.ehControleFerramenta = true;
      }

      if(txtDataDevolucao.value != ""){

        if(formataDataJson(txtDataDevolucao.value) < formataDataJson(txtDataEmissao.value))
        {
          dvMensagemErroModal.style.display = "block"
          mensagemErroModal.textContent = "Data de devolução deve ser maior ou igual a Data de Emissão!"
  
          setTimeout(function () {
            dvMensagemErroModal.style.display = "none";
          }, 9000);

          txtDataDevolucao.focus();
          
          return;
        }
      }

      if(txtQuantidadeDevolvida.value != ""){
        
        if(txtQuantidadeDevolvida.value > txtQuantidade.value)
        {
          dvMensagemErroModal.style.display = "block"

          if(ehTelaAlmoxarifadoFerramenta == "true"){
            mensagemErroModal.textContent = "Quantidade devolvida deve ser menor ou igual a Quantidade da Ferramenta!"
          }
          else{
            mensagemErroModal.textContent = "Quantidade devolvida deve ser menor ou igual a Quantidade do Produto!"
          }
  
          setTimeout(function () {
            dvMensagemErroModal.style.display = "none";
          }, 9000);
          
          txtQuantidadeDevolvida.focus();

          return;
        }

      }

      if(ehNovo)
      {
        almoxarifado.idAlmoxarifado = 0;
        novoItem(almoxarifado);
      }

      if(ehAlterar)
      {
        if(txtDataDevolucao.value != null){
          txtQuantidadeDevolvida.required = true;
        }
        alterarItem(almoxarifado);
      }
      
    });
}

// METODO POST - ADICIONAR NOVO ITEM
async function novoItem(almoxarifado) {

    if ( txtDataEmissao.value && txtFerramenta.value &&
      txtQuantidade.value  && txtFuncionario.value) { 

    try {
      const response = await fetch("https://localhost:7111/api/Auth/almoxarifado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(almoxarifado),
      });

      if (response.ok) {
          closeModal();
          location.reload();
      }
    } catch (ex) {
      console.log(ex);
    }
      
  }
}

// METODO PUT - ALTERAR ITEM
async function alterarItem(almoxarifado) {

      if ( txtDataEmissao.value && txtFerramenta.value &&
           txtQuantidade.value  && txtFuncionario.value) { 

      try {
        const response = await fetch(`https://localhost:7111/api/Auth/AlterarItem/${IdAlmoxarifado}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(almoxarifado),
        });

        if (response.ok) {  
            closeModal();
            location.reload();
        }
      } catch (ex) {
        console.log(ex);
      }
            
    }
}

// METODO DELETE - EXCLUIR ITEM
function excluirItem() {

  document.getElementById("almoxarifado-form-modal-excluir").addEventListener("submit", async function (event) {
      event.preventDefault(); // Impede o comportamento padrão do formulário

        try {
          const response = await fetch(`https://localhost:7111/api/Auth/${IdAlmoxarifado}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json"}
          });

          if (response.ok) {
             closeModal();
             location.reload();
          }
        } catch (ex) {
          console.log(ex);
        }
    });
}

// METODO GET  - CARREGAR LISTA ALMOXARIFADO
function carregaListaAlmoxafadoFerramenta() {
  const ehTelaAlmoxarifadoFerramenta = localStorage.getItem("ehTelaAlmoxarifadoFerramenta");

  let ehTelaAlmoxarifadoFerramentaUrl = (ehTelaAlmoxarifadoFerramenta == "true"); 

  try {
    fetch(`https://localhost:7111/api/Auth/almoxarifado?ehTelaAlmoxarifadoFerramenta=${encodeURIComponent(ehTelaAlmoxarifadoFerramentaUrl)}`)
      .then((response) => response.json())
      .then((data) => {
        const tbody = document.querySelector(".divTable tbody");

        itens = data;

        renderizaListaAlmoxarifado(itens);
         
        txtDescricaoPesquisa.focus();
                        
      });
  } catch (ex) {
    console.log(ex);
  }
}


function renderizaListaAlmoxarifado(lista){
  
  tbody.innerHTML = "";
  
  lista.forEach((almoxarifado, index) => {
    
    IdAlmoxarifado = almoxarifado.idAlmoxarifado;
    
    const tr = document.createElement("tr");
    
    const dataEmissaoValue = almoxarifado.dataEmissao || "";
    const dataEmissaoValueBR = new Date(dataEmissaoValue).toLocaleDateString("pt-BR");
    const clienteValue = almoxarifado.cliente || "";
    const ferramentaValue = almoxarifado.produto || "";
    const quantidadeValue = almoxarifado.quantidade || "";
    const funcionarioValue = almoxarifado.funcionario || "";
    const dataDevolucaoValue = almoxarifado.dataDevolucao || "" ;
    let dataDevolucaoValueBR = "";
    if (dataDevolucaoValue != "") {
      dataDevolucaoValueBR = new Date(dataDevolucaoValue).toLocaleDateString("pt-BR");
    }
    const quantidadeDevolucaoValue = almoxarifado.quantidadeDevolvida || "";
    
    if (dataDevolucaoValueBR === '') {
      tr.classList.add('text-vermelho');
    }
    
    tr.innerHTML = `
    <td>${dataEmissaoValueBR}</td>                 
    <td class="txtclienteValue">${clienteValue}</td>                         
    <td>${ferramentaValue}</td>
    <td>${quantidadeValue}</td>
    <td>${funcionarioValue}</td>
    <td>${dataDevolucaoValueBR}</td>
    <td>${quantidadeDevolucaoValue}</td>
    <td id="icon-lista-label">
    <img onclick="openModal(true, ${index});" class="icon-lista" src="img/editar.png" title="Click aqui para editar este registro">
    <img onclick="openModalExcluir(${index});" class="icon-lista" src="img/excluir.png" title="Click aqui para excluir este registro">
    </td>
    `;
    
    tbody.appendChild(tr);
  });

  const ehTelaAlmoxarifadoFerramenta = localStorage.getItem("ehTelaAlmoxarifadoFerramenta");
        
  var txtclienteValueTds = document.querySelectorAll('td.txtclienteValue');
  
  if(ehTelaAlmoxarifadoFerramenta == "true"){
    
    txtclienteValueTds.forEach(function(td) {
      td.style.display = 'none';
    });      
  }
} 

document.getElementById("m-descricao").addEventListener("input", function() {

  const ehTelaAlmoxarifadoFerramenta = localStorage.getItem("ehTelaAlmoxarifadoFerramenta");
  const pesquisa = this.value.toLowerCase();

  if (pesquisa === "") {
    renderizaListaAlmoxarifado(itens);
    return;
  }

  if(ehTelaAlmoxarifadoFerramenta == "true"){
    itensFiltrado = itens.filter(item => 
      item.produto.toLowerCase().includes(pesquisa) ||
      item.funcionario.toLowerCase().includes(pesquisa) ||
      item.cliente.toLowerCase().includes(pesquisa) 
    );  
  }
  else{
    itensFiltrado = itens.filter(item => 
      item.produto.toLowerCase().includes(pesquisa) ||
      item.funcionario.toLowerCase().includes(pesquisa)
    );
  }

  exibeDvNenhumRegistroEncontrado(itensFiltrado);

  renderizaListaAlmoxarifado(itensFiltrado);
});

function filtrarPorData(){
  
  const dataInicial = txtDataInicial.value;
  const dataFinal = txtDataFinal.value;

  // Filtrar a lista com base no intervalo de datas
  const itensFiltrado = itens.filter(item => {

      const dataEmissaoNewDate = new Date(item.dataEmissao);
      const dataEmissaoConvertida = formataDataAtualCampoTipoDate(dataEmissaoNewDate);

      const validaDataInicial = dataEmissaoConvertida >= dataInicial;
      const validaDataFinal = dataEmissaoConvertida <= dataFinal;

      return validaDataInicial && validaDataFinal;
  });

  exibeDvNenhumRegistroEncontrado(itensFiltrado);

  renderizaListaAlmoxarifado(itensFiltrado);
}

function buscarTodosListaAlmoxarifado(){

  txtDescricaoPesquisa.value = "";
  txtDescricaoPesquisa.focus();

  txtDataInicial.value = "";
  txtDataFinal.value = "";

  exibeDvNenhumRegistroEncontrado(itens);
  renderizaListaAlmoxarifado(itens);
}

function exibeDvNenhumRegistroEncontrado(lista){

  if(lista[0] === undefined){
    dvNenhumRegistroEncontrado.style.display = "flex";
  }
  else{
    dvNenhumRegistroEncontrado.style.display = "none";
  }
}

selectPesquisa.addEventListener("change", function (){
  
  const selectedValue = selectPesquisa.value;

  if (selectedValue === "pesquisaDescricao") {

    dvDescricao.classList.add("show");
    dvDescricao.classList.remove("hidden");

    txtDescricaoPesquisa.focus();

    dvData.classList.remove("show");
    dvData.classList.add("hidden");

  } else if (selectedValue === "pesquisaData") {

    dvData.classList.add("show");
    dvData.classList.remove("hidden");

    dvDescricao.classList.remove("show");
    dvDescricao.classList.add("hidden");
  }

});

function exibeElemento(hideElementId, showElementId, EhboxWolcome) {
  if (EhboxWolcome == true) {
    const usuario = localStorage.getItem("usuario");

    const spanWolcome = document.getElementById("span-wolcome");
    const spanboxMessageChoose = document.getElementById("span-boxMessageChoose");

    spanWolcome.textContent = `Seja Bem-Vindo(a) ${usuario}`;
    spanboxMessageChoose.textContent = `Vamos lá ${usuario}, escolha o que deseja controlar !`;

    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
      let hideElement = document.getElementById(hideElementId);
      let showElement = document.getElementById(showElementId);

      hideElement.style.display = "none";
      showElement.style.display = "block";

      return;
    }
  }

  setTimeout(function () {
    let hideElement = document.getElementById(hideElementId);
    let showElement = document.getElementById(showElementId);

    hideElement.style.opacity = "0";
    hideElement.style.visibility = "hidden";

    setTimeout(function () {
      hideElement.style.display = "none";
      showElement.style.display = "block";
    }, 800);
  }, 2600);
}

function sair() {
  localStorage.clear();
  window.location.href = "index.html";
}

function voltar() {
  localStorage.removeItem("ehTelaAlmoxarifadoFerramenta");
  window.location.href = "home.html";
}

function telaAlterarSenha(){
  localStorage.setItem("usuarioLogado", "true");
  window.location.href = "AlterarSenha.html";
}

function btnCancelarAlterarSenha(){
  window.location.href = "home.html";
}

function telaControleAlmoxarifado(_ehTelaAlmoxarifadoFerramenta) {
  localStorage.setItem("usuarioLogado", "true");
  localStorage.setItem("ehTelaAlmoxarifadoFerramenta", _ehTelaAlmoxarifadoFerramenta);
  window.location.href = "ControleAlmoxarifado.html";
}

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modalFade.style.display = "block";

  if (edit) {
    const data = itens[index].dataEmissao;
    txtDataEmissao.value = new Date(data).toLocaleDateString("pt-BR");
    txtCliente.value = itens[index].cliente;
    txtFerramenta.value = itens[index].produto;
    txtQuantidade.value = itens[index].quantidade;
    txtFuncionario.value = itens[index].funcionario;
    const dataDevolucaoIndex = itens[index].dataDevolucao;
    txtDataDevolucao.value = itens[index].dataDevolucao == null ? "" : new Date(dataDevolucaoIndex).toLocaleDateString("pt-BR");
    txtQuantidadeDevolvida.value = itens[index].quantidadeDevolvida == 0 ? "" : itens[index].quantidadeDevolvida;
    IdAlmoxarifado = itens[index].idAlmoxarifado;

    btnAlterar.style.display = "block";
    btnSalvar.style.display = "none";
  } else {
    const dataAtual = new Date();
    txtDataEmissao.value = formataDataAtual(dataAtual);
    txtCliente.value = "";
    txtFerramenta.value = "";
    txtQuantidade.value = "";
    txtFuncionario.value = "";
    txtDataDevolucao.value = "";
    txtQuantidadeDevolvida.value = "";

    btnAlterar.style.display = "none";
    btnSalvar.style.display = "block";
  }

  document.getElementById("m-data").addEventListener("input", campoTipoDate);
  document
    .getElementById("m-dataDevolucao")
    .addEventListener("input", campoTipoDate);
}

function closeModal() {
  modal.classList.remove("active");
  modalExcluir.classList.remove("active");

  modalFade.style.display = "none";
}

function openModalExcluir(index = 0)
{
  modalExcluir.classList.add("active");

  modalFade.style.display = "block";

  IdAlmoxarifado = itens[index].idAlmoxarifado;
}

function gerarPDF() {
  const ehTelaAlmoxarifadoFerramenta = localStorage.getItem("ehTelaAlmoxarifadoFerramenta");

  if(ehTelaAlmoxarifadoFerramenta == "true"){
    PDFalmoxarifadoSaidaFerramenta();
  }
  else{
    PDFalmoxarifadoSaidaMateriais();
  }
}

function PDFalmoxarifadoSaidaFerramenta()
{
   // Captura os dados da tabela
   const body = [];

   body.push([
     { text: 'Data Emissão', bold: true, fontSize: 11 }, 
     { text: 'Ferramenta', bold: true, fontSize: 11 }, 
     { text: 'Quantidade', bold: true, fontSize: 11 },
     { text: 'Funcionário', bold: true, fontSize: 11 },
     { text: 'Data Devolução', bold: true, fontSize: 11 },
     { text: 'Quant. Devolvida', bold: true, fontSize: 11 },
 ]);
 
   itens.forEach(almoxarifado => {
 
     let dataEmissaoFormatada = new Date(almoxarifado.dataEmissao).toLocaleDateString("pt-BR")
     let dataDevolucaoFormatada = almoxarifado.dataDevolucao == null ? "" : new Date(almoxarifado.dataDevolucao).toLocaleDateString("pt-BR")
 
       body.push([
                  { text: dataEmissaoFormatada, fontSize: 10 }, 
                  { text: almoxarifado.produto, fontSize: 10 }, 
                  { text: almoxarifado.quantidade, fontSize: 10, alignment: 'center' }, 
                  { text: almoxarifado.funcionario, fontSize: 10 }, 
                  { text: dataDevolucaoFormatada, fontSize: 10 }, 
                  { text: almoxarifado.quantidadeDevolvida, fontSize: 10, alignment: 'center' }
             ]);
   });
 
   // Definição do documento
   var docDefinition = {
       content: [
           { 
               text: 'TEKAL EQUIPAMENTOS', 
               style: 'header',
               alignment: 'center'
           },
           { 
             text: 'CONTROLE DE SAÍDA DE FERRAMENTAS (ALMOXARIFADO)', 
             style: 'header',
             alignment: 'center'
         },
           {
               table: {
                   headerRows: 1,
                   widths: [70, 125, 60, 103, 80, 85], 
                   body: body // Dados da tabela
               },
               margin: [-32, 0, 0, 0]
           }
       ],
       styles: {
           header: {
               fontSize: 15,
               bold: true,
               margin: [0, 0, 0, 10]
           }
       }
   };
 
   // Gera o PDF
   pdfMake.createPdf(docDefinition).open();
}

function PDFalmoxarifadoSaidaMateriais()
{
   // Captura os dados da tabela
   const body = [];

   body.push([
     { text: 'Data Emissão', bold: true, fontSize: 11 }, 
     { text: 'Cliente', bold: true, fontSize: 11 }, 
     { text: 'Produto', bold: true, fontSize: 11 }, 
     { text: 'Quantidade', bold: true, fontSize: 11 },
     { text: 'Funcionário', bold: true, fontSize: 11 },
     { text: 'Data Devolução', bold: true, fontSize: 11 },
     { text: 'Quant. Devolvida', bold: true, fontSize: 11 },
 ]);
 
   itens.forEach(almoxarifado => {
 
     let dataEmissaoFormatada = new Date(almoxarifado.dataEmissao).toLocaleDateString("pt-BR")
     let dataDevolucaoFormatada = almoxarifado.dataDevolucao == null ? "" : new Date(almoxarifado.dataDevolucao).toLocaleDateString("pt-BR")
 
       body.push([
                  { text: dataEmissaoFormatada, fontSize: 10 }, 
                  { text: almoxarifado.cliente, fontSize: 10 }, 
                  { text: almoxarifado.produto, fontSize: 10 }, 
                  { text: almoxarifado.quantidade, fontSize: 10, alignment: 'center' }, 
                  { text: almoxarifado.funcionario, fontSize: 10 }, 
                  { text: dataDevolucaoFormatada, fontSize: 10 }, 
                  { text: almoxarifado.quantidadeDevolvida, fontSize: 10, alignment: 'center' }
             ]);
   });
 
   // Definição do documento
   var docDefinition = {
       content: [
           { 
               text: 'TEKAL EQUIPAMENTOS', 
               style: 'header',
               alignment: 'center'
           },
           { 
             text: 'CONTROLE DE SAÍDA DE MATERIAIS (ALMOXARIFADO)', 
             style: 'header',
             alignment: 'center'
         },
           {
               table: {
                   headerRows: 1,
                   widths: [70, 90, 80, 'auto', '*', 80, 85], 
                   body: body // Dados da tabela
               },
               margin: [-33, 0, 0, 0]
           }
       ],
       styles: {
           header: {
               fontSize: 15,
               bold: true,
               margin: [0, 0, 0, 10]
           }
       }
   };
 
   // Gera o PDF
   pdfMake.createPdf(docDefinition).open();
}

function formataDataAtual(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}

function formataDataAtualCampoTipoDate(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  const dataFormatada = `${ano}-${mes}-${dia}`;

  return dataFormatada
}

function formataDataJson(data) {

const [dia, mes, ano] = data.split("/");

// Criando o objeto Date (Lembre-se que os meses em JavaScript vão de 0 a 11, por isso subtraímos 1 do mês)
const dataISO = new Date(ano, mes - 1, dia);

const dataISOFormat = dataISO.toISOString();

  return dataISOFormat;
}

function campoTipoDate(e) {
  let input = e.target.value;

  // Remove caracteres não numéricos exceto /
  input = input.replace(/[^0-9\/]/g, "");

  // Adiciona a barra automaticamente após o dia e mês
  if (input.length > 2 && input[2] !== "/") {
    input = input.slice(0, 2) + "/" + input.slice(2);
  }
  if (input.length > 5 && input[5] !== "/") {
    input = input.slice(0, 5) + "/" + input.slice(5);
  }

  // Limita a entrada a 10 caracteres no formato DD/MM/YYYY
  if (input.length > 10) {
    input = input.slice(0, 10);
  }

  e.target.value = input;
}
