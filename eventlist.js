class EventList {
    constructor() {
        // this array will contain all the event objects
        this.eventArray = []; 
        this.filter_btn = document.getElementById("category");
        this.filter_btn.addEventListener("change", () => {
            this.filterByCategory();
        });
        this.sort_btn = document.getElementById("date");
        this.sort_btn.addEventListener("change", () => {
            this.sort();
        })
        this.admin_btn = document.getElementById("admin_btn");
        this.admin_btn.addEventListener("click", () => {
            this.displayAdmin();
        })
        this.create_btn = document.getElementById("create_btn");
        this.create_btn.addEventListener("click", () => {
            this.create();
        })
    }

    // this will show all forms and buttons the admin can use to CRUD the list
    displayAdmin() {
        let add_form = document.getElementById("add_form");
        add_form.classList.toggle("hidden");
        
        let delete_btns = document.querySelectorAll(".delete_btn");
        delete_btns.forEach(function(item){
            item.classList.toggle("hidden");
        })

        let edit_btns = document.querySelectorAll(".edit_btn");
        edit_btns.forEach(function(item){
            item.classList.toggle("hidden");
        })  
        //disable sort function when inside admin, to avoid bugg.
        this.sort_btn.disabled = !this.sort_btn.disabled;  
    }
    
    // TODO:
    // The edit and delete buttons are toggled all around in the code so we should have a method for that.
    toggleButtons() {

    }
    // CRUD - create. This runs when the "add" button is clicked
    create() {
        // get all input fields from the "add form"
        let date_input = document.getElementById("event_date");
        let name_input = document.getElementById("name");
        let location_input = document.getElementById("location");
        let category_input = document.getElementById("event_category");
        let isAvaliable_input = document.getElementById("add_isAvaliable");
        
        // create a new event object from the users inputs
            let date = date_input.value;
            let name = name_input.value;
            let location = location_input.value;
            let category = category_input.value;
            let isAvaliable = isAvaliable_input.value;
            let new_event = new Event(date, name, location, category, isAvaliable);
            eventlist.addEvent(new_event);
            eventlist.storeEvent(new_event);
            eventlist.clearTable();
            eventlist.printEvent();

            // since the list will be printed out again all the admin buttons will be hidden. We dont want that
            // this code below is repeated many times so it will be moved to its own method later. 
            let delete_btns = document.querySelectorAll(".delete_btn");
            delete_btns.forEach(function(item){
            item.classList.toggle("hidden");
            let edit_btns = document.querySelectorAll(".edit_btn");
            edit_btns.forEach(function(item){
            item.classList.remove("hidden");
            })
        })
    }

    addEvent(event) {
        this.eventArray.push(event);
    };

   // CRUD - delete. This happens when any deletebutton is klicked
    delete() {
        //Finds the right object with target and removes that objects from the event array
        let index = event.target.id;
        this.eventArray.splice(index, 1);
    
        // The altered array will overwrite the old one.
        this.storeEvent();
        this.clearTable();
        this.printEvent();

        let delete_btns = document.querySelectorAll(".delete_btn");
        delete_btns.forEach(function(item){
            item.classList.toggle("hidden");
        })
        let edit_btns = document.querySelectorAll(".edit_btn");
        edit_btns.forEach(function(item){
            item.classList.toggle("hidden");
        })
        
    }
    //CRUD - edit. This will happen when any edit button is klicked. 
    edit() {

        //disables the buttons to prevent the bugg that happens when the user klicks "admin" when the edit form is open
        this.admin_btn.disabled = true;
        this.create_btn.disabled = true;

        // The edit form will now be shown
        let edit_form = document.getElementById("edit_form");
        edit_form.classList.toggle("hidden");

        //finds the right object with target
        let index = event.target.id;
    
        //When the form is shown it will have the current values of the objects filled in.
        let input_date = document.getElementById("edit_date");
        input_date.value = this.eventArray[index].date;
        let input_name = document.getElementById("edit_name");
        input_name.value = this.eventArray[index].name;
        let input_location = document.getElementById("edit_location");
        input_location.value = this.eventArray[index].location;
        let input_category = document.getElementById("edit_event_category");
        input_category.value = this.eventArray[index].category;
        let input_isAvaliable = document.getElementById("edit_isAvaliable");
        input_isAvaliable.value = this.eventArray[index].isAvaliable;

        let save_btn = document.getElementById("save_btn");
            save_btn.addEventListener("click", () => {
                
                // when save button is clicked the values till be saved in the object
                this.eventArray[index].date = input_date.value;
                this.eventArray[index].name = input_name.value;
                this.eventArray[index].location = input_location.value;
                this.eventArray[index].category = input_category.value;
                this.eventArray[index].isAvaliable = input_isAvaliable.value;
            
                // This will remove the current target so that when another edit button is klicked ONLY that one will be targeted (bugg)
                index = null;

                this.storeEvent();
                this.clearTable();
                this.printEvent();

                let delete_btns = document.querySelectorAll(".delete_btn");
                delete_btns.forEach(function(item){
                item.classList.toggle("hidden");
                })

                let edit_btns = document.querySelectorAll(".edit_btn");
                edit_btns.forEach(function(item){
                item.classList.toggle("hidden");
                })  

                // when save is clicked the edit form should be hidden again
                edit_form.classList.toggle("hidden");

                // after "save" is clicked the buttons will work again
                this.admin_btn.disabled = false;
                this.create_btn.disabled = false;
                
            })
    };

    //saves the array of event objects to local storage as "event_array"
    storeEvent() {
        let event_string = JSON.stringify(this.eventArray);
        localStorage.setItem("event_array", event_string);
    }
   
    //get the data from local storage and prints it out on the web page.
    printEvent() {

        let event_obj = JSON.parse(localStorage.getItem("event_array"));

        let list = document.getElementById("event-list");

            event_obj.forEach(function(event, index){

                let row = document.createElement("tr");
                row.classList.add("event-item")
                let td_date = document.createElement("td");
                let td_name = document.createElement("td");
                let td_location = document.createElement("td");
                let td_avaliable = document.createElement("td");
                td_date.innerText = event.date;
                td_name.innerText = event.name;
                td_location.innerText = event.location;

                list.append(row);
                row.append(td_date);
                row.append(td_name);
                row.append(td_location);

                // if true the event will have a "more info button" if false there will be a "cancelled" text
                // TODO: fix this bugg in the admin form: right now it will always be true if there is any input and false if there is no input
                if (event.isAvaliable === "Unavailable") {
                    td_avaliable.innerText = "cancelled"
                    td_avaliable.classList.add("cancelled");
                    row.append(td_avaliable);
                } else {
                    let more_info_btn = document.createElement("button");
                    more_info_btn.innerText = "More info";
                    more_info_btn.setAttribute("onclick", "window.location.href='eventdetails.html';")
                    td_avaliable.append(more_info_btn);
                    row.append(td_avaliable);
            }
            //Every event has a delete button and an edit butten, but they are hidden until the admin button is klicked. 
            let td_delete = document.createElement("td");
            let delete_btn = document.createElement("button")
            delete_btn.innerText = "Delete";
            delete_btn.classList.add("hidden");
            delete_btn.classList.add("delete_btn");
            delete_btn.setAttribute(`id`, `${index}`);
            delete_btn.addEventListener("click", () => {
                eventlist.delete();
            })
            td_delete.append(delete_btn);
            row.append(td_delete);

            let td_edit = document.createElement("td");
            let edit_btn = document.createElement("button")
            edit_btn.innerText = "Edit";
            edit_btn.classList.add("hidden");
            edit_btn.classList.add("edit_btn");
            edit_btn.setAttribute(`id`, `${index}`);
            edit_btn.addEventListener("click", () => {
                eventlist.edit();
            })
            td_edit.append(edit_btn);
            row.append(td_edit);
        })
        
    }

    //filter method to only show selected category
    filterByCategory() {

        //gets all events on display
        let event_row = document.getElementsByClassName("event-item")

        // finds the selected category from the drop down menu
        let category = this.filter_btn.options[this.filter_btn.selectedIndex].text;

        //get event-array from local storage
        let event_array = JSON.parse(localStorage.getItem("event_array"));

        //filtering out only the objects with the selected category from the event_array
        let filtered_array = event_array.filter((obj) => {
            return obj.category === category;
        });

        //when one of the categories is selected all others are hidden
        if (category !== "Category") {
            for (let i = 0; i < event_array.length; i++) {
                event_array[i].category == filtered_array[0].category
                    ? event_row[i].classList.remove("hidden")
                    : event_row[i].classList.add("hidden");
            }
        } else { //if "Category" is selected all the events will be displayd again
            for (let i = 0; i < event_array.length; i++) {
                event_row[i].classList.remove("hidden")
            }
        }
        //save the filtered array to local storage as "filtered_array"
        let event_string = JSON.stringify(filtered_array);
        localStorage.setItem("filtered_array", event_string);
    }

    //sort function to give ascending or descending order
    sort() {

        let sortByDate = document.getElementById("date");
        let sorted_array = [];

        //loop though objects in locak storage and sort them by date
        let event_array = JSON.parse(localStorage.getItem("event_array"));

        if (sortByDate.selectedIndex === 0) {
            sorted_array = event_array.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            })
        } else {
            sorted_array = event_array.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            })
        }

        //the sorted array will overwrite the "event_array" in local storage
        let event_string = JSON.stringify(sorted_array);
        localStorage.setItem("event_array", event_string)

        this.clearTable();
        this.printEvent();      
    }
    // This will just remove all events from the list when needed
    clearTable() {
        let Event = document.querySelectorAll("tr");
        Event.forEach(function (event) {
            event.remove();
        })
    }
}

class Event {
    constructor(date, name, location, category, isAvaliable) { 
        this.date = date; 
        this.name = name;
        this.location = location;
        this.category = category;
        this.isAvaliable = isAvaliable; 
    }
}

// Some events are on the page when its loaded:

let event1 = new Event("2020-06-03", "Anthony Jeselnik", "Civic Auditorium", "Stand Up", "Unavailable")
let event2 = new Event("2020-07-01", "James Blake", "L'Olympia", "Music", "Available")
let event3 = new Event("2020-08-13", "Nina Simone", "Fasching", "Music", "Unavailable")
let event4 = new Event("2020-08-17", "PSG vs Milan", "Le Parc des Princes", "Sport", "Unavailable")


let eventlist = new EventList;

eventlist.addEvent(event1);
eventlist.addEvent(event2);
eventlist.addEvent(event3);
eventlist.addEvent(event4);

// comment out these if you dont want the list to be over written every time the page loads. 
eventlist.storeEvent(event1);
eventlist.storeEvent(event2);
eventlist.storeEvent(event3);
eventlist.storeEvent(event4);



eventlist.printEvent();



