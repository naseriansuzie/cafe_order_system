function createMenuElement(menu) {
    //add-btn 버튼을 onclick -> 모달 창 띄우기
    //모달 창에서 입력한 값을 menu에 push
    //btn-box를 ''시킨 후
    //다시 renderMenuHRML 실행
}

function createCartItemElement(item) {
    let chosenId = [];
     for(let i=0; i < cart.length; i++){
         chosenId.push(cart[i].id);
         if(cart[i].id === item) {
            cart[i].quantity++;
         }
     }
     if(chosenId.indexOf(item) === -1) {
         cart.push({'id': item, 'quantity': 1});
     }
     console.log(cart);
}

function renderMenuHTML() {
    const btnBox = document.querySelector('#btn-box');
    const btnTemplate = document.querySelector('#btn-template');

    for (let i = 0; i < menu.length; i++) {
        let btns = document.importNode(btnTemplate.content, true);

        btns.querySelector('.btn').innerText = menu[i].name + '\n' + menu[i].price + '원';
        btns.querySelector('.btn').onclick = function() {    
            createCartItemElement(menu[i].id); // 카트 업데이트
            renderCartHTML(); // 주문내역 렌더
            renderSubtotalHTML(); // 합계금액 렌더
        }

        btnBox.appendChild(btns);
    }
}

function renderCartHTML() {
    const orderList = document.querySelector('.order-list');
    const orderTemplate = document.querySelector('#set');

    orderList.innerText = '';

    for(let i = 0; i < cart.length; i++) {
        for(let j = 0; j < menu.length; j++) {
            if(cart[i].id === menu[j].id) {
                let yourOrder = document.importNode(orderTemplate.content, true);

                yourOrder.querySelector('#menu-name').textContent = menu[j].name;
                yourOrder.querySelector('#menu-count').textContent = cart[i].quantity + '개';
                yourOrder.querySelector('#menu-price').textContent = menu[j].price * cart[i].quantity + '원';
                
                orderList.appendChild(yourOrder);
            }
        }
    }
}

function renderSubtotalHTML() {
     let sum = 0;
     for(let i = 0; i < cart.length; i++) {
         for(let j = 0; j < menu.length; j++) {
             if(cart[i].id === menu[j].id) {
                 sum += cart[i].quantity * menu[j].price;
             }
         }
     }
     console.log(sum);
     const total = document.querySelector('#total');
     total.textContent = sum + '원';
}

renderMenuHTML();