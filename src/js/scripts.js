function myFunction(id) {
    let dots = document.getElementById(`dots${id}`);
    let moreText = document.getElementById(`more${id}`);
    let btnText = document.getElementById(`myBtn${id}`);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

let searchInput = document.querySelector('#search')
let futureScrollPosition = null
searchInput.addEventListener('change',function(e){
    let search = e.target.value;
    let cards = document.querySelectorAll('div.card-article-infos')
    cards.forEach(card=>{
        let innerText = card.innerHTML
        let index = innerText.indexOf(search)
        if(index>=0){
            if (futureScrollPosition===null){
                futureScrollPosition = card.getBoundingClientRect()
            }
            innerText = innerText.substring(0,index) + "<span style='background-color:yellow'>" + innerText.substring(index,index+search.length) + "</span>" + innerText.substring(index+search.length)
            card.innerHTML = innerText
            card.querySelector('div>button').click()
        }
    })
})

searchInput.addEventListener('keyup',function(e){
    if(e.keyCode === 13){
        e.preventDefault()
        this.blur()
        window.scrollTo(0, futureScrollPosition.y)
        console.log('ok')
    }
});

//immidiatelly invocated function expression (IIFE)
(()=>{
    let imgs = ['coffee1.jpg', 'coffee2.jpg','coffee3.jpg'];

    let randomImg = Math.floor(Math.random() * imgs.length)//0//1//2

    document.querySelector('.jumbotron').style.backgroundImage = `url("img/${imgs[randomImg]}")`

})()

function generateArticle(year,k){
    let article = `
        <div class="card-article mb-2">
            <img src="img/kbh.jpg">
            <div class="card-article-infos">
                <h4>Wonderful Copenhagen ${year}</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, et dictum interdum, nisi lorem
                egestas vitae scel<span id="dots${k}">...</span><span id="more${k}"  style='display:none'>I hope I get the internsip. Maecenas nisl est,
                    ultrices nec congue eget, auctor vitae massa.Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
                    porta.</span></p>
                <div class="d-flex">
                <button onclick="myFunction(${k})" id="myBtn${k}">Read more</button>
                </div>
            </div>
        </div>
    `
    return article
}
let articles = Array(15).fill(1).map((i,k)=>generateArticle('200'+k,k))
//console.log(articles)

let articlesPerPage = 3;
let pages = []
while (articles.length){
    pages.push(articles.splice(0, articlesPerPage))
}
console.log(pages)

let pagesDom = document.querySelector('#pages')
let pointer = document.createElement('li')
pointer.className = "page-item disabled"
let text = document.createElement('div')
text.className = "page-link"
pagesDom.appendChild(pointer)
pointer.appendChild(text)
text.innerText = `1 of ${pages.length}`

document.querySelector('#articles').innerHTML = pages[0].join('\n')
let active = 0
pages.forEach((page,k)=>{
    let li = document.createElement('li')
    li.className = "page-item"
    let div = document.createElement('div')
    div.className = "page-link"
    div.innerText =  k + 1;
    li.onclick = function () {
        document.querySelector('#articles').innerHTML = page.join('\n')
        text.innerText = `${k+1} of ${pages.length}`
        active = k
    }
    li.appendChild(div)
    pagesDom.appendChild(li)
    
})

let next = document.createElement('li')
next.className = "page-item disabled"
let div = document.createElement('div')
div.innerText = 'next'
div.className = "page-link"
pagesDom.appendChild(next)
next.appendChild(div)

next.onclick = function(){
    if(active<pages.length-1){
        text.innerText = `${++active +1} of ${pages.length}`
    }else{
        active = 0
        text.innerText = `${active+1} of ${pages.length}`
        
    }
    document.querySelector('#articles').innerHTML = pages[active].join('\n')
    
}
    
    
