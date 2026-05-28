# Inventory-Management-JSONServer

## Description

This project is a JSON server for an inventory management system. It uses the `json-server` library to provide a RESTful API that allows managing products, categories, names of products, and prices. The JSON server handles storing and serving data in JSON format, making it easier to communicate with the frontend application

## Installation

1. Clone the repository
2. Open a terminal and navigate to the `api folder`
3. Run `npm install` to install the required dependencies
4. Write the following command in the terminal to start the JSON server: `npx json-server --watch database/db.json`
5. Open the index.html file in a web browser and you can start using the inventory management system

> [!WARNING]
> - Make sure you have Node.js installed on your machine to run the JSON server.
> - Make sure to start the JSON server before opening the index.html file, otherwise the frontend application won't be able to fetch data from the server.

## Usage

For using the web application, follow these steps:

### Registering a New Product
1. Click on the "Add Product" button
2. Fill in the product details (name, category, price)
3. Click "Save" to add the product to the inventory
> [!NOTE]
> You can't add a product without filling in all the required fields.<br>
> You can't add a product with a id that already exists in the inventory.

### Searching for a Product
1. Click on the "Search" button
2. Enter the product id, name or category in the search bar <br> (You can view all products by selecting the "All" option in the search bar for category)

## Contributing

If you are interested in contributing to this project, follow these instructions:

1. Clone the repository
2. Create a branch for your feature or bugfix
3. Make your changes and commit them
4. Submit a pull request

## Contact

If you have any questions or issues, feel free to contact me at my github profile: [https://github.com/JayzirTech]