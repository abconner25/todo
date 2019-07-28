$(function() {
    
    //makes a <li> tag for each task in db
    function taskHtml(task) {
        var check = task.done ? 'checked' : '';
        var liElement = '<li><div class="view"><input class="toggle" type="checkbox"' +
        " data-id='" + task.id + "'" +
        check +
        '><label>' +
         task.title +
         '</label></div></li>';
        return liElement;
    }
    
    //updates a task's completion status to db
    function toggleTask(e) {
      var itemId = $(e.target).data("id");

      var doneValue = Boolean($(e.target).is(':checked'));

      $.post("/tasks/" + itemId,  {
        _method: "PUT",
        task: {
          done: doneValue
        }
      });
    }
    $.get("/tasks").success(function(data) {

      var htmlString = '';
      $.each(data, function(index, task){

        htmlString += taskHtml(task);
      });
      var ulTodos = $('.todo-list');
      ulTodos.html(htmlString);
      
      $('.toggle').change(toggleTask);
    });

    $('#new-form').submit(function(event) {
      event.preventDefault();
      var textbox = $('.new-todo');
      var payload = {
        task: {
          title: textbox.val()
        }
      };
      $.post('/tasks', payload).success(function(data) {
        var htmlString = taskHtml(data);
        var ulTodos = $('.todo-list');
        ulTodos.append(htmlString);
        $('.toggle').click(toggleTask);
        $('.new-todo').val('');
      });
    });
  });