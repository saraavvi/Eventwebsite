

let message = document.getElementById("message-input");

let submit_button = document.getElementById("submit-message");

let message_board = document.getElementById("print-message")

let messages = [];


submit_button.addEventListener("click", function () {

    let printed_message = document.createElement("p");

    message_board.append(printed_message)

    localStorage.setItem("message_board", message.value)

    printed_message.innerHTML = message.value + "<br>";

    message.value = "";


})


