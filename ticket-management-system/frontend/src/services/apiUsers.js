// const endPointTickets = "http://localhost:30001/tickets"

// // Función para consumir la API de tickets
// export async function loadApiTickets() {
//     try {
//         const response = await fetch(`${endPointTickets}`);

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
        
//         return data

//     } catch (error) {
//         console.error("❌ API consumption failed:", error);
//     }
// }

const endPointUsers = "http://localhost:3001/users"

// Función para consumir la API de tickets
export async function loadApiUsers() {
    try {
        const response = await fetch(`${endPointUsers}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        console.error("❌ API consumption failed:", error);
    }
}

export async function saveApiUser(user) {
    try {
        const response = await fetch(`${endPointUsers}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Usuario creado exitosamente")

    } catch (error) {
        console.error("❌ API consumption failed:", error);
    }
}

export async function updateApiUser(id,userUpdated) {
    try {
        const response = await fetch(`${endPointUsers}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userUpdated),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Usuario actualizado exitosamente")

    } catch (error) {
        console.error("❌ API consumption failed:", error);
    }
}

export async function deleteApiUser(id) {
    try {
        const response = await fetch(`${endPointUsers}/${id}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Usuario eliminado exitosamente")

    } catch (error) {
        console.error("❌ API consumption failed:", error);
    }
}
// export async function deleteApiTicket(id) {
//     try {
//         const response = await fetch(`${endPointTickets}/${id}`, {
//             method: "DELETE",
//         })

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         alert("Ticket eliminado exitosamente")

//     } catch (error) {
//         console.error("❌ API consumption failed:", error);
//     }
// }

// export async function updateApiTicket(id, data) {
//     try {
//         const response = await fetch(`${endPointTickets}/${id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         alert("Ticket actualizado exitosamente")

//     } catch (error) {
//         console.error("❌ API consumption failed:", error);
//     }
// }