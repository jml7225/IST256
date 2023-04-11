$(document).ready(function() {
    // Display the products when the page loads
    displayProducts();

    // Handle form submission
    $("#productForm").submit(function(event) {
        event.preventDefault();

        // Retrieve form values
        let productId = $("#productId").val();
        let productDescription = $("#productDescription").val();
        let productCategory = $("#productCategory").val();
        let productUnitOfMeasure = $("#productUnitOfMeasure").val();
        let productPrice = parseFloat($("#productPrice").val());
        let productWeight = parseFloat($("#productWeight").val());

        // Create a product object
        let product = {
            productId: productId,
            productDescription: productDescription,
            productCategory: productCategory,
            productUnitOfMeasure: productUnitOfMeasure,
            productPrice: productPrice,
            productWeight: productWeight
        };

        // Get the products from local storage
        let products = JSON.parse(localStorage.getItem("products") || "[]");

        // Update or add the product
        let productIndex = products.findIndex(item => item.productId === productId);
        if (productIndex !== -1) {
            products[productIndex] = product;
        } else {
            products.push(product);
        }

        // Save the updated products array as a JSON string in the local storage
        localStorage.setItem("products", JSON.stringify(products));

        // Clear the form fields
        $("#productForm")[0].reset();

        // Update the product drop-down list
        displayProducts();
    });

    // Handle removal of selected product
    $("#removeProduct").click(function() {
        let productId = $("#productList").val();
        if (productId) {
            let products = JSON.parse(localStorage.getItem("products") || "[]");
            products = products.filter(product => product.productId !== productId);
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
        }
    });

    // Display JSON data in a modal
    $("#showJson").click(function() {
        let products = JSON.parse(localStorage.getItem("products") || "[]");
        $("#jsonData").text(JSON.stringify(products, null, 2));
        $("#jsonModal").css("display", "block");
    });

    // Close the JSON modal
    $("#closeJsonModal").click(function() {
        $("#jsonModal").css("display", "none");
    });

    // Close the JSON modal when clicking outside of it
    $(window).click(function(event) {
        if (event.target.id === "jsonModal") {
            $("#jsonModal").css("display", "none");
        }
    });
});

// Function to display the products in the drop-down list
function displayProducts() {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    $('#productList').empty();
    products.forEach(product => {
        $('#productList').append(`<option value="${product.productId}">${product.productId} - ${product.productDescription}</option>`);
    });
}
