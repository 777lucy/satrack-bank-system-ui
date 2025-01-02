document.getElementById("cancelCDT-form").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const accountId = document.getElementById("accountId").value.trim();

    if (!accountId) {
        alert("Por favor, ingrese un número de cuenta válido.");
        return;
    }

    const endpoint = `https://localhost:7051/api/FinancialProducts/CDT/${accountId}`;

    try {
        const response = await fetch(endpoint, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("¡Cuenta CDT cancelada con éxito!");
            document.getElementById("cancelCDT-form").reset();
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error || "Ocurrió un error al cancelar la cuenta CDT.";
            alert(errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error inesperado. Por favor, contacte al administrador.");
    }
});

function goBack() {
    window.location.href = '../index.html';
}
