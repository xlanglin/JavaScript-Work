/*DOM */
const sumbtn = document.querySelector('.end');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const List = document.querySelector('.bmilist');
const remove = document.querySelector('.remove')
let data = JSON.parse(localStorage.getItem('ListData')) || [];

let state = "";


/*計算bmi狀態 */
function Sum(){
    let BMI = weight.value /((height.value/100)^2);
    let el ="";
    if(BMI <=24 && BMI>18){
        el ="理想";
    }
    else if(BMI<18){
        el ="過輕";
    }
    else{
        el ="過重";
    }
    state = el;    
}



/*資料庫 */
function addData(e){
    let BMI = weight.value /((height.value/100)^2);
    e.preventDefault();
    Sum()
    let todo ={
        myStatus : state, 
        myBMI : BMI,
        myhei : height.value,
        mywei : weight.value,
    }
    data.push(todo);
    updateList(data);
    localStorage.setItem('ListData',JSON.stringify(data));
    
}



sumbtn.addEventListener('click',addData)

/*更新 */
function updateList(list){
    let str = "";
    let len = list.length;
    for(let i=0 ; i<len ; i++){
        str+=`
        <li>
            <h3>${list[i].myStatus}</h3>
            <div>BMI ${list[i].myBMI}</div>
            <div>weight${list[i].mywei}</div>
            <div>height${list[i].myhei}</div>
            <div>06-19-2017</div>
        </li>
        `
    }
    List.innerHTML= str;
    
}


/*刪除*/
function deleteList(e){
    e.preventDefault();
    data.splice(0);
    localStorage.setItem("ListData",JSON.stringify(data))
    updateList(data)
}
remove.addEventListener('click',deleteList)


