// 유저가 값을 입력한다
// +버튼을 클릭하면 할 일이 추가된다
// 유저가 delete버튼 누르면 할 일이 삭제된다
// check버튼을 누르면 할 일이 완료되며 취소선
// NOT DONE, DONE 탭을 누르면 언더바가 이동한다
// Done 탭은 끝난 아이템만, NOT DONE 탭은 진행중인 아이템만 나온다
// ALL 탭을 누르면 다시 전체 아이템 표시

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

function addTask(){
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    render();
}

function render(){
    let resultHTML = "";

    for(let i=0;i<taskList.length;i++){
        resultHTML += `<div class="task">
            <div>${taskList[i]}</div>
            <div>
                <button>check</button>
                <button>delete</button>
            </div>
        </div>`;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}


addButton.addEventListener("click", addTask)