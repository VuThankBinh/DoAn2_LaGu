//thêm sửa xóa sản phẩm
var menuVisible=true;
function showhide(){
    var ulMenu = document.getElementById("menucc");
    var liItems = ulMenu.querySelectorAll("ul li");

    if (menuVisible) {

        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "none";

        }
    } else {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "block";

        }
    }

    menuVisible = !menuVisible; // Đảo ngược trạng thái hiển th
}
function showHome(){
    location.reload();
}
function showThongke(){
    resetNavItems();
    showView("thongkeview");
}
var menuVisible1 = true;

function showHideInfo(){
    var ulMenu = document.getElementById("thongtinchung");
    var liItems = ulMenu.querySelectorAll("ul li");

    if (menuVisible1) {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "none";

        }
    } else {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "block";

        }
    }

    menuVisible1 = !menuVisible1; // Đảo ngược trạng thái hiển th
}
function showView(viewId) {
    // Hide all div elements
    document.querySelectorAll('#danhmucview > div').forEach(div => {
        div.classList.add('hidden');
    });

    // Show the selected div
    const selectedView = document.getElementById(viewId);
    if (selectedView) {
        selectedView.classList.remove('hidden');
    }
}
function showLoaiSP(){
    
    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(1)').classList.add('selected');
    showView("danhmucsp")
}

function showSanPham(){
    
    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(2)').classList.add('selected');
    showView("sanpham")
}
function showNhaCungCap(){
    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(3)').classList.add('selected');
    showView('ncc')
}
function showHDN(){
    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(4)').classList.add('selected');
    showView('HoaDonNhap')
}
function showCTKM(){
    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(5)').classList.add('selected');
    showView('ctkm')
}
function resetNavItems() {
    // Remove 'selected' class from all list items
    document.querySelectorAll('#thongtinchung li').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelectorAll('#thongtindonhang li').forEach(item => {
        item.classList.remove('selected');
    });
}


var menuVisible2 = false;
function showHideDonHang(){
    var ulMenu = document.getElementById("thongtindonhang");
    var liItems = ulMenu.querySelectorAll("ul li");

    if (menuVisible2) {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "none";

        }
    } else {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "block";

        }
    }

    menuVisible2 = !menuVisible2; // Đảo ngược trạng thái hiển th
}
function showDonHangChuaXN()
{
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(1)').classList.add('selected');
    showView('donHangChuaXN')
}
function showDonHangDaXN(){
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(2)').classList.add('selected');
    showView('donhangDaXacNhan')
}

function showDonHangDangGiao(){
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(3)').classList.add('selected');
    showView('DonHangDangGiao')
}
function showDonHangDaGiao(){
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(4)').classList.add('selected');
    showView('DonHangDaGiao')
}
function showDonHangHoanTra(){
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(5)').classList.add('selected');
    showView('DonHoanTra')
}