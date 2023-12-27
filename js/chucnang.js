var list = document.getElementsByClassName("silde-img");
var index = 0;
for (x of list) {
    x.style.display = 'none';
}
list[index].style.display = 'block';
function showL() {
    for (x of list) {
        x.style.display = 'none';
    }
    if (index == 0) index = list.length - 1;
    else index = index - 1;
    list[index].style.display = 'block';
    setTimeout(showL, 2000);
}

function showR() {
    for (x of list) {
        x.style.display = 'none';
    }
    if (index == list.length - 1) index = 0;
    else index = index + 1;
    list[index].style.display = 'block';
}

function addToCart(item) {

    //debugger;          
    item.quantity = 1;
    console.log(item.quantity);
    var list;
    if (localStorage.getItem('cart') == null) {
        list = [item];
    } else {
        list = JSON.parse(localStorage.getItem('cart')) || [];
        let ok = true;
        for (let x of list) {
            if (x.id == item.id) {
                x.quantity += 1;
                ok = false;
                break;
            }
        }
        if (ok) {
            list.push(item);
        }
    }
    localStorage.setItem('cart', JSON.stringify(list));
    alert("Đã thêm vào giỏ hàng thành công");
    countCart();
}

function Login() { 
    var ten = getData();
    var link = document.getElementById("user");
    link.textContent = "ten";

}
function getData() {
    // Lấy tham chiếu đến thẻ input bằng cách sử dụng phương thức getElementById hoặc querySelector
    var input = document.getElementById("tk");
    // var input = document.querySelector("#myInput");

    // Lấy giá trị dữ liệu từ thuộc tính value của thẻ input
    var data = input.value;


    return data;
}
function countCart(){
    
    var cart = JSON.parse(localStorage.getItem("cart"));
    var count=0;
    if(cart.length != 0 && cart!=null){
        for(let index = 0; index < cart.length; index++){
            count+=cart[index].quantity;
        }
        document.getElementById('cart-count').textContent=count;
    }
   
}

function getCart() {

    var format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
    var arrSP = [];
    var sum = 0;
    var cart =JSON.parse(localStorage.getItem('cart'));
    var cartcount=0;
    document.getElementById('GioHang-Info').innerHTML=``
    if (cart.length == 0 || cart==null) {
        document.getElementById('GioHang-Header').innerHTML = `Chưa có sản phẩm nào trong giỏ hàng <a href="./TrangChu.html">Quay lại</a>`;
        document.getElementById('2table').style.display='none'
        document.getElementById('GioHang-Header').style.marginBottom='400px'
    }
    else {
        for (let index = 0; index < cart.length; index++) {
            // console.log(loginData.cart[index])
            //  console.log(loginData.cart[index].name);
            // arrSP.push(cart[index])
            sum += parseFloat(cart[index].price * cart[index].quantity)
            cartcount+=cart[index].quantity;
            document.getElementById('GioHang-Info').innerHTML += `<tr>
            <td>
                <img src="${cart[index].image}" alt="">
            </td>
            <td>
            ${cart[index].name}
            </td>
            <td>
            <div class="item-sl">
            <button onclick="truCart('${cart[index].id}')">-</button>
            <input type="text" value=" ${cart[index].quantity}" id="sl${index}">
            <button onclick="congCart('${cart[index].id}')">+</button>
        </div>
            </td>
            <td>
            ${format.format(cart[index].price)}đ
            </td>
            <td>
                Thành tiền <br>
                ${format.format(cart[index].price * cart[index].quantity)}đ <br>
                <i class="fa-solid fa-trash" style="color: #888;cursor: pointer;" title="Xóa khỏi giỏ hàng" onclick="removeFromCartById('${cart[index].id}')" ></i>
            </td>
        </tr>`

        }
        document.getElementById('tongbill').textContent=`Tổng tiền: ${format.format(sum)}₫`;
        console.log(sum)
        document.getElementById('GioHang-Header').innerHTML = `GIỎ HÀNG CỦA BẠN ( có ${cartcount} sản phẩm)`;
    }
    countCart();
}
function removeFromCartById(id) {
    // Lấy giỏ hàng từ local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Tìm index của đối tượng có id cần xóa
    const indexToRemove = cart.findIndex(item => item.id === id);
  
    // Nếu tìm thấy, xóa đối tượng khỏi giỏ hàng
    if (indexToRemove !== -1) {
      cart.splice(indexToRemove, 1);
  
      // Cập nhật lại giỏ hàng trong local storage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      alert(`Đã xóa sản phẩm có ID ${id} khỏi giỏ hàng.`);
      getCart();
    } else {
      alert(`Không tìm thấy sản phẩm có ID ${id} trong giỏ hàng.`);
    }
  }
  function truCart(id){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tìm sản phẩm trong giỏ hàng có ID cần giảm quantity
    const product = cart.find(item => item.id === id);
  
    // Nếu tìm thấy và quantity > 1, giảm giá trị quantity xuống 1
    if (product && product.quantity > 1) {
      product.quantity -= 1;
  
      // Cập nhật lại giỏ hàng trong local storage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      alert(`Cập nhật giỏ hàng thành công`);
      getCart();
    } else {
      alert(`Không thể sửa.`);
    }
  }
  function congCart(id){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tìm sản phẩm trong giỏ hàng có ID cần tăng quantity
    const product = cart.find(item => item.id === id);
  
    // Nếu tìm thấy, tăng giá trị quantity lên 1
    if (product) {
      product.quantity += 1;
  
      // Cập nhật lại giỏ hàng trong local storage
      localStorage.setItem('cart', JSON.stringify(cart));
  
     alert(`Cập nhật giỏ hàng thành công`);
     getCart();
    } else {
      console.log(`Không tìm thấy sản phẩm có ID ${id} trong giỏ hàng.`);
    }
  }