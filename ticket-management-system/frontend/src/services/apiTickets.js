const endPointTickets = "http://localhost:3000/tickets"

// Función para consumir la API de tickets
export async function loadApiTickets() {
    try {
        const response = await fetch(`${endPointTickets}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        console.error("❌ API consumption failed:", error);
    }
}

export async function saveApiTicket(ticket) {
    try {
        const response = await fetch(`${endPointTickets}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticket),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Ticket creado exitosamente")

    } catch (error) {
        console.error("❌ API consumption failed:", error);
    }
}

export async function deleteApiTicket(id) {
    try {
        const response = await fetch(`${endPointTickets}/${id}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Ticket eliminado exitosamente")

    } catch (error) {
        console.error("❌ API consumption failed:", error);
    }
}

export async function updateApiTicket(id, data) {
    try {
        const response = await fetch(`${endPointTickets}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Ticket actualizado exitosamente")

    } catch (error) {
        console.error("❌ API consumption failed:", error);
    }
}