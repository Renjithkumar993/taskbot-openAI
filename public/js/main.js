
var today = dayjs().format('dddd, MMMM D YYYY');

var currentDay = $("#currentDay");

currentDay.text(today);

$(document).on("click", ".addTasks ", async function(event)  {
  event.preventDefault();
  
  const taskData = {
    name: $('#task-name').val(),
    priority: $('#task-priority').val(),
    dueDate: $('#task-due').val(),
    description: $('#task-details').val()
  };

  try {
    const response = await fetch('/home/newtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskData })
    });
    if (response.ok) {
      window.location.href = `${window.location.pathname}`;
    }
  } catch (error) {
    console.error(error);
  }
});


$(document).on("click", ".editTasks ", async function(event)  {
  event.preventDefault();
  const editId = $(this).attr("id");

  const taskData = {
    name: $('#task-nameedit').val(),
    priority: $('#task-priorityedit').val(),
    dueDate: $('#task-dueedit').val(),
    description: $('#task-detailsedit').val(),
  };

  try {
    const response = await fetch(`/home/edittask/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskData })
    });
    if (response.ok) {
      window.location.href = `${window.location.pathname}`;
    }
  } catch (error) {
    console.error(error);
  }
});










$(".suggestions").on("click", async function(e) {
  e.preventDefault();
  $(".loadingSpinners").removeClass("d-none");
  const suggestId = $(this).attr("id");

  try {
    const response = await fetch(`/api/summarize/${suggestId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      responseData = await response.json();
      var dataList = responseData.split("\n");
      $(".loadingSpinners").addClass("d-none");

      var list = $("<ul>").addClass("list-group");

      dataList.forEach((item) => {
        item = item.trim();
        if (item !== "") {
          var randomColor = getRandomColor();
          var listItem = $("<li>").addClass(`list-group-item ${randomColor}`).text(item);
          list.append(listItem);
        }
      });

      $("#listContainer").append(list);
    }
  } catch (error) {
    console.error(error);
  }
});
var currentIndex = 0;

function getRandomColor() {
  var bootstrapColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', ];
  var colorClass = 'bg-' + bootstrapColors[currentIndex];
  
  currentIndex = (currentIndex + 1) % bootstrapColors.length; 
  
  return colorClass;
}





$(".remove-task").on("click", async function(e) {
e.preventDefault();
deleteId =  $(this).attr("id");
const deleteResponse = await fetch(`/home/deletetask/${deleteId}`, {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
});
if (deleteResponse.ok) {
  window.location.href = `${window.location.pathname}`;
} else {
  throw new Error("Request failed");
}

})





$(".completeTask").on("click", async function(e) {
  e.preventDefault();

  const completedTaskId = $(this).attr("id");

  try {
    const response = await fetch("/home/complete-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId: completedTaskId }),
    });

    if (response.ok) {
      window.location.href = `${window.location.pathname}`;
    } else {
      console.log("Failed to complete task.");
    }
  } catch (error) {
    console.log("Error:", error);
  }
});
