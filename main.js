// 유저가 값을 입력한다
// +버튼을 클릭하면 할 일이 추가된다
// 유저가 delete버튼 누르면 할 일이 삭제된다
// check버튼을 누르면 할 일이 완료되며 취소선
// 1) check버튼 클릭하면 false -> true
// 2) true이면 끝난걸로 간주하고 밑줄
// 3) false이면 안끝난걸로 알고 그대로

// NOT DONE, DONE 탭을 누르면 언더바가 이동한다
// Done 탭은 끝난 아이템만, NOT DONE 탭은 진행중인 아이템만 나온다
// ALL 탭을 누르면 다시 전체 아이템 표시

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let filterList = [];
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
    let list = [];

    if(mode === "all"){
        list = taskList;
    }
    else{
        list = filterList;
    }

    let resultHTML = "";

    for(let i=0;i<list.length;i++){
        if(list[i].isComplete){
            resultHTML += `<div class="task">
                                <div class="task-done">${list[i].taskContent}</div>
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')">check</button>
                                    <button onclick="deleteTask('${list[i].id}')">delete</button>
                                </div>
                            </div>`;
        }
        else{
            resultHTML += `<div class="task">
                                <div>${list[i].taskContent}</div>
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')">check</button>
                                    <button onclick="deleteTask('${list[i].id}')">delete</button>
                                </div>
                            </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}


function randomIdGenerator(){
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  // return ('_' + Math.random().toString(36).substr(2, 9)).toUpperCase();
}


function addTask(){
    let task = {
        id: randomIdGenerator(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    render();
    // console.log(taskList);
}


function toggleComplete(id){
    // console.log("id:",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
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
    render();
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

    if(mode === "all"){
        // 전체 리스트 보여주기
        render();
    }
    else if(mode === "ongoing"){
        // 진행 중인 리스트 보여주기
        // task.isComplete = false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    else if(mode === "done"){
        // 완료된 리스트 보여주기
        // task.isComplete = true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

