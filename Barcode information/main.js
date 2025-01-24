const data = new Map();

// Load data from local storage into the map
function loadData(){
    Object.keys(localStorage).forEach(key => {
        const value = JSON.parse(localStorage.getItem(key));
        data.set(key, value);
    });
    console.log("Loaded data from localStorage:", data);
}

loadData();

// Adding barcode and it's relevant information
const serialNumberInput = document.querySelector(".serialNumber-input");
const customerNameInput = document.querySelector(".customerName-input");
const invoiceNumberInput = document.querySelector(".invoiceNumber-input");
const addBtn = document.querySelector(".add-btn");

function updateBarcode(){

    const barcodes = serialNumberInput.value.split(",").map(barcode => barcode.trim()).filter(barcode => barcode.length > 0); // Fix it with each Barcode being a key
    const customer = customerNameInput.value.trim();
    const invoiceNo = invoiceNumberInput.value.trim();

    if (barcodes.length === 0 || !customer || !invoiceNo) {
        alert("Please fill out all fields before submitting.");
        return;
    }

    barcodes.forEach(barcode => {

        if(data.has(barcode)){
            console.log(`"${barcode}" already exists.`)
            console.log("Existing entry:", data.get(barcode));
        }
        else {
            const entry = {
                CUSTOMER: customer,
                INVOICE_NO: invoiceNo,
                DATE: new Date().toISOString()
            };
            data.set(barcode, entry);
            localStorage.setItem(barcode, JSON.stringify(entry));
            console.log(`Added new entry for ${barcode}:`, data.get(barcode));
        }

    });

    serialNumberInput.value = "";
    customerNameInput.value = "";
    invoiceNumberInput.value = "";

    const sortedKeys = [...data.keys()].sort(); // Sorting the keys
    const sortedData = new Map(sortedKeys.map(key => [key, data.get(key)])); // Sorting the data according to the keys
    
    // Updating the data
    data.clear();
    sortedData.forEach((value, key) => data.set(key, value));
    
    console.log(data); // debuging to check

    // Updating the table
    updateTable();
    
}


// Updating the table
const tbody = document.querySelector(".t-body");

function updateTable(){
    
    tbody.innerHTML = "";

    data.forEach((value, key) => {
        
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${key}</td>
            <td>${value.CUSTOMER}</td>
            <td>${value.INVOICE_NO}</td>
            <td>${new Date(value.DATE).toLocaleString()}</td>
        `;

        tbody.appendChild(row);

    })

}


// Looking up for values of a barcode
const serialNumberSearch = document.querySelector(".serialNumber-search");
const customerNameGet = document.querySelector(".customerName-search");
const invoiceNumberGet = document.querySelector(".invoiceNumber-search");  
const dateGet = document.querySelector(".date-search");
const searchBtn = document.querySelector(".search-btn");


function lookupBarcode(){
    
    const serialNumber = serialNumberSearch.value;

    if (data.has(serialNumber)){
        const entry = data.get(serialNumber);
        customerNameGet.value = entry.CUSTOMER;
        invoiceNumberGet.value = entry.INVOICE_NO;
        dateGet.value = new Date(entry.DATE).toLocaleString();
    }
    else {
        alert (`Serial Number "${serialNumber}" is not found.`)
    }

}