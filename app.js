const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffet",
  "Bernard Arnult",
  "Carles Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zacherberg",
  "Micheal Bloomberg",
  "Larry Page",
];

const draggable_list = document.querySelector(".draggable-list");
const check = document.querySelector(".ckeck-btn");
const listItems = [];
let dragStartIndex;
createList();

// ----------creat list-----------

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
    `;
      draggable_list.append(listItem);
      listItems.push(listItem);
      listItem.setAttribute("data-index", index);
    });
  addEventListeners();
}

// ----------drag & drop-----------

function dragStart() {
  dragStartIndex = this.getAttribute("data-index");
}
function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  let dragEndIndex = this.getAttribute("data-index");
  let itemOne = listItems[dragStartIndex].querySelector(".draggable");
  let itemTwo = listItems[dragEndIndex].querySelector(".draggable");
  listItems[dragStartIndex].append(itemTwo);
  listItems[dragEndIndex].append(itemOne);
  this.classList.remove("over");
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragenter", dragEnter);
    draggable.addEventListener("dragleave", dragLeave);
    draggable.addEventListener("dragover", dragOver);
    draggable.addEventListener("drop", dragDrop);
  });
}

// ----------check button-------------

check.addEventListener("click", checkOrder);
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText;

    if (personName === richestPeople[index]) {
      listItem.classList.add("right");
    } else {
      listItem.classList.remove("right");
      listItem.classList.add("wrong");
    }
  });
}
