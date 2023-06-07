var manu = document.getElementById('manu');
var itemList1 = document.getElementById('item1');
var itemList2 = document.getElementById('item2');
var itemList3 = document.getElementById('item3');

var Order = {
    price: '',
    dish: '',
    table: ''
}

manu.addEventListener('submit', addedOrder);
itemList1.addEventListener('click', removeItem);
itemList2.addEventListener('click', removeItem);
itemList3.addEventListener('click', removeItem);

async function addedOrder(e) {
    try {
        e.preventDefault();
        Order.price = document.getElementById('price').value;
        Order.dise = document.getElementById('dish').value;
        Order.table = document.getElementById('table').value;
        const postData = await axios.post('https://crudcrud.com/api/95f4a4a1206b413fb0b4ecc30b325b59/orderManu', Order);
        addOrder(postData.data);

    } catch (err) {
        console.log(err);
    }
}
function addOrder(postData) {
    var li = document.createElement('li');
    console.log(postData._id);
    var orderDetail = postData.price + '-' + postData.dise + '-' + postData.table + ' ';
    li.id = postData._id;
    li.appendChild(document.createTextNode(orderDetail));
    li.appendChild(deleteBtn(postData));
    console.log(li);
    if (postData.table === 'table1') {
        itemList1.appendChild(li);
    } else if (postData.table === 'table2') {
        itemList2.appendChild(li);
    } else {
        itemList3.appendChild(li);
    }
}

function deleteBtn(postData) {
    var delBtn = document.createElement('Button');
    delBtn.className = 'delete';
    delBtn.id = postData._id;
    delBtn.innerHTML = 'Delete Order';
    if (delBtn.onclick === delBtn.classList.contains('delete')) {
        removeItem();
    }
    return delBtn;
}
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('https://crudcrud.com/api/95f4a4a1206b413fb0b4ecc30b325b59/orderManu');
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
            addOrder(response.data[i]);

        }

    } catch (err) {
        console.log(err);
    }
})

async function removeItem(e) {
    try {
        if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure')) {
                var li = e.target.parentElement;
                var idNo = li.id;
                li.remove();
                console.log(idNo);
                const deleteData = await axios.delete('https://crudcrud.com/api/95f4a4a1206b413fb0b4ecc30b325b59/orderManu/' + idNo);
                console.log(deleteData);
            }
        }
    } catch (err) {
        console.log(err);
    }
}