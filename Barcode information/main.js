// Importing the necessary items
const inputBox = document.querySelector(".input-box")
const listContainer = document.querySelector(".list-container");
const addBtn = document.querySelector(".add-btn");

// We create a addTask fn to add the tasks to the list-container
function addTask(){

    if(inputBox.value === ""){
        alert("You must write something")
    }
    else {
        let li = document.createElement("li"); 
        // We create an element by defining it as li. Can be named as anything. The "li" indicates the element that needs to be created.
        
        li.innerHTML = inputBox.value; 
        // We assign the innerHTML value for that created li from the input box.
        
        listContainer.appendChild(li); // We insert the created element inside the list container.
        
        let span = document.createElement("span"); 
        // We create a span for the cross icon
        
        span.innerHTML = "\u00d7";
        // The cross icon is set with a specific value.
        
        li.appendChild(span);
        // The cross icon is appended inside the li, making the span a child of li(parent), Since we expect the cross to be inside the li.

    }
    inputBox.value = ""; // We make sure the input box is empty upon adding a task.
    saveData(); // We run the saveData fn to make sure the added task is saved in the local storage.

}

addBtn.addEventListener("click", addTask); // This calls the addTask function.

listContainer.addEventListener("click", function(e){

    // The list container listens to a click and activates the function event (e).

    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();

        // It checks if event inside the list container targets a tag name LI and if so it allows to toggle a class name. Then we save the new data.

    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();

        // If not, it checks if the event inside the list container targets a tag name SPAN and if so the we remove the parent element of the tag name SPAN which is li.

    }
});

function saveData(){

    localStorage.setItem("Data", listContainer.innerHTML);

    // We use our browsers local storage to set an item with a name "Data" to store whatever thats in the list container which is innerHTML.

}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("Data");

    // This is what loads whenever the browser is refreshed by fetching the data from local storage using getItem that goes by the name "Data" which has stored the innerHTML of list container.
}

showTask();
// This is called out to make sure the browser displays the data everytime it refreshes.