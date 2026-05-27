// Creating a map, where the key is a number and the values ​​are objects that in turn contain both a key and a value
let inventoryMap = new Map();

// Lógica para consumir API
const endpoint = "http://localhost:3000/products"
// Función para traer productos de la API
async function getProducts() {
    try {
        const response = await fetch(endpoint);

        if (response.ok === false) {
            alert("Error en el sistema. Intente más tarde");
        };

        const apiProducts = await response.json();

        // Ciclo para crar el Map
        apiProducts.forEach(apiProduct => {
            const productID = Number(apiProduct.IDProduct);

            const productDetails = {
                name: apiProduct.name,
                price: apiProduct.price,
                category: apiProduct.category
            };

            inventoryMap.set(productID, productDetails);
        });

    } catch (error) {
        alert("Error en el sistema. Intente más tarde");
    }
}

getProducts();

// Taking HTML tags with objects
const textIDVerification = document.getElementById('IDVerification');
const textNameVerification = document.getElementById('nameVerification');
const textProductsDetails = document.getElementById('placeholderText');

// Function to display registration and search sections
function showSection(form) {
    // Taking HTML tags with objects
    const registerForm = document.getElementById('registerSection');
    const searchForm = document.getElementById('searchSection');
    const menu = document.getElementById('mainMenu');
    const textSelectOption = document.getElementById('textSelectOption');

    // The menu and other unnecessary things are hidden.
    menu.style.display = 'none';
    textSelectOption.style.display = 'none';

    // Depending on the section the user chooses, the previously written form is deleted and the section is displayed.
    if (form === 'registerSection') {
        inputProductForm.reset();
        registerForm.classList.add('active');
    };

    if (form === 'searchSection') {
        inputSearchForm.reset();
        searchForm.classList.add('active');
    };

    // If the user returns to the menu, then all sections are cleared.
    if (form === 'mainMenu') {
        menu.style.display = 'flex';
        textSelectOption.style.display = 'block';
        registerForm.classList.remove('active');
        searchForm.classList.remove('active');

        inputProductForm.reset();

        textIDVerification.innerText = '';
        textNameVerification.innerText = '';
        submitButtonEnabler(false, false);

        inputSearchForm.reset();
        inputSearch(false, false, false)
    }
}

// Variables for the referee of enabling the registration submit button
let errorID = false;
let errorName = false;

// Logic to block sending if the ID is already registered
const inputProdID = document.getElementById('prodID');

inputProdID.addEventListener('blur', () => {

    if ((inputProdID.value).length === 4) {
        const ids = new Set(inventoryMap.keys());

        if (ids.has(Number(inputProdID.value))) {

            textIDVerification.innerText = '❌ ID not available';

            errorID = true;
        }
        else {
            textIDVerification.innerText = '';
            errorID = false;
        }

    }

    else {
        textIDVerification.innerText = '';
    }

    submitButtonEnabler(errorID, errorName);

});

// Logic to block sending if the Name is already registered
const inputProdName = document.getElementById('prodName');

inputProdName.addEventListener('blur', () => {

    const names = new Set();

    inventoryMap.forEach(product => { names.add((product.name.trim()).toLocaleLowerCase()) });

    if (names.has(((inputProdName.value).trim()).toLocaleLowerCase())) {

        textNameVerification.innerText = '❌ Product name already exists';

        errorName = true;

    } else {

        textNameVerification.innerText = '';

        errorName = false;
    };

    submitButtonEnabler(errorID, errorName);

});

// Function to enable and disable the send button
function submitButtonEnabler(confID, confName) {
    const buttonSubmit = document.getElementById('buttonSubmitSaveProduct');

    if (confID || confName) {
        buttonSubmit.disabled = true;

        buttonSubmit.style.backgroundColor = '#a39385';
        buttonSubmit.style.cursor = 'not-allowed';
        buttonSubmit.style.opacity = '0.6';
    } else {
        buttonSubmit.disabled = false;

        buttonSubmit.style.backgroundColor = '';
        buttonSubmit.style.cursor = 'pointer'
        buttonSubmit.style.opacity = '1';
    }
}

// Logic for product registration
const inputProductForm = document.getElementById('productForm');

inputProductForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputProdPrice = document.getElementById('prodPrice');
    const inputProdCategory = document.getElementById('prodCategory');

    const newProduct = {
        IDProduct: String(inputProdID.value).trim(),
        name: capitalizeWords(inputProdName.value.trim()),
        price: Number(inputProdPrice.value),
        category: inputProdCategory.value.trim()
    };

    postProduct(newProduct);

    showSection('mainMenu');

});

// Constants are created from the search form and its inputs
const inputSearchForm = document.getElementById('searchForm');
const inputSearchID = document.getElementById('searchInputID');
const inputSearchName = document.getElementById('searchInputName');
const inputSearchCategory = document.getElementById('searchCategory');

// Logic for blocking entries that are not being used in search
inputSearchForm.addEventListener('input', () => {

    productsList.innerHTML = '';

    foundProduct(false);

    // Call to the function to block inputs
    inputSearch(inputSearchID.value, inputSearchName.value, inputSearchCategory.value);

});

// Input blocking function
function inputSearch(idValue, nameValue, categoryValue) {
    const someInput = idValue || nameValue || categoryValue;

    const bloquearID = someInput && !idValue;
    inputSearchID.disabled = bloquearID;
    inputSearchID.style.opacity = bloquearID ? '0.5' : '1';
    inputSearchID.style.cursor = bloquearID ? 'not-allowed' : 'auto', searchID(inputSearchID.value);

    const bloquearName = someInput && !nameValue;
    inputSearchName.disabled = bloquearName;
    inputSearchName.style.opacity = bloquearName ? '0.5' : '1';
    inputSearchName.style.cursor = bloquearName ? 'not-allowed' : 'auto', searchName(inputSearchName.value);

    const bloquearCategory = someInput && !categoryValue;
    inputSearchCategory.disabled = bloquearCategory;
    inputSearchCategory.style.opacity = bloquearCategory ? '0.5' : '1';
    inputSearchCategory.style.cursor = bloquearCategory ? 'not-allowed' : 'auto', searchCategory(inputSearchCategory.value);

    !someInput ? textProductsDetails.innerText = 'Results will appear here once you start searching.' : '';

}

// Function for searching by ID
function searchID(pInputSearchID) {
    const ids = new Set(inventoryMap.keys());

    if (pInputSearchID !== '') {

        ids.forEach(element => {

            if (pInputSearchID.length > 1) {

                if (String(element).includes(pInputSearchID)) {
                    printHtml(element);
                }
            }
        });
    }

}

// Function for searching by name
function searchName(pInputSearchName) {

    if (pInputSearchName !== '') {

        inventoryMap.forEach((product, id) => {

            if ((product.name.trim().toLowerCase()).includes(pInputSearchName.trim().toLowerCase())) {
                printHtml(id);
            }

        });
    }
}

// Function for searching by Category
function searchCategory(pInputSearchCartegory) {

    if (pInputSearchCartegory !== '') {
        inventoryMap.forEach((product, id) => {

            if (product.category.includes(pInputSearchCartegory)) {
                printHtml(id);
            }

            if (pInputSearchCartegory === 'All') {
                printHtml(id)
            }
        });
    }

}

// Function to capitalize text
function capitalizeWords(text) {
    return text
        .toLowerCase()                     // 1. Pasamos todo a minúsculas para limpiar
        .split(' ')                        // 2. Separamos la frase en un array de palabras
        .map(word => {
            // 3. De cada palabra, tomamos la primera letra, la hacemos mayúscula
            // y le pegamos el resto de la palabra
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');                        // 4. Volvemos a unir las palabras con un espacio
}

// Constant to print the products in a list
const productsList = document.getElementById('productList');

// Function to render HTML
function printHtml(params) {
    textProductsDetails.innerText = '';

    foundProduct(true)

    productsList.innerHTML += `
        <li class="product-list">
            <p><strong>ID: </strong>${params}</p>
            <p><strong>Name: </strong> ${capitalizeWords(inventoryMap.get(params).name)}</p>
            <p><strong>Price: </strong> $${inventoryMap.get(params).price} COP</p>
            <p><strong>Category: </strong> ${capitalizeWords(inventoryMap.get(params).category)}</p>
        </li>
    `
}

// Function to indicate that the product has not been entered
function foundProduct(params) {
    if (!params === true) {
        textProductsDetails.innerText = '❌ No products found matching your search criteria.';
    } else {
        textProductsDetails.innerText = '';
    }
}

async function postProduct(params) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error(`Error al guardar en el servidor: ${response.status}`);
        }

        inventoryMap.set(params.IDProduct, {
            name: params.name,
            price: params.price,
            category: params.category
        });

        alert("✨ Product successfully registered!")

    } catch (error) {
        alert('Error al subir al JSON Server');
    }
}