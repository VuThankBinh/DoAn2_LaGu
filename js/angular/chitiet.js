var idsp=window.location.href.split('=')[1];
var app = angular.module('AppBanHang', []);
app.controller("ChiTietCtrl", function ($scope, $http) {
    $scope.SanPham;
    $scope.listDanhMuc;
    $scope.LoadDanhMuc = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham_ngDung/get-loaiSanPham',
        }).then(function (response) {
            $scope.listDanhMuc = response.data;
            angular.forEach($scope.listDanhMuc, function (item) {
                item.hinhAnhMinhHoa = (current_img + item.hinhAnhMinhHoa);
            });

            console.log(response.data);
        });
    };
    $scope.LoadSanPham = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham_ngDung/get-SanPham-byID/'+idsp,
        }).then(function (response) {
            $scope.SanPham= response.data;
            angular.forEach($scope.SanPham, function (item) {
                item.hinhAnhMinhHoa = (current_img + item.hinhAnhMinhHoa);
            });

            console.log(response.data);
        });
    };
    $scope.addToCart = function (item) {
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
    };
    $scope.thanhtoan1 = function () {
        name1 = document.getElementById('HoTen').value;

        sdt1 = document.getElementById('sdt').value;

        tinh1 = document.getElementById('city3').options[document.getElementById('city3').selectedIndex].text;

        huyen1 = document.getElementById('district3').options[document.getElementById('district3').selectedIndex].text;

        xa1 = document.getElementById('ward3').options[document.getElementById('ward3').selectedIndex].text;

        dc1 = document.getElementById('dccuthe').value;

        email = document.getElementById('email').value;


        var chk = document.getElementById('chkKhac');
        console.log(name1 + "12\n" + sdt1 + "\n" + tinh1 + "\n" + huyen1 + "\n" + xa1 + "\n" + dc1)
        if (name1 == "" || sdt1 == ""
            || tinh1 == "Chọn tỉnh thành" || huyen1 == "Chọn quận huyện"
            || xa1 == "Chọn phường xã" || dc1 == "") {
            alert("Bạn chưa nhập đầy đủ thông tin")
            return;
        }
        let obj = {};
        obj.tenKhachHang= name1;
        obj.soDienThoai= sdt1;
         obj.username='binhbc';
        //  = JSON.parse(localStorage.getItem('user')).username=
        obj.diaChi= dc1 + ", " + xa1 + ", " + huyen1 + ", " + tinh1;
        
        
        obj.list_chitietDH = [];
        let list = JSON.parse(localStorage.getItem('cart'));
        for (var i = 0; i < list.length; i++) {
            obj.list_chitietDH.push
                (
                    {
                        maDonHang: "string",
                        maSanPham: list[i].id.toString(),
                        tenSanPham: list[i].name.toString(),
                        soLuong: list[i].quantity.toString(),
                        donGia: list[i].price.toString()
                    }
                )
        }
        console.log(obj);
        obj2= JSON.stringify(obj);
        console.log(obj2)
        $http({
            method: 'POST',
            data: obj2,
            url: current_url + '/api/DonHang/create-donhang',
        }).then(function (response) {
            alert('Thêm đơn hàng thành công');
            delCart();
        });
    };
    $scope.LoadDanhMuc();
    $scope.LoadSanPham();
});
function delCart() {
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (cart != null) {
        cart=[];
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
    }

}