var todoButtons = {
  todos: [],
  addTodo: function() {
    // When Enter is pressed, new todo is made
    if (event.keyCode === 13) {
      var addTodoTextInput = document.getElementById('addTodoTextInput');
      this.todos.push({
      todoText: addTodoTextInput.value,
      completed: false
    });
      // Reseting value after user input
      addTodoTextInput.value = '';
      todoView.displayTodos();
    }
  },
  changeTodo: function(position, newTodoText) {
		this.todos[position].todoText = newTodoText;
		todoView.displayTodos();
	},
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    todoView.displayTodos();
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    todoView.displayTodos();
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Checks for a number of completed todos
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      // If all todos are true, they will be changed to false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      }
      // Otherwise, they will be changed to true
      else {
        todo.completed = true;
      }
    });
    todoView.displayTodos();
  },
  deleteAll: function() {
    this.todos.splice(0, this.todos.length);
    todoView.displayTodos();
  }
};

// Function for displaying todos on the webpage
var todoView = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoButtons.todos.forEach(function(todo, position) {
      // Creating li element for every new todo
      var todoLi = document.createElement('li');
      todoLi.id = position;
      // Creating input element for every new todo
      var todoLiText = document.createElement('input');
      todoLiText.type = "text";
      todoLiText.disabled = true;
      todoLiText.id = 'editTodoInput';
      todoLiText.value = todo.todoText;
      
      if (todo.completed === true) {
        todoLi.style.textDecoration = "line-through";
        todoLi.style.opacity = "0.4";
        todoLi.textContent = todoButtons.todoText;
      }
      else {
        todoLi.textContent = todoButtons.todoText;
      }
      // Adding buttons and input to the li element
      todoLi.appendChild(todoView.createDeleteButton());
      todoLi.appendChild(todoView.createToggleButton());
      todoLi.appendChild(todoView.createEditButton());
      todoLi.appendChild(todoLiText);
      // Adding li element to the unordered list
      todosUl.appendChild(todoLi);
    });
  },
  // Method for creating Delete button for each todo
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  // Method for creating Toggle button for each todo
  createToggleButton: function() {
    var toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle';
    toggleButton.className = 'toggleButton';
    return toggleButton;
  },
  // Method for creating Edit button for each todo
  createEditButton: function() {
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    return editButton;
  },
  // Event listeners for the Delete, Edit and Toggle buttons
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var position = event.target.parentNode.id;
      var elementClicked = event.target.className;
      
      if (elementClicked === 'deleteButton') {
        // Path to the ID of each created todo
        todoButtons.deleteTodo(parseInt(position));
      }
    });
    todosUl.addEventListener('click', function(event) {
      var position = event.target.parentNode.id;
      var elementClicked = event.target.className;
      
      if (elementClicked === 'toggleButton') {
        todoButtons.toggleCompleted(parseInt(position));
      }
    });
    todosUl.addEventListener('click', function(event) {
			var position = event.target.parentNode.id;
      var elementClicked = event.target.className;
      
			if (elementClicked === 'editButton') {
				var input = document.getElementById(position).querySelector('Input');
				input.disabled = false;
				input.className = "activeTextInput";
        input.focus();
        input.select();
        
        // Saving edited todo when Enter is pressed
        input.addEventListener('keypress', function(event) {
					if(event.keyCode === 13) {
						var textInput = input.value;
						input.disabled = true;
						todoButtons.changeTodo(position, textInput);
					}
				});
			}
		});
  }
};
// Starting event listeners when the app starts
todoView.setUpEventListeners();