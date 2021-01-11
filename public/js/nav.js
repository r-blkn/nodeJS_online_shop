const navigationBtn = document.querySelectorAll('.products__item');

// navigationBtn.addEventListener('click', function() {
    
// })
console.log('nav.js');

function getCategoryList() {
    fetch('/get-category-list',
        {
            method: 'POST'
        }
    ).then(function (response) {
        // console.log(response);
        // console.log('console.log RESPONSE');
        return response.text();
    }
    ).then(function (body) {
        // console.log('body: AAAAAAAAA', body);
        showCategoryList(JSON.parse(body));
    })
}

function showCategoryList(data) {

    // console.log('data: AHDKADJFVF', data);

    let out = '<ul class="products__subitem-list"><li><a href="/products">Всі товари</a></li>';

    for (let i = 0; i < data.length; i++) {
        // console.log("DATA 1", data[i]['id']);
        out += `<li><a href="/goods?id=${data[i]["id"]}" class="${data[i]['category']}" type="button">${data[i]['category']}</a></li>`;
    }
    out += '</ul>';
    console.log('out: ', out);
    

    document.querySelector('#category-list').innerHTML = out;

    let outPc = '<a href="/products" class="products__button active btn">Всі товари</a>'

    for (let j = 0; j < data.length; j++) {
        outPc += `<a href="/goods?id=${data[j]['id']}" class="${data[j]['category']} products__button btn" type="button">${data[j]['category']}</a>`
    }

    document.querySelector('#category-list-pc').innerHTML = outPc;
    console.log('outPc: ', outPc);
}

getCategoryList();


