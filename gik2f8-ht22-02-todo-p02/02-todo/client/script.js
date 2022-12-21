
todoForm.title.addEventListener('keyup', (e) => validateField(e.target));
todoForm.title.addEventListener('blur', (e) => validateField(e.target));

todoForm.description.addEventListener('input', (e) => validateField(e.target));
todoForm.description.addEventListener('blur', (e) => validateField(e.target));

todoForm.dueDate.addEventListener('input', (e) => validateField(e.target));
todoForm.dueDate.addEventListener('blur', (e) => validateField(e.target));

todoForm.addEventListener('submit', onSubmit);

const todoListElement = document.getElementById('todoList');

let titleValid = true;
let descriptionValid = true;
let dueDateValid = true;

const api = new Api('http://localhost:5000/tasks');

function validateField(field) {
  const { name, value } = field;
  let = validationMessage = '';
  switch (name) {
    case 'title': {
      if (value.length < 2) {
        titleValid = false;
        validationMessage = "Fältet 'Titel' måste innehålla minst 2 tecken.";
      } else if (value.length > 100) {
        titleValid = false;
        validationMessage =
          "Fältet 'Titel' får inte innehålla mer än 100 tecken.";
      } else {
        titleValid = true;
      }
      break;
    }

    case 'description': {
      if (value.length > 500) {
        descriptionValid = false;
        validationMessage =
          "Fältet 'Beskrvining' får inte innehålla mer än 500 tecken.";
      } else {
        descriptionValid = true;
      }
      break;
    }
    
    case 'dueDate': {
      if (value.length === 0) {
        dueDateValid = false;
        validationMessage = "Fältet 'Slutförd senast' är obligatorisk.";
      } else {
        dueDateValid = true;
      }
      break;
    }
  }
  

   field.previousElementSibling.innerText = validationMessage;
   field.previousElementSibling.classList.remove('hidden');
}

function onSubmit(e) {
  e.preventDefault();
  if (titleValid && descriptionValid && dueDateValid) {
    console.log('Submit');
    saveTask();
  }
}

function saveTask() {
  const task = {
    title: todoForm.title.value,
    description: todoForm.description.value,
    dueDate: todoForm.dueDate.value,
    completed: false
  };
  
  api.create(task).then((task) => {
   if (task) {
      renderList();
    }
  });
}

function renderList() {
  console.log('rendering');
  api.getAll().then((tasks) => {   
    todoListElement.innerHTML = '';

    if (tasks && tasks.length > 0) {

      let taskComp = tasks.filter((task) => task.completed == true);
      let taskNotComp = tasks.filter((task) => task.completed == false);

      taskComp.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      console.log(taskComp);
      taskNotComp.sort((a, b) => new Date(a.dueDate) - new Date( b.dueDate));
      console.log(taskNotComp);

      let sortList = [...taskNotComp,...taskComp]
      
      sortList.forEach((task) => {
        
        
        todoListElement.insertAdjacentHTML('beforeend', renderTask(task));
      });
    }
  });
}


function renderTask({ id, title, description, dueDate, completed }) {
  let html = `
    <li class="select-none mt-2 py-2 border-b border-amber-300">
      <div class="flex items-center">
      <input id="default-checkbox" type="checkbox" value="" onclick="check(event, ${id})" class="w-4 h-4 text-blue-600 bg-gray-100 
      rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
      dark:bg-gray-700 dark:border-gray-600" `; 
      completed && (html += `checked`);
      html +=`>
        <h3 class="mb-3 flex-1 text-xl font-bold text-pink-800 uppercase">${title}</h3>
        <div>
          <span>${dueDate}</span>
          <button onclick="deleteTask(${id})" class="inline-block bg-amber-500 text-xs text-amber-900 border border-white px-3 py-1 rounded-md ml-2">Ta bort</button>
        </div>
      </div>`;

  
  description &&
    (html += `
      <p class="ml-8 mt-2 text-xs italic">${description}</p>
  `);

  html += `
    </li>`;
  return html;
}


function check(e, id) {
  const comp = e.target.checked
  const data = {
    completed: comp
  };
  api.update(id, data).then(data => renderList()); 
}

function deleteTask(id) {
  api.remove(id).then((result) => {
    renderList();
    });
}

renderList();
