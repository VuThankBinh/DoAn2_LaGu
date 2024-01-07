var app = angular.module('AppBanHang', []);
app.controller("HomeCtrl", function ($scope, $http) {
    $scope.listSanPhamNon;
    $scope.listSanPhamKhan;
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
    $scope.LoadNon = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham_ngDung/get-SanPham-by-loai/2',
        }).then(function (response) {
            $scope.listSanPhamNon = response.data;
            angular.forEach($scope.listSanPhamNon, function (item) {
                item.hinhDaiDien = (current_img + item.hinhDaiDien);
                item.hinhAnDi = (current_img + item.hinhAnDi);
            });

            console.log(response.data);
        });
    };
    $scope.LoadKhan = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham_ngDung/get-SanPham-by-loai/3',
        }).then(function (response) {
            $scope.listSanPhamKhan = response.data;
            angular.forEach($scope.listSanPhamKhan, function (item) {
                item.hinhDaiDien = (current_img + item.hinhDaiDien);
                item.hinhAnDi = (current_img + item.hinhAnDi);
            });

            console.log(response.data);
        });
    };
    $scope.addToCart = function (item) {
        var user = JSON.parse(localStorage.getItem('user'))
        if (user != null) {
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
        else{
            alert('Bạn phải đăng nhập trước khi mua hàng')
            window.location.href="Login.html"
        }
    }
    $scope.LoadDanhMuc();
    $scope.LoadNon();
    $scope.LoadKhan();
});

function getUrlParametersFromHash(url) {
    var params = {};
    var hashIndex = url.indexOf('#');

    if (hashIndex !== -1) {
        var hashFragment = url.substring(hashIndex + 1);
        var queryString = hashFragment.split('?')[1];

        if (queryString) {
            var keyValuePairs = queryString.split('&');

            keyValuePairs.forEach(function (keyValuePair) {
                var pair = keyValuePair.split('=');
                params[pair[0]] = pair[1];
            });
        }
    }

    return params;
}