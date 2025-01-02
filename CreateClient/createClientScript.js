document.getElementById("client-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const identification = document.getElementById("identification").value.trim();
    const name = document.getElementById("name").value.trim();
    const clientType = parseInt(document.getElementById("clientType").value);
    const legalRepresentativeIdentification = document.getElementById("legalRepresentativeIdentification").value.trim();
    const legalRepresentativeName = document.getElementById("legalRepresentativeName").value.trim();
    const legalRepresentativePhone = document.getElementById("legalRepresentativePhone").value.trim();

    const identificationPattern = /^[0-9]+$/;

    if (!identificationPattern.test(identification)) {
        alert("La identificación debe contener solo números.");
        return;
    }

    if (clientType === 1) {
        if (!legalRepresentativeIdentification || !legalRepresentativeName || !legalRepresentativePhone) {
            alert("Por favor complete toda la información del representante legal.");
            return;
        }
    }

    const data = {
        identification,
        name,
        clientType,
        legalRepresentativeIdentification: clientType === 1 ? legalRepresentativeIdentification : null,
        legalRepresentativeName: clientType === 1 ? legalRepresentativeName : null,
        legalRepresentativePhone: clientType === 1 ? legalRepresentativePhone : null,
    };

    const endpoint = "https://localhost:7051/api/Clients";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("¡Cliente creado correctamente!");
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error || "Ocurrió un error en la creación.";
            alert(errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error inesperado. Contacte al administrador.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const clientTypeSelect = document.getElementById("clientType");
    const legalRepresentativeSection = document.getElementById("legal-representative-section");
    const legalInputs = legalRepresentativeSection.querySelectorAll("input");

    const toggleLegalRepresentativeFields = () => {
        const isBusiness = clientTypeSelect.value === "1";
        if (isBusiness) {
            legalRepresentativeSection.classList.remove("hidden");
            legalInputs.forEach((input) => input.setAttribute("required", "true"));
        } else {
            legalRepresentativeSection.classList.add("hidden");
            legalInputs.forEach((input) => {
                input.removeAttribute("required");
                input.value = ""; 
            });
        }
    };

    toggleLegalRepresentativeFields(); 

    clientTypeSelect.addEventListener("change", toggleLegalRepresentativeFields);
});

function goBack() {
    window.location.href = "../index.html";
}
