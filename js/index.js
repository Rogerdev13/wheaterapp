const select = document.getElementById('select')
const showResult = document.getElementById('result')
const form = document.getElementById('form')
const input  = document.getElementById('input')
const containerErrors  = document.getElementById('error-container')
const errorC = document.getElementById('errorC')
const body  = document.getElementById('body')

document.addEventListener('DOMContentLoaded', ()=>{
    select.value = '';
    body.style.backgroundImage = "url('imgs/backgroundf.jpg')"
    input.value='';
})

function getApi(city){
    const apiId = 'a10f845b986437c1212ce91f6b370fd7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`
    fetch(url)
        .then(data => {return data.json()})
            .then(result =>{
                if(result.cod === '404'){
                    cleanContent(showResult)
                    cleanContent(errorC)
                    showError(result.message)
                    
                }else{
                    cleanContent(showResult)
                    cleanContent(errorC)
                    showWeater(result)
                }
            } 
            )
}
function showWeater(data){
    const {name, main:{temp } , weather:[arr]} = data;
    let degrees = transformTemperature(temp)
    const content = document.createElement('div');
    content.innerHTML = `<div class="header xd" id="result"> 
    <h1 class="title">WHEATER APP</h1>
    <p class="name">Wheater in ${name}</p>
    <div class="header__dates">
        <img  class="result-img" src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt='icon'></img>
        <h4 class="temp">${degrees}  °C</h4></div>
    </div>
    `
    showResult.appendChild(content)
}
const cleanContent = (elem) =>{
    elem.innerHTML = ''
}
const transformTemperature = (d) =>{
    let result  = d - 273.15
    return parseInt(result)
  }
const showError = (errMessage) =>{
    const content = document.createElement('p');
    content.classList.add('errorActive')
    content.innerHTML = errMessage
    errorC.appendChild(content)
}
form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    if(!input.value || select.value === '' ){
        if(errorC.innerText === '' ){
            showError('Fill al the files please')
        }
        return;
    }
    showError('')
    getApi(input.value)
    
})
const handleBackground = (e) =>{
    let country = e.target.value
    if(country === 'ecuador'){
        body.style.backgroundImage  = "url('imgs/backgroundec.jpg')"
    }else if(country === 'mexico'){
        body.style.backgroundImage = "url('imgs/backgroundmx.jpg')"
    }else if(country === 'venezuela'){
        body.style.backgroundImage = "url('imgs/backgroundvz.jpg')"
    }else if(country === 'colombia'){
        body.style.backgroundImage = "url('imgs/backgroundco.jpg')"
    }
}   
select.addEventListener('change' , handleBackground)



