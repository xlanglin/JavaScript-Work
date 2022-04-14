/*DOM */
const countrylen = country.length
const areaSelect = document.getElementById('area')
const contentList = document.querySelector('.contentarea')
let btn = document.querySelector('.topbtn')

/*動態加入選項*/

let area =[];
for (let i=0; i<countrylen ; i++){
    area.push(country[i].Zone);
}

let areaList=[];
area.forEach(function(value){
    if(areaList.indexOf(value) == -1){
        areaList.push(value)};
});

function Select(){   
    for (let i=0; i<areaList.length ;i++){
        let str = document.createElement('option');
        str.setAttribute('value',areaList[i]);
        str.textContent = areaList[i];
        areaSelect.appendChild(str)
    }
}
Select()

/* 標題&內容變更 */
function AreaChange(e){
e.preventDefault();
let el =e.target.value;
let str = document.querySelector('.areaname');
str.textContent = el;
let strl = "";

for( let i=0 ;i<countrylen ;i++){

    if(el == country[i].Zone){
    strl += `
    <li>
    <div role="img" class="contentimg">
            <img src="${country[i].Picture1}" alt="">
            <div class="contenttitle">
            <h4>${country[i].Name}</h4>
            <p>${country[i].Zone}</p>
            </div>
    </div>
    <p><img src="assets/icons_clock.png" alt="">${country[i].Opentime}</p>
    <p><img src="assets/icons_pin.png" alt="">${country[i].Add}</p>
    <div class="contentphone">
     <p><img src="assets/icons_phone.png" alt="">${country[i].Tel}</p>
     <span><img src="assets/icons_tag.png" alt="">${country[i].Ticketinfo}</span>
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
    for( let i=0 ;i<countrylen ;i++){
        if(el == country[i].Zone){
        strl += `
        <li>
        <div role="img" class="contentimg">
                <img src="${country[i].Picture1}" alt="">
                <div class="contenttitle">
                <h4>${country[i].Name}</h4>
                <p>${country[i].Zone}</p>
                </div>
        </div>
        <p><img src="assets/icons_clock.png" alt="">${country[i].Opentime}</p>
        <p><img src="assets/icons_pin.png" alt="">${country[i].Add}</p>
        <div class="contentphone">
         <p><img src="assets/icons_phone.png" alt="">${country[i].Tel}</p>
         <span><img src="assets/icons_tag.png" alt="">${country[i].Ticketinfo}</span>
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
