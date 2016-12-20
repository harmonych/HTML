var storage = sessionStorage;
function doFirst(){
	var itemString= storage.getItem('addItemList');
	var items = itemString.substr(0,itemString.length-2).split(', ');
	
    
	newItem = document.createElement('div');
	newTable = document.createElement('table');
	
	for (var key in items){ // use item[key]
        var itemInfo = storage[items[key]];
        createCartList(items[key], itemInfo);
	}
	newItem.appendChild(newTable);
	document.getElementById('cartList').appendChild(newItem);
	
	//subtotal
	subtotal =0;
	for(var key in items){
		var itemInfo = storage[items[key]];
		var itemPrice = parseInt(itemInfo.split('|')[2]);
		subtotal += itemPrice;
	}
	document.getElementById('subtotal').innerText = subtotal;
	
}
function createCartList(itemKey, itemValue){
//	alert(itemKey + ':' + itemValue);
	var itemTitle = itemValue.split('|')[0];
	var itemImage =	'imgs/' + itemValue.split('|')[1];
    var itemPrice = parseInt(itemValue.split('|')[2]);
	
	//建立每個品項的清單區域 - tr
	var trItemList = document.createElement('tr');//動態新增命名前方最好帶原tag
	trItemList.className= 'item';
	//trItemList.setAttribute('class', 'item');
	newTable.appendChild(trItemList);
	
	//建立商品圖片 -- 第一個td
	var tdImage = document.createElement('td');
	tdImage.style.width = '200px';
	
	var image = document.createElement('img');
	image.src = itemImage;
	image.width = 90;
	
	//image放入td下，td放入tr下。
	tdImage.appendChild(image);
	trItemList.appendChild(tdImage);
	
	//建立商品名稱和刪除按鈕 -- 第二個td
	var tdTitle = document.createElement('td');
	tdTitle.style.width = '280px';
	tdTitle.id = itemKey;

	//加入標籤<p>
	var pTitle = document.createElement('p');
	pTitle.innerText = itemTitle;
	
	var button = document.createElement('button');
	button.innerText = 'Delete';
	button.addEventListener('click', deleteItem, false);
	
	//將<p>跟<button>放入<tdTitle>
	tdTitle.appendChild(pTitle);
	tdTitle.appendChild(button);
	
	
	//將<tdTitle>放入<trItemList>
	trItemList.appendChild(tdTitle);
	
	//建立商品價格 -- 第三個td
	var tdPrice = document.createElement('td');
	tdPrice.style.width = '170px';
	
	trItemList.appendChild(tdPrice);
	
	
	//建立商品數量 -- 第四個td
	var tdItemCount = document.createElement('td');
	tdItemCount.style.width = '60px';
	
	var itemCount = document.createElement('input');
	itemCount.type = 'number';
	itemCount.value = 1;
	itemCount.min = 0;
	itemCount.oninput = changeItemCount;
	
	//建立商品數量*單品金額的金額
	tdPrice.innerText = itemPrice*itemCount.value;
	tdItemCount.appendChild(itemCount);
	trItemList.appendChild(tdItemCount);
}
function deleteItem(){
	//先找到要刪除物品的id 
	var itemId = this.parentNode.getAttribute('id');
	
	//檢查該品項個數
	var q = this.parentNode.nextSibling.nextSibling.firstChild.value;
	
	//從subtotal上扣掉欲刪除物品的金額*個數。
	var itemValue = storage[itemId];
	subtotal -= parseInt(itemValue.split('|')[2])*q;	
	document.getElementById('subtotal').innerText = subtotal;
	
	//清除storage內該物品的資料
	storage['addItemList'] = storage['addItemList'].replace(itemId+', ' , '');
	storage.removeItem(itemId);
	
	//最後再刪除該筆tr
	this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
	
}
function changeItemCount(){
	var q = this.value;
	var itemId = this.parentNode.previousSibling.previousSibling.getAttribute('id');
	var unitPrice = storage[itemId].split('|')[2];
	var oPrice = this.parentNode.previousSibling.innerText;
	this.parentNode.previousSibling.innerText = unitPrice * q;
	subtotal += ((unitPrice * q)-oPrice);
	document.getElementById('subtotal').innerText = subtotal;
	
}
window.addEventListener('load', doFirst, false);
