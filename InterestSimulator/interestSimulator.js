document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("interest-projection-form");
    form.addEventListener("submit", (event) => handleSubmit(event));
});

async function handleSubmit(event) {
    event.preventDefault();

    const accountId = document.getElementById("accountId").value;
    const months = document.getElementById("months").value;

    const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!guidPattern.test(accountId)) {
        alert("El número de cuenta debe ser un GUID válido.");
        return;
    }
    
    if (!accountId || !months) {
        alert("Por favor, ingrese todos los campos.");
        return;
    }

    const endpoint = `https://localhost:7051/api/FinancialProducts/InterestProjection/${accountId}?months=${months}`;

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            displayProjectionResult(data);
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error || 'Ocurrió un error al obtener la proyección.';
            alert(errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error inesperado. Por favor, intente de nuevo.");
    }
}

function displayProjectionResult(data) {
    const resultSection = document.getElementById("projection-result");
    const amountProjection = document.getElementById("amount-projection");

    resultSection.style.display = "block";

    amountProjection.textContent = `$${data.amountProjection.toFixed(2)}`;
}

function goBack() {
    window.location.href = "../index.html";
}
