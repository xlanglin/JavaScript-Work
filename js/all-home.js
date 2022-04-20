/*DOM */
const areaSelect = document.getElementById('area')
const contentList = document.querySelector('.contentarea')
let btn = document.querySelector('.topbtn')
let dataArea = [];
let dataLen = dataArea.length;


/*ajax */
function getData(){
   fetch('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',{method:'get'})
    .then(function(response){
        return response.json()
    }).then(function(mydata){
        dataArea = mydata.result.records
        addOption(dataArea)
    })
    .catch(function(err){
        console.log(err)
    })
    
}


getData()
/*動態加入選項*/

function addOption(data){
    let area = [];
    for(let i=0; i< data.length ; i++){
        area.push(data[i].Zone)
    }

    let areaList=[];
    area.forEach(function(value){
        if(areaList.indexOf(value) == -1){
            areaList.push(value)};
    })
    for (let i=0; i<areaList.length ;i++){
        let str = document.createElement('option');
        str.setAttribute('value',areaList[i]);
        str.textContent = areaList[i];
        areaSelect.appendChild(str)
    }
}


/* 標題&內容變更 */
function AreaChange(e){
    e.preventDefault();
    let el =e.target.value;
    let str = document.querySelector('.areaname');
    str.textContent = el;
    let strl = "";
    for( let i=0 ;i<dataArea.length ;i++){
        if(el == dataArea[i].Zone){
            strl += `<li>
                    <div role="img" class="contentimg">
                    <img src="${dataArea[i].Picture1}" alt="">
                        <div class="contenttitle">
                            <h4>${dataArea[i].Name}</h4>
                            <p>${dataArea[i].Zone}</p>
                        </div>
                    </div>
                    <p><img src="assets/icons_clock.png" alt="">${dataArea[i].Opentime}</p>
                    <p><img src="assets/icons_pin.png" alt="">${dataArea[i].Add}</p>
                    <div class="contentphone">
                        <p><img src="assets/icons_phone.png" alt="">${dataArea[i].Tel}</p>
                        <span><img src="assets/icons_tag.png" alt="">${dataArea[i].Ticketinfo}</span>
                    </div>
                    </li>
                    `
    }   
}
contentList.innerHTML =strl;
}
areaSelect.addEventListener('change',AreaChange);

/*向上滾動按鈕*/

function toTop(e){
    e.preventDefault();
    let time =null;
    cancelAnimationFrame(time);
    time = requestAnimationFrame(function fn(){
        let goTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(goTop > 0){
            scrollTo(0,goTop-10);
            time = requestAnimationFrame(fn);
        } else{
            cancelAnimationFrame(time);
        };
});
};
btn.addEventListener('click',toTop)


/*熱門行政區 */
let hotBtn = document.querySelectorAll('.hotbtn');

function hotchange(e){
    e.preventDefault();
    let el =e.target.textContent;
    let str = document.querySelector('.areaname');
    let strl ="";
    str.textContent = el;
    for( let i=0 ;i<dataArea.length ;i++){
        if(el == dataArea[i].Zone){
        strl += `
        <li>
        <div role="img" class="contentimg">
                <img src="${dataArea[i].Picture1}" alt="">
                <div class="contenttitle">
                <h4>${dataArea[i].Name}</h4>
                <p>${dataArea[i].Zone}</p>
                </div>
        </div>
        <p><img src="assets/icons_clock.png" alt="">${dataArea[i].Opentime}</p>
        <p><img src="assets/icons_pin.png" alt="">${dataArea[i].Add}</p>
        <div class="contentphone">
         <p><img src="assets/icons_phone.png" alt="">${dataArea[i].Tel}</p>
         <span><img src="assets/icons_tag.png" alt="">${dataArea[i].Ticketinfo}</span>
        </div>
        </li>
        `
        } 
    contentList.innerHTML =strl;
}
}
for (let i=0 ;i<hotBtn.length ; i++){
    hotBtn[i].addEventListener('click',hotchange);
}
