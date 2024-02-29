document.getElementById('new-task-button').addEventListener('click', function() {
    var newTask = document.getElementById('new-task-input').value;
    if (newTask) {
      var taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.innerHTML = '<input type="checkbox" class="task-checkbox" />' + '<span class="task-name">' + newTask + '</span>';
      document.getElementById('task-list').appendChild(taskItem);
      document.getElementById('new-task-input').value = '';
    }
  });
  
  document.getElementById('task-list').addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
      e.target.parentElement.classList.toggle('task-done');
    }
  });
