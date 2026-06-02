// Loogic for localStorage and sessionStorage

// Function to welcome the user
function welcomeMessage() {
    const userName = prompt('Hello, welcome to your Inventory Management. Please, tell your name');
    if (userName.trim() === '') {
        welcomeMessage()
    }
    localStorage.setItem('name', userName)
    
    alert(`It's great to have you here ${capitalizeWords(userName)}`)
}

// Conditional to show the welcome message
if (localStorage.getItem('name') === null) {
    welcomeMessage();
} else{
    alert(`It's great to have you back here ${capitalizeWords(localStorage.getItem('name'))}`)
}

// Daily counter
let counter
sessionStorage.getItem ('counter') === null ? counter = 0 : counter = sessionStorage.getItem('counter')
sessionStorage.setItem ('counter', counter)

// Updating the daily counter
const counterHTML = document.getElementById('counter')
counterHTML.innerText = counter

// Creating a map, where the key is a number and the values ​​are objects that in turn contain both a key and a value
let inventoryMap = new Map();

// Locking the form
let navigateBetweenOptions = false

// Logic for the API
const endpoint = "http://localhost:3000/products"
// Function to get the products
async function getProducts() {
    try {
        const response = await fetch(endpoint);

        if (response.ok === false) {
            alert("System error. Please try again later.");
        };

        const apiProducts = await response.json();

        // Loop to add the products to the inventoryMap
        apiProducts.forEach(apiProduct => {
            const productID = Number(apiProduct.IDProduct);

            const productDetails = {
                name: apiProduct.name,
                price: apiProduct.price,
                category: apiProduct.category,
                id: apiProduct.id
            };

            // Add the product to the map
            inventoryMap.set(productID, productDetails);
        });

        // Unlocking the form
        optionsLock(false)

    } catch (error) {
        // Locking the form
        alert("System error. Please try again later.");
        optionsLock(true)
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

    if (navigateBetweenOptions) {
        // Depending on the section the user chooses, the previously written form is deleted and the section is displayed.
        if (form === 'registerSection') {
            inputProductForm.reset();
            registerForm.classList.add('active');
        };

        if (form === 'searchSection') {
            inputSearchForm.reset();
            searchForm.classList.add('active');

        };
    }

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

        productsList.textContent = '';
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
        .toLowerCase()                     // 1. Transform the text to lowercase
        .split(' ')                        // 2. Split the text into words
        .map(word => {
            // 3. For each word, capitalize the first letter
            // And concatenate the rest of the word
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');                        // 4. Back to string
}

// Constant to print the products in a list
const productsList = document.getElementById('productList');

// Function to render the product list
function printHtml(productID) {

    const product = inventoryMap.get(productID);
    
    if (!product) return;

    foundProduct(true);

    // Create the product card
    const li = document.createElement('li');
    li.className = 'product-list';
    li.id = `prod-card-${product.id}`; // Assign a unique ID

    // Structure the product details
    const details = [
        { label: 'IDProduct: ', value: productID },
        { label: 'Name: ', value: capitalizeWords(product.name) },
        { label: 'Price: ', value: `$${product.price} COP` },
        { label: 'Category: ', value: capitalizeWords(product.category) }
    ];

    // Build the product card
    details.forEach(detail => {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = detail.label;

        const textNode = document.createTextNode(detail.value);

        p.appendChild(strong);
        p.appendChild(textNode);
        li.appendChild(p);
    });

    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete-product';
    deleteBtn.textContent = '🗑️ Delete Product';

    // Click event to delete the product
    deleteBtn.addEventListener('click', () => {
        deleteProductFromServer(li, product.id, productID);
    });

    // Append the delete button
    li.appendChild(deleteBtn);

    // Append the product to the list
    productsList.appendChild(li);
}

// 2. Function to delete a product
async function deleteProductFromServer(liElement, productIDJsonServer, productID) {
    
    // Confirmation message to the user before deleting
    const userName = localStorage.getItem('name')
    const confirmDelete = confirm(`${capitalizeWords(userName)}, are you sure you want to delete the product with ID ${productID}?`);
    if (!confirmDelete) return;

    try {
        // Link to the API endpoint with the product ID
        const response = await fetch(`${endpoint}/${productIDJsonServer}`, {
            method: 'DELETE'
        });

        if (response.ok === false) {
            throw new Error(`Error en el servidor al intentar borrar: ${response.status}`);
        }

        // Add the animation class
        liElement.classList.add('removing');

        // Wait for the animation to finish
        setTimeout(() => {
            productsList.removeChild(liElement);

            // If the list is empty show a message
            if (productsList.children.length === 0) {
                foundProduct(false);
            }
        }, 300);

        // Clear the product from the map
        inventoryMap.delete(Number(productID));

        alert("🗑️ Product successfully deleted from database!");

    } catch (error) {
        console.error(error);
        const userName = localStorage.getItem('name')
        alert(`Could not delete the product. ${capitalizeWords(userName)}, please check if JSON Server is running.`);
    }
}

// Function to indicate that the product has not been entered
function foundProduct(params) {
    if (!params === true) {
        textProductsDetails.innerText = '❌ No products found matching your search criteria.';
    } else {
        textProductsDetails.innerText = '';
    }
}

// Function to post the product
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

        const data = await response.json()

        // Add the product to the map
        inventoryMap.set(Number(params.IDProduct), {
            name: params.name,
            price: params.price,
            category: params.category,
            id: data.id
        });


        // Unlocking the form
        optionsLock(false)
        const userName = localStorage.getItem('name')
        alert(`✨ well done ${userName}. Product successfully registered!`)

        // Register the counter
        registerCounter()

    } catch (error) {
        alert('Error uploading to JSON Server');
        optionsLock(true)
    }
}

// Function to lock the form
function optionsLock(status) {
    const registrationButton = document.getElementById('registrationButton')
    const searchButton = document.getElementById('searchButton')
    const offlineStatus = document.getElementById('offlineStatus')
    const dailyCounter = document.getElementById('dailyCounter')

    // If the status is true, the form is locked and the user cannot interact with it and the daily counter is hidden
    if (status) {
        registrationButton.style.cursor = 'not-allowed'
        registrationButton.style.opacity = "0.4";
        searchButton.style.cursor = 'not-allowed'
        searchButton.style.opacity = "0.4";
        offlineStatus.style.display = 'block'
        dailyCounter.style.display = 'none'

        navigateBetweenOptions = false

        // If the status is false, the form is unlocked and the user can interact with it
    } else {
        registrationButton.style.cursor = 'auto'
        registrationButton.style.opacity = "1";
        searchButton.style.cursor = 'auto'
        searchButton.style.opacity = "1";
        offlineStatus.style.display = 'none'
        dailyCounter.style.display = 'block'

        navigateBetweenOptions = true
    }
}

// Function to register the counter
function registerCounter() {
    counter ++
    
    const counterHTML = document.getElementById('counter')

    counterHTML.innerText = counter

    sessionStorage.setItem ('counter', counter)
}