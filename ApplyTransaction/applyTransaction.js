function goBack() {
    window.location.href = "../index.html";
}

async function handleTransaction(isDeposit) {
    const accountType = document.getElementById("accountType").value;
    const accountId = document.getElementById("accountId").value;
    const depositAmount = parseFloat(document.getElementById("depositAmount").value);

    const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!guidPattern.test(accountId)) {
        alert("El número de cuenta debe ser un GUID válido.");
        return;
    }

    if (depositAmount <= 0) {
        alert("El monto de la transacción debe ser mayor a cero.");
        return;
    }

    const transactionAmount = isDeposit ? depositAmount : -depositAmount;

    const endpointBase = "https://localhost:7051/api/FinancialProducts";
    const endpoint = `${endpointBase}/${accountType === "1" ? "Savings" : "Current"}/${accountId}/ApplyTransaction`;

    const data = { transactionAmount };

    try {
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`¡Transacción de ${isDeposit ? "depósito" : "retiro"} realizada con éxito!`);
        } else {
            const errorData = await response.json();
            alert(`Error en la transacción: ${errorData.error || "Ocurrió un problema."}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error inesperado. Contacte al administrador.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("depositButton").addEventListener("click", () => handleTransaction(true));
    document.getElementById("withdrawButton").addEventListener("click", () => handleTransaction(false));
});
