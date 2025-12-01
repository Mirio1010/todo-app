let form = document.querySelector("form");
let item = form.firstElementChild;
let list = document.querySelector(".todoList");
let clear = document.querySelector(".clearBtn");

// 1) Load existing items from localStorage (or use empty array)
let arr = JSON.parse(localStorage.getItem("todoList")) || [];

// 2) On page load, render all existing items
arr.forEach(function (text) {
  createElement(text);
});

// Clear all button
clear.addEventListener("click", function () {
  localStorage.clear();
  arr = []; // clear the in-memory array too
  list.innerHTML = ""; // clear the <ul>
});

// Form submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let value = item.value.trim();
  if (!value) return; // ignore empty input

  arr.push(value);
  localStorage.setItem("todoList", JSON.stringify(arr));

  createElement(value);
  item.value = ""; // clear input box

  console.log("submitted!");
});

// 3) createElement now takes the text to show
function createElement(text) {
  let listItem = document.createElement("li");
  listItem.textContent = text;
  let btn = document.createElement('button');
  btn.textContent = 'delete'
  btn.classList.add("delete");
  listItem.append(btn)

  btn.addEventListener('click', function() {
      btn.parentElement.remove()
      arr.splice(arr.indexOf(text), 1);

      arr2 = JSON.parse(localStorage.getItem("todoList"));
      arr2.splice(arr2.indexOf(text), 1);
      
      localStorage.setItem('todoList', JSON.stringify(arr2));

  })
  list.append(listItem);
}

