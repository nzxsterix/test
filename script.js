document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://localhost:3000/todos';

    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task');


    function fetchTasks(){
        fetch(API_URL)
           .then(res => res.json())
           .then(data => {

                taskList.innerHTML = '';
                data.forEach(task => {
                    const li = document.createElement('li');


                    const span = document.createElement('span');
                    span.textContent = task.title;
                    if (task.completed) span.classList.add('done');

                    const toggleBtn = document.createElement('button');
                    toggleBtn.textContent = 'Done';
                    toggleBtn.classList.add('toggle');
                    toggleBtn.onclick = () => toggleComplete(task);
                    
                    
                    span.onclick = () => toggleComplete(task);

                    const editBtn = document.createElement('button');
                    editBtn.classList.add('edit');
                    editBtn.textContent = 'edit';
                    editBtn.onclick = () => editTask(task); 

                    const deleteBtn = document.createElement('button');
                    deleteBtn.classList.add('delete');
                    deleteBtn.textContent = 'delete';
                    deleteBtn.onclick = () => deleteTask(task.id); 

                    const btnGroup = document.createElement('div');
                    btnGroup.append(editBtn, toggleBtn, deleteBtn);

                    li.append(span, btnGroup);
                    taskList.appendChild(li);
                });

                console.log(data);

           })
           .catch(error => console.error('Error fetching tasks:', error));
    }

    addTaskBtn.addEventListener('click', () =>{

        const title = newTaskInput.value.trim();

        if(title){

            fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title, completed: false}) 
            }).then (() =>{
                newTaskInput.value = '';
                fetchTasks();
            }).catch(error => console.error('Error adding task:', error));
        }
    });

    function editTask(task){

        const nuovoTitolo = prompt('Modifica il task :', task.title);

        if(nuovoTitolo !== null && nuovoTitolo.trim() !== ''){

            fetch(`${API_URL}/${task.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...task, title: nuovoTitolo.trim()})
            })
            .then(fetchTasks) 
            .catch(error => console.error('Error editing task:', error));
        }
    }

    function deleteTask(id){
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(fetchTasks)
        .catch(error => console.error('Error deleting task:', error));
    };

    function toggleComplete(task) {
        fetch(`${API_URL}/${task.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...task, completed: !task.completed})
        })
        .then(fetchTasks)
        .catch(error => console.error('Error toggling task:', error));
    }

    function toggleComplete(task){

        fetch(`${API_URL}/${task.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...task, completed: !task.completed})
            })
            .then() 
            

    }



    fetchTasks();
});