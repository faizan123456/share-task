Muhammad Faizan Abid

Create Task
url : http://localhost:5000/task
method : POST
body : {
"title":"Test task",
"status":"done",
"assignedTo":"23/06/2023"
"assignedFrom":"23/06/2023"
}

Get Task
url : http://localhost:5000/tasks
method : GET

Get Task By Id
url : http://localhost:5000/task/649835bb6dad7924d175e90f
method : GET

nest g module users
nest g service users
nest g controller users
