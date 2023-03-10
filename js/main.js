const darkMode = document.querySelector('.dark-mode');
const itemTemplate = document.querySelector('.template').content;
const elWrapper = document.querySelector('.js-wrapper');
const elSelect =document.querySelector('.select');
const elInputSearch = document.querySelector('.js-search');

const countriesAll = "https://restcountries.com/v3.1/all";
const fragment = document.createDocumentFragment();

// theme dark-mode

let theme=false;

darkMode.addEventListener('click', (evt)=>{
    theme = !theme;
    const bg = theme ? 'dark' : 'light';
    window.localStorage.setItem('theme', bg);
    changeTheme()
})

function changeTheme(){
   if(window.localStorage.getItem('theme')==='dark'){
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    darkMode.innerHTML=`<i class="bi bi-sun"></i> Light`;
   }else{
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    darkMode.innerHTML=`<i class="bi bi-moon"></i> Dark`;
   }
}

changeTheme();

// =========================


async function countriesRender(url){
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);
    
    
    data.forEach((element) => {

        elWrapper.innerHTML='';

        let newTemplate = itemTemplate.cloneNode(true);
        newTemplate.querySelector('.flag-img').src = element.flags.svg;
        newTemplate.querySelector('.flag-img').alt = element.name.common;
        newTemplate.querySelector('.item-title').textContent = element.name.common;
        newTemplate.querySelector('.js-population').textContent = element.population.toLocaleString();
        newTemplate.querySelector('.js-region').textContent = element.region;
        newTemplate.querySelector('.js-capital').textContent = element.capital; 
        newTemplate.querySelector('.js-card').id = element.capital; 
        newTemplate.querySelector('.js-more-btn').dataset.btnId=element.capital;
        fragment.appendChild(newTemplate);

    });

    elWrapper.appendChild(fragment)
    }
    
    
    countriesRender(countriesAll);

// sort
elSelect.addEventListener('change', (evt=>{
    if(elSelect.value == "All region"){
        countriesRender(countriesAll);
    }
    else if(elSelect.value){
        countriesRender("https://restcountries.com/v3.1/region/"+elSelect.value);
    }
    
}))    

// search

elInputSearch.addEventListener('input', (evt)=>{
    if(elInputSearch.value != ''){
        countriesRender("https://restcountries.com/v3.1/name/"+elInputSearch.value);
    }
    else if(elInputSearch.value == ''){
        countriesRender(countriesAll);
    }
})

// more info

const elModal = document.querySelector('.modal-wrapper');
const elModalWrapper = document.querySelector('.countries-modal');
const elModalTitle = document.querySelector('.modal-title');
const elModalImg = document.querySelector('.modal-img');
const region = document.querySelector('.js-modal-region');
const subregion = document.querySelector('.js-modal-subregion');
const capital= document.querySelector('.js-modal-capital');
const population = document.querySelector('.js-modal-population');
const language = document.querySelector('.js-modal-lang');
const time = document.querySelector('.js-modal-time');
const map = document.querySelector('.btn-map');
const closeBtn = document.querySelector('.modal-btn');


async function modalRender(url){
    const response = await fetch(url);
    const data = await response.json();
    
    let times = new Date();
    let hours = times.getUTCHours();
    let minutes = times.getMinutes();
   

    data.forEach((item) => {
        
        elModalTitle.textContent = item.name.common;
        elModalImg.src = item.flags.svg;
        region.textContent = item.region;
        subregion.textContent = item.subregion;
        capital.textContent = item.capital;
        population.textContent = item.population.toLocaleString();
        language.textContent = `${Object.values(item.languages)}`;


        
        
        if(item.timezones.length > 1){
            let timesHours = +(item.timezones[1].toString().split('UTC')[1].split(":00")[0]);
            let newhours = hours+Math.trunc(timesHours);
            if(newhours<0){
                newhours = 24+newhours;
                if(newhours < 10  && minutes < 10){
                    newhours = "0"+newhours;
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                } 
                else if(newhours < 10  && minutes >= 10){
                    newhours = "0"+newhours;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes < 10){
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes >= 10){
                    time.textContent = (newhours+":"+minutes);
                }
            }
            else{
                if(newhours < 10  && minutes < 10){
                    newhours = "0"+newhours;
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                } 
                else if(newhours < 10  && minutes >= 10){
                    newhours = "0"+newhours;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes < 10){
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes >= 10){
                    time.textContent = (newhours+":"+minutes);
                }
            }
            

        }else if(item.timezones.length > 2){
            let timesHours = +(item.timezones[2].toString().split('UTC')[1].split(":00")[0]);
            let newhours = hours+Math.trunc(timesHours);
            if(newhours<0){
                newhours = 24+newhours;
                if(newhours < 10  && minutes < 10){
                    newhours = "0"+newhours;
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                } 
                else if(newhours < 10  && minutes >= 10){
                    newhours = "0"+newhours;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes < 10){
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes >= 10){
                    time.textContent = (newhours+":"+minutes);
                }
            }
            else{
                if(newhours < 10  && minutes < 10){
                    newhours = "0"+newhours;
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                } 
                else if(newhours < 10  && minutes >= 10){
                    newhours = "0"+newhours;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes < 10){
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes >= 10){
                    time.textContent = (newhours+":"+minutes);
                }
            }
            
        }else if(item.timezones.length = 1){
            let timesHours = +(item.timezones.toString().split('UTC')[1].split(":00")[0]);
            let newhours = hours+Math.trunc(timesHours);
            if(newhours<0){
                newhours = 24+newhours;
                if(newhours < 10  && minutes < 10){
                    newhours = "0"+newhours;
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                } 
                else if(newhours < 10  && minutes >= 10){
                    newhours = "0"+newhours;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes < 10){
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes >= 10){
                    time.textContent = (newhours+":"+minutes);
                }
            }else{
                if(newhours < 10  && minutes < 10){
                    newhours = "0"+newhours;
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                } 
                else if(newhours < 10  && minutes >= 10){
                    newhours = "0"+newhours;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes < 10){
                    minutes = "0" + minutes;
                    time.textContent = (newhours+":"+minutes);
                }
                else if(newhours >= 10  && minutes >= 10){
                    time.textContent = (newhours+":"+minutes);
                }
            }
            
        }
    
        map.href = item.maps.googleMaps;
    });
    }
    

elWrapper.addEventListener('click', (evt)=>{
    if(evt.target.matches('.js-more-btn')){
        if(evt.target.dataset.btnId == evt.target.parentNode.id){
            elModal.classList.remove('d-none');
            elModal.classList.add('d-block');

           let capital = evt.target.dataset.btnId;

           modalRender("https://restcountries.com/v3.1/capital/"+capital)
        }

    };
})

closeBtn.addEventListener('click', (evt)=>{
    elModal.classList.remove('d-block');
    elModal.classList.add('d-none');
})
