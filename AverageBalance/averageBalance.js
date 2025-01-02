document.addEventListener("DOMContentLoaded", () => {
  // Call the fetch function when the page loads
  fetchAverageBalance();
});

async function fetchAverageBalance() {
  const endpoint = "https://localhost:7051/api/Clients/AverageBalance";

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      displayAverageBalanceResult(data);
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'Ocurrió un error al obtener los saldos promedios.';
      alert(errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error inesperado. Por favor, intente de nuevo.");
  }
}

function displayAverageBalanceResult(data) {
  const resultSection = document.getElementById("average-balance-result");
  const individualBalance = document.getElementById("individual-balance");
  const businessBalance = document.getElementById("business-balance");

  resultSection.style.display = "block";

  individualBalance.textContent = `$${data.individualClientAverageBalance.toFixed(2)}`;
  businessBalance.textContent = `$${data.businessClientAverageBalance.toFixed(2)}`;
}

function goBack() {
  window.location.href = "../index.html";
}
