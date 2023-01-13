const darkMode = document.querySelector('.dark-mode');
const header = document.querySelector('.header');
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

    let  newId=0;

        data.forEach((element) => {
            elWrapper.innerHTML='';
            newId++
            let newTemplate = itemTemplate.cloneNode(true);
            newTemplate.querySelector('.flag-img').src = element.flags.svg;
            newTemplate.querySelector('.flag-img').alt = element.name.common;
            newTemplate.querySelector('.item-title').textContent = element.name.common;
            newTemplate.querySelector('.js-population').textContent = element.population.toLocaleString();
            newTemplate.querySelector('.js-region').textContent = element.region;
            newTemplate.querySelector('.js-capital').textContent = element.capital; 
            newTemplate.querySelector('.js-card').id = newId; 
            newTemplate.querySelector('.js-more-btn').dataset.btnId=newId;
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

elInputSearch.addEventListener('')