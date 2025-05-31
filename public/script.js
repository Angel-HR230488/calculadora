// Convierte número a texto en español (tu función original sin cambios)
function numberToWordsES(n) {
  const UNIDADES = [
    "cero",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
  ];
  const DECENAS = [
    "diez",
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciséis",
    "diecisiete",
    "dieciocho",
    "diecinueve",
  ];
  const DIEZ_DIEZ = [
    "veinte",
    "treinta",
    "cuarenta",
    "cincuenta",
    "sesenta",
    "setenta",
    "ochenta",
    "noventa",
  ];
  const CENTENAS = [
    "cien",
    "doscientos",
    "trescientos",
    "cuatrocientos",
    "quinientos",
    "seiscientos",
    "setecientos",
    "ochocientos",
    "novecientos",
  ];

  function convertir(num) {
    if (num < 10) return UNIDADES[num];
    if (num < 20) return DECENAS[num - 10];
    if (num < 100) {
      let decena = Math.floor(num / 10);
      let unidad = num % 10;
      return (
        DIEZ_DIEZ[decena - 2] +
        (unidad > 0 ? " y " + UNIDADES[unidad] : "")
      );
    }
    if (num < 1000) {
      let centena = Math.floor(num / 100);
      let resto = num % 100;
      return (
        (centena === 1 && resto === 0
          ? "cien"
          : CENTENAS[centena - 1]) +
        (resto > 0 ? " " + convertir(resto) : "")
      );
    }
    if (num < 1000000) {
      let miles = Math.floor(num / 1000);
      let resto = num % 1000;
      let milesTexto =
        miles === 1 ? "mil" : convertir(miles) + " mil";
      return milesTexto + (resto > 0 ? " " + convertir(resto) : "");
    }
    return "número muy grande";
  }

  const entero = Math.floor(n);
  const decimales = Math.round((n - entero) * 100);

  let texto = convertir(entero) + " dólares";
  if (decimales > 0) {
    texto += " con " + convertir(decimales) + " centavos";
  } else {
    texto += " con cero centavos";
  }

  // Capitalizar la primera letra
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Función que calcula IVA
function calculate() {
  const amount = parseFloat(
    document.getElementById("amount").value
  );
  const option = document.querySelector(
    'input[name="ivaOption"]:checked'
  ).value;
  const resultDiv = document.getElementById("results");
  const ivaResult = document.getElementById("ivaResult");
  const numericResult = document.getElementById("numericResult");
  const textResult = document.getElementById("textResult");

  // Validación de monto
  if (isNaN(amount) || amount <= 0) {
    // En lugar de alert, podrías mostrar un mensaje en pantalla, pero por simplicidad mantenemos alert
    alert("Por favor ingrese un monto válido.");
    return;
  }

  let finalAmount;
  let iva;
  if (option === "add") {
    iva = amount * 0.13;
    finalAmount = amount + iva;
  } else {
    finalAmount = amount / 1.13;
    iva = amount - finalAmount;
  }

  ivaResult.innerText = `$${iva.toFixed(2)}`;
  numericResult.innerText = `$${finalAmount.toFixed(2)}`;
  textResult.innerText = numberToWordsES(finalAmount);

  // Mostrar resultado con animación de fade (Bootstrap)
  resultDiv.classList.remove("d-none");
  resultDiv.classList.add("show");
}

// Función que limpia inputs y oculta resultados
function clearAll() {
  document.getElementById("amount").value = "";
  const resultDiv = document.getElementById("results");
  resultDiv.classList.add("d-none");
  resultDiv.classList.remove("show");
}

// Función para ocultar manualmente la alerta de resultados
function hideResults() {
  const resultDiv = document.getElementById("results");
  resultDiv.classList.add("d-none");
  resultDiv.classList.remove("show");
}
