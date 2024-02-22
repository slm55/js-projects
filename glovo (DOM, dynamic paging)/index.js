// let img = document.getElementsByTagName('img')
// console.log(img)
// console.log(img.length)

// for(let i of img){
//     console.log(i.src)
// }

// let button = document.getElementsByTagName('button')
// console.log(button.length)

// let bitton_id = document.getElementById('header-button')
// console.log(bitton_id)

// let clas = document.getElementsByClassName('section-cards')
// for(let i of clas){
//     console.log(i)
// }

// function sayHello() {
//     console.log('Hello')
//   }
//   setInterval(sayHello, ) // it prints hello in every second, 1000ms is 1s

// setTimeout(() => {
//     console.log('Hello')
// }, 5000)

// setInterval(() => {
//     console.log('Hello')
// }, 5000)

// let header = document.querySelector('.header')
// header.className = 'header'
// header.setAttribute('class', 'header')
// header.classList.remove('div')
// header.classList.add('dodd')

// const street = document.getElementById('mau')
// street.textContent = 'Street'

// const button = document.querySelector('.header-button')
// setTimeout(() => {
//     button.textContent = "Бастау"
// }, 3000)


// const section = document.querySelector('.section-five')

//     section.innerHTML = `<h1>Menu</h1>
// <ul class = 'Food-list'>
// <li>Burger</li>
// <li>Burger</li>
// <li>Burger</li>
// <li>Burger</li>
// </ul>`

// const food = document.querySelector('.Food-list')
// food.style.listStyleType = 'none'

// const li = document.querySelectorAll('li')
// li.forEach((element, i) => {
//     if(i % 2 == 0){
//         element.style.color = 'blue'
//     }else{
//         element.style.color = 'red'
//     }
// })

// for(let i = 0; i < li.length; i++){
//     if(i % 2 == 0){
//         li[i].style.color = 'red' 
//     }else{
//         li[i].style.color = 'blue'
//     }
// }

// let menu = document.createElement('h2')
// menu.textContent = 'Menu'
// section.appendChild(menu)

// let foodlist = document.createElement('ul')
// foodlist.classList.add('food-list')
// section.appendChild(foodlist)

// const foods = ['Burger', 'Pasta', 'Sushi', 'Pizza']
// for(let i = 0; i < foods.length; i++){
//     let li = document.createElement('li')
//     li.textContent = foods[i]
//     li.style.listStyleType = 'none'
//     foodlist.appendChild(li)
// }
// let title = document.createElement('h1')
// title.className = 'title'
// title.style.fontSize = '24px'
// title.textContent = 'glovo'
// document.body.appendChild(title)

// let doner = document.createElement('li')
// doner.textContent = 'Doner'
// food.appendChild(doner)