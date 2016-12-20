var storage = sessionStorage;
function doFirst(){
    if(storage['addItemList'] == null){
        storage['addItemList']='';
    //storage.setItem('addItemList','');
    }
    //幫每個Add cart建事件聆聽的功能
    var list = document.querySelectorAll('.addButton');
    for( var i = 0; i<list.length;i++){
        list[i].addEventListener('click', function(){
            var pInfo = document.querySelector('#' + this.id + ' input').value;
                                                            //空白不可遺漏
            addItem(this.id,pInfo)
        },false)
    }
}
function addItem(itemId, itemValue){
    //alert(itemId,itemValue);


    var image = document.createElement('img');
    image.src = 'imgs/' + itemValue.split('|')[1];
    image.id = 'imageSelect';

    var title = document.createElement('span');
    title.innerText = itemValue.split('|')[0];
    title.id = 'titleSelect';

    var price = document.createElement('span');
    price.innerText = itemValue.split('|')[2];
    price.id = 'priceSelect';

    var newItem = document.getElementById('newItem');

    //先判斷此處是否已有物件，如果有就先刪除
    if (newItem.hasChildNodes()){
        while(newItem.childNodes.length >= 1){
            newItem.removeChild(newItem.firstChild);
        }
    }
    //再顯示新物件
    newItem.appendChild(image);
    newItem.appendChild(title);
    newItem.appendChild(price);

    if(storage[itemId]){
        alert('Already purchased.');
    }else{
        storage[itemId] = itemValue;    //storage.setItem(itemId, itemValue);
        storage['addItemList'] += itemId + ', ';
    }

    //計算購買數量和小計
    var itemString= storage.getItem('addItemList');
    var items = itemString.substr(0,itemString.length-2).split(', ');
    //console.log(items.length);

    var subtotal = 0;
    //以for-in來呈現購買順序
    for (var key in items){ // use items[key]
        var itemInfo = storage[items[key]];
        //   var itemInfo = storage.getItem(items[key]);
        var itemPrice = parseInt(itemInfo.split('|')[2]);
        subtotal += itemPrice;

    }

    document.getElementById('itemCount').innerText = items.length;
    document.getElementById('subtotal').innerText = subtotal;

}

window.addEventListener('load', doFirst, false);





