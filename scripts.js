function GetCEP() {
  let el = document.getElementById("cep");
  let valueInput = el.value;
  let CepClear = valueInput.replace(/\.|\-/g, "");
  let regexp = /\d\d((\d\d\d)|(\.\d\d\d-))\d\d\d/;
  let match = CepClear.match(regexp);

  if (match !== null) {
    GetInfoCEP(CepClear);
    el.classList.remove("input-error");
    el.classList.add("input-success");
  } else if (valueInput.length <= 0) {
    setMessageError("O campo de CEP não pode ser vazio!");
    ResetInputs();
  } else if (match === null) {
    setMessageError("CEP Inválido!");
  }
}

function GetInfoCEP(CEP) {
  LoadingInput();

  fetch(`https://viacep.com.br/ws/${CEP}/json/`)
    .then((response) => response.json())
    .then((res) => setInfosCEP(res));
}

function setInfosCEP(JSONInfos) {
  document.getElementById("street").value = JSONInfos.logradouro;
  document.getElementById("district").value = JSONInfos.bairro;
  document.getElementById("city").value = JSONInfos.localidade;
  document.getElementById("state").value = JSONInfos.uf;
  document.getElementById("ibge").value = JSONInfos.ibge;
}

function LoadingInput() {
  document.getElementById("street").value = "Loading...";
  document.getElementById("district").value = "Loading...";
  document.getElementById("city").value = "Loading...";
  document.getElementById("state").value = "Loading...";
  document.getElementById("ibge").value = "Loading...";
}

function ResetInputs() {
  document.getElementById("street").value = "";
  document.getElementById("district").value = "";
  document.getElementById("city").value = "";
  document.getElementById("state").value = "";
  document.getElementById("ibge").value = "";
}

function setMessageError(message) {
  let el = document.getElementById("cep");
  let elMsgErr = document.getElementById("msgErr");

  elMsgErr.innerText = message;
  el.classList.remove("input-success");
  el.classList.add("input-error");

  setTimeout(() => {
    elMsgErr.innerText = "";
  }, 5500);
}
