async function fetchTopClients() {
    const response = await fetch('https://localhost:7051/api/Clients/TopClients');
    const data = await response.json();

    // Get the container elements for individual and business clients
    const individualClientsContainer = document.getElementById("individual-clients").getElementsByTagName('tbody')[0];
    const businessClientsContainer = document.getElementById("business-clients").getElementsByTagName('tbody')[0];

    // Function to create the client rows in the table
    const createClientRows = (clients, container) => {
        clients.forEach((client, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td> <!-- Numeric rank (Position) -->
                <td>${client.clientIdentification}</td>
                <td>$${client.totalBalance.toFixed(2)}</td>
            `;
            container.appendChild(row);
        });
    };

    // Display individual clients
    const individualClients = data.find(group => group.clientType === 0).clients;
    createClientRows(individualClients, individualClientsContainer);

    // Display business clients
    const businessClients = data.find(group => group.clientType === 1).clients;
    createClientRows(businessClients, businessClientsContainer);
}

document.addEventListener("DOMContentLoaded", fetchTopClients);
