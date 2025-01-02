document.addEventListener("DOMContentLoaded", () => {
    const accountTypeSelect = document.getElementById("accountType");
    const cdtSection = document.getElementById("cdt-section");
    const maturityDateInput = document.getElementById("maturityDate");

    toggleCDTFields(accountTypeSelect, cdtSection, maturityDateInput);

    accountTypeSelect.addEventListener("change", () => {
        toggleCDTFields(accountTypeSelect, cdtSection, maturityDateInput);
    });

    const form = document.getElementById("client-form");
    form.addEventListener("submit", (event) => handleSubmit(event, accountTypeSelect));
});

function toggleCDTFields(accountTypeSelect, cdtSection, maturityDateInput) {
    const isCDT = accountTypeSelect.value === "2";
    if (isCDT) {
        cdtSection.classList.remove("hidden");
        setMinMaturityDate(maturityDateInput); 
    } else {
        cdtSection.classList.add("hidden");
        cdtSection.querySelectorAll("input").forEach(input => input.value = "");
    }
}

function setMinMaturityDate(maturityDateInput) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const minDate = `${year}-${month}-${day}`;
    maturityDateInput.min = minDate; 
}

async function handleSubmit(event, accountTypeSelect) {
    event.preventDefault();

    const accountType = accountTypeSelect.value;
    const identification = document.getElementById("identification").value;

    let endpoint;
    const data = { identification };

    switch (accountType) {
        case "0": // Corriente
            endpoint = "/api/FinancialProducts/Current";
            break;
        case "1": // Ahorros
            endpoint = "/api/FinancialProducts/Savings";
            break;
        case "2": // CDT
            endpoint = "/api/FinancialProducts/CDT";
            data.maturityDate = document.getElementById("maturityDate").value;
            data.depositAmount = parseFloat(document.getElementById("depositAmount").value);
            data.monthlyInterest = parseFloat(document.getElementById("monthlyInterest").value);
            break;
        default:
            alert("Tipo de cuenta inválido.");
            return;
    }

    endpoint = 'https://localhost:7051' + endpoint;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Cuenta creada correctamente.");
            document.getElementById("client-form").reset();
            toggleCDTFields(accountTypeSelect, document.getElementById("cdt-section"), document.getElementById("maturityDate"));
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error ? errorData.error : 'Ocurrio un error en la creación';
            alert(errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error inesperado. Por favor, intente de nuevo.");
    }
}

function goBack() {
    window.location.href = "../index.html";
}
