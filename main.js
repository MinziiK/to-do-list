let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let filterList = [];
let list = [];
let mode = 'all';

addButton.addEventListener("click", addTask)

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click", function (event){
        filter(event);
    })
}

/*  그림그리기  */
function render(){      
    // 1. 내가 선택한 탭에 따라서 리스트를 다르게 보여준다.
    let resultHTML = "";
    list = [];

    if(mode === "all"){
        list = taskList;
    }
    else{
        list = filterList;
    }

    for(let i=0;i<list.length;i++){
        if(list[i].isComplete){
            resultHTML += `<div class="task">
                                <div class="task-done">${list[i].taskContent}</div>
                                <div>
                                    <button class="button-style" onclick="toggleComplete('${list[i].id}')">check</button>
                                    <button class="button-style" onclick="deleteTask('${list[i].id}')">delete</button>
                                </div>
                            </div>`;
        }
        else{
            resultHTML += `<div class="task">
                                <div>${list[i].taskContent}</div>
                                <div>
                                    <button class="button-style" onclick="toggleComplete('${list[i].id}')">check</button>
                                    <button class="button-style" onclick="deleteTask('${list[i].id}')">delete</button>
                                </div>
                            </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
    //console.log(list);
}

function randomIdGenerator(){
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function addTask() {
    let taskValue = taskInput.value;
    if (taskValue === "") return alert("할 일을 입력해주세요.");
    let task = {
      taskContent: taskValue,
      isComplete: false,
      id: randomIdGenerator()
    };
    taskList.push(task);
    taskInput.value = "";
    render();
  }

function toggleComplete(id){
    // console.log("id:",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;   // toggle!!
            break;
        }
    }
    filter();
    // console.log(taskList)
}


function deleteTask(id){
    // console.log("delete!!", id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
    // console.log(taskList)
}


function filter(event){

    if(event){
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
      }

    filterList = [];

    if (mode === "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
          if (taskList[i].isComplete == false) {
            filterList.push(taskList[i]);
          }
        }
    }
    else if (mode === "done") {
        for (let i = 0; i < taskList.length; i++) {
          if (taskList[i].isComplete) {
            filterList.push(taskList[i]);
          }
        }
    }
    render();
}

