const storeData = [
    {
        id : 1,
        name : "Salam Bro",
        imageUrl : "https://images.deliveryhero.io/image/stores-glovo/stores/565d9076196a96580be3ed764aa85ea3b5937e5276357bbc9dd030a41f8c285b?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7Im1vZGUiOiJmaWxsIiwid2lkdGgiOjQ1MCwiaGVpZ2h0IjoyNTB9fV0=",
        rating : 94 ,
        reviews : 500
    },
    {
        id : 2,
        name : "Bahandi",
        imageUrl : "https://images.deliveryhero.io/image/stores-glovo/stores/1b83179e9b3d0e87b2bcd473e8b42f617f8607ef5f12e2a7a044d506e70aa076?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7Im1vZGUiOiJmaWxsIiwid2lkdGgiOjQ1MCwiaGVpZ2h0IjoyNTB9fV0=",
        rating : 94,
        reviews : 450
    }, {
        id : 3,
        name : "I'm feel-good",
        imageUrl : "https://images.deliveryhero.io/image/stores-glovo/stores/13f9c3a9d078f55ec50eef46067dfc8c2fdc75a6b9ee3cf9cc385d8ee21a32ca?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7Im1vZGUiOiJmaWxsIiwid2lkdGgiOjQ1MCwiaGVpZ2h0IjoyNTB9fV0=",
        rating : 94,
        reviews : 500
    }, {
        id : 4,
        name : "KFC",
        imageUrl : "https://images.deliveryhero.io/image/stores-glovo/stores/d4648d512c4a987f61349dc7f086328f332ef6a719b63bde68f83512ad923aef?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7Im1vZGUiOiJmaWxsIiwid2lkdGgiOjQ1MCwiaGVpZ2h0IjoyNTB9fV0=",
        rating : 90,
        reviews : 500
    }, {
        id : 5,
        name : "Salam Bro",
        imageUrl : "https://images.deliveryhero.io/image/stores-glovo/stores/267157c8141ecebc7316ae9b146c2e4c01d055bd7202fcc058630beda6972da5?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7Im1vZGUiOiJmaWxsIiwid2lkdGgiOjQ1MCwiaGVpZ2h0IjoyNTB9fV0=",
        rating : 94,
        reviews : 500
    }, {
        id : 6,
        name : "Gippo",
        imageUrl : "https://images.deliveryhero.io/image/stores-glovo/stores/ab06a44ae442c05ff2ed59e2b1b9bbe492c5499a826e8787a8535971eadac6b2?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7Im1vZGUiOiJmaWxsIiwid2lkdGgiOjQ1MCwiaGVpZ2h0IjoyNTB9fV0=",
        rating : 92,
        reviews : 500
    }, {
        id : 7,
        name : "Zheka's Doner",
        imageUrl : "https://images.deliveryhero.io/image/stores-glovo/stores/47eb6734c18126b6fa411a63c2701bb165d9dca4b08dfd5a13b9891a8baa766c?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7Im1vZGUiOiJmaWxsIiwid2lkdGgiOjQ1MCwiaGVpZ2h0IjoyNTB9fV0=",
        rating : 88,
        reviews : 500
    }, {
        id : 8,
        name : "Burger King",
        imageUrl : "https://images.deliveryhero.io/image/stores-glovo/stores/50b0efb192619699c322276512203f519d994877da764c1053f691a8ffd407a3?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7Im1vZGUiOiJmaWxsIiwid2lkdGgiOjQ1MCwiaGVpZ2h0IjoyNTB9fV0=",
        rating : 93,
        reviews : 500
    },
];



function createSectionTwoCard(rest) {
    // Create div with class "section-two_card"
    var cardDiv = document.createElement('div');
    cardDiv.className = 'section-two_card';

    // Create div with classes "section-two_card_img" and "section-two_img"
    var imgDiv = document.createElement('div');
    imgDiv.className = 'section-two_card_img section-two_img';


    // Create image element with src attribute and alt attribute
    var img = document.createElement('img');
    img.src = `${rest.imageUrl}`;
    img.alt = '';
    img.className = 'section-two_ioimg';
    img.addEventListener('mouseenter', () => {
        img.style.transition = 'transform 0.4s ease'
        img.style.transform = 'scale(1.1)'

    })
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1.0)'
    })
    imgDiv.appendChild(img);

    // Create div with class "section-two_card_texts"
    var textsDiv = document.createElement('div');
    textsDiv.className = 'section-two_card_texts';

    // Create heading element (h1) with text content
    var heading = document.createElement('h1');
    heading.textContent = rest.name

    // Create paragraph element (p) with strong and span elements
    var paragraph = document.createElement('p');
    var strong = document.createElement('strong');
    strong.textContent = `${rest.rating}%`;
    var span = document.createElement('span');
    span.style.color = 'gray';
    span.textContent = `(${rest.reviews})`;

    // Append strong and span to paragraph
    paragraph.appendChild(strong);
    paragraph.appendChild(span);

    // Append heading and paragraph to textsDiv
    textsDiv.appendChild(heading);
    textsDiv.appendChild(paragraph);

    // Append imgDiv and textsDiv to cardDiv
    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(textsDiv);

    cardDiv.addEventListener('click', () => {
        window.location.href = `restDetails.html?id=${rest.id}`
    })

    return cardDiv;
}
let container = document.querySelector('.section-two_cards')

for(let rest of storeData){
    let card = createSectionTwoCard(rest)
    container.appendChild(card)
}


for(let i of container.children){
    i.style.borderBottom = '1px solid black'
}