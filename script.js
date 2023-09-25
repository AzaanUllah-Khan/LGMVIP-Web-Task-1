function addTodo() {
    let prev = localStorage.getItem("todos");
    let todoData = prev ? JSON.parse(prev) : [];
    var name = document.getElementById("todo").value;
    var id = Date.now();
    
    todos = {
        id: id,
        todoText: name,
    }
    if(name != ""){
        todoData.push(todos)
        let stringfy = JSON.stringify(todoData)
        localStorage.setItem("todos", stringfy)
    }
    document.getElementById('todo').value = ""
    show()
}

function deleteTodo(id) {
    let prev = localStorage.getItem("todos");
    let todoData = prev ? JSON.parse(prev) : [];
    let indexToRemove = todoData.findIndex(todo => todo.id === id);
    if (indexToRemove !== -1) {
        todoData.splice(indexToRemove, 1);
        let stringfy = JSON.stringify(todoData);
        localStorage.setItem("todos", stringfy);
        show();
    } else {
        console.log("Todo not found");
    }
}
function show() {
    var storedData = localStorage.getItem("todos");
    var parsedData = JSON.parse(storedData);
    var Todo = document.getElementById("todolist");
    Todo.innerHTML = "";
    if (parsedData && parsedData.length > 0) {
        Todo.style.display = "flex";
        for (let i = 0; i < parsedData.length; i++) {
            Todo.innerHTML += `
            <li>
                <p>${parsedData[i].todoText}</p>
                <div class="buttons">
                    <button onclick="deleteTodo(${parsedData[i].id})"  style="margin-right: 10px;"><i class="fa-solid fa-trash"></i></button>
                    <button onclick="editTodo(${parsedData[i].id})"><i class="fa-solid fa-edit"></i></button>
                </div>
            </li>`;
        }
    }
}


function editTodo(id) {
    let prev = localStorage.getItem("todos");
    let todoData = prev ? JSON.parse(prev) : [];
    let todoToEdit = todoData.find(todo => todo.id === id);
    let newName = prompt("Edit todo:", todoToEdit.todoText);
    if (newName !== null) {
        todoToEdit.todoText = newName;
        let stringfy = JSON.stringify(todoData);
        localStorage.setItem("todos", stringfy);
        show();
    }
}

show();