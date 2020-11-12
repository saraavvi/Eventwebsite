document.addEventListener("DOMContentLoaded", function (e) {
  let button = document.getElementById("button");
  if (button) {
    button.addEventListener("click", function (e) {
      let username = document.getElementById("username").value;
      localStorage.setItem("username", username);
      let password = document.getElementById("password").value;
      localStorage.setItem("password", password);
      console.log(localStorage);
      window.location.assign("index.html");
    });
  }

  class LogIn {
    //作り方？
    //Constructor is a function that runs when creating the object.
    constructor() {
      //材料？ボックスを作る。
      // Set variables for object.
      this.question = document.getElementById("question");
      this.choices = Array.from(document.getElementsByClassName("choice-text"));
      this.questionCounterText = document.getElementById("questionCounter");
      //ユーザーネームのインプットボックスを作り、IDの空欄部分の要素を得る。
      //Create an variable for the user name input element
      this.usernameText = document.getElementById("UsernameInpt");
      //ローカルストレージからインプットされたユーザー名をHTML内に表示する。
      //Display the user name input taken from the local storage in HTML.
      this.usernameText.innerText = localStorage.getItem("username");
    }
  }

  if (document.getElementById("UsernameInpt")) {
    let login = new LogIn();
  }
});
