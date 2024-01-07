var app = angular.module('AppBanHang', []);
app.controller("AdminCtrl", function ($scope, $http) {
    $scope.btnsubmit1 = "Thêm loại sản phẩm"
    $scope.listSanPham;
    $scope.listDanhMuc;
    $scope.listDonHangChuaDuyet;
    $scope.listDonHangDaDuyet;
    $scope.LoadDanhMuc = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/LoaiSanPham/Get-loaisanpham-all',
        }).then(function (response) {
            $scope.listDanhMuc = response.data;
            angular.forEach($scope.listDanhMuc, function (item) {
                item.hinhAnhMinhHoa = (current_img + item.hinhAnhMinhHoa);
            });
            document.getElementById('maloaiview').readOnly = false;
            console.log(response.data);
        });
    };
    $scope.LoadSanPham = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/Get-sanpham-all',
        }).then(function (response) {
            $scope.listSanPham = response.data;
            angular.forEach($scope.listSanPham, function (item) {
                item.hinhDaiDien = (current_img + item.hinhDaiDien);
                item.hinhAnDi = (current_img + item.hinhAnDi);
            });

            console.log(response.data);
        });
    };
    $scope.LoadDonHangChuaDuyet = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/BanHang/get-dsdh-chuaduyet',
        }).then(function (response) {
            $scope.listDonHangChuaDuyet = response.data;


            console.log(response.data);
        });
    };
    $scope.LoadDonHangDaDuyet = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/BanHang/get-dsdh-daduyet',
        }).then(function (response) {
            $scope.listDonHangDaDuyet = response.data;


            console.log(response.data);
        });
    };
    $scope.xacnhandon = function (id) {
        $http({
            method: 'POST',
            url: current_url + '/api/BanHang/duyet-don-hang/' + id,
        }).then(function (response) {
            // $scope.listDonHangChuaDuyet = response.data;

            $scope.LoadDonHangChuaDuyet();
            alert('Xác nhận đơn hàng thành công')
        });
    }
    $scope.chitietdh;
    $scope.donhang;
    $scope.getchitiet_dh = function (id) {
        $http({
            method: 'GET',
            url: current_url + '/api/BanHang/get-chiTiet-dh/' + id,
        }).then(function (response) {
            $scope.chitietdh = response.data;

            console.log(response.data);
        });
    };
    $scope.getdonhang = function (id) {
        $http({
            method: 'POST',
            url: current_url + '/api/BanHang/get-don-hang/' + id,
        }).then(function (response) {
            $scope.donhang = response.data;
            document.getElementById('panelchung').style.display = 'block'
            console.log(response.data);
        });
    }
    $scope.LoaiSP;
    $scope.getID_loai = function (maLoai) {
        $http({
            method: 'GET',
            url: current_url + '/api/LoaiSanPham/Get-loaisanpham-by-id/' + maLoai,
        }).then(function (response) {
            $scope.LoaiSP = response.data;
            console.log(response.data);
            $scope.maLoaiSanPham = $scope.LoaiSP.maLoai;
            $scope.TenLoaiSanPham = $scope.LoaiSP.tenLoai;
            $scope.MoTaLoaiSanPham = $scope.LoaiSP.moTa;
            $scope.hinhAnhMinhHoa = $scope.LoaiSP.hinhAnhMinhHoa;
            $scope.btnsubmit1 = "Cập nhật"
            document.getElementById('maloaiview').readOnly = true;
        });
    };
    $scope.LoadDonHangChuaDuyet();
    $scope.LoadSanPham();
    $scope.LoadDanhMuc();
    $scope.LoadDonHangDaDuyet();

    $scope.maLoaiSanPham;
    $scope.TenLoaiSanPham;
    $scope.MoTaLoaiSanPham;
    $scope.hinhAnhMinhHoa;
    $scope.host = current_img;
    $scope.delete_loai = function (id) {
        var result = confirm("Bạn có thực sự muốn xóa không?");
        if (result) {
            $http({
                method: 'POST',
                url: current_url + '/api/LoaiSanPham/Delete-loaisanpham/' + id,
            }).then(function (response) {
                $scope.LoadDanhMuc();
                alert('Xóa thành công!');
            });
        }
    };


    $scope.SaveLoai = function () {

        let obj = {};
        obj.maLoai = $scope.maLoaiSanPham;
        obj.tenLoai = $scope.TenLoaiSanPham;
        obj.moTa = $scope.MoTaLoaiSanPham;

        var file = document.getElementById('imageInput').files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': undefined  // Let the browser set the content type automatically for FormData
                },
                url: current_url + '/api/PhiChucNang/upload',
            }).then(function (res) {

                obj.hinhAnhMinhHoa = res.data.filePath;

                if ($scope.btnsubmit1 == "Thêm loại sản phẩm") {
                    $http({
                        method: 'POST',

                        data: obj,
                        url: current_url + '/api/LoaiSanPham/Create-loaisanpham',
                    }).then(function (response) {
                        $scope.LoadDanhMuc();
                        alert('Thêm loại sản phẩm thành công!');
                    });
                } else {
                    $http({
                        method: 'POST',
                        data: obj,
                        url: current_url + '/api/LoaiSanPham/Update-sanpham',
                    }).then(function (response) {
                        $scope.LoadDanhMuc();
                        alert('Cập nhật loại sản phẩm thành công!');
                    });
                }
            });
        } else {
            obj.hinhAnhMinhHoa = $scope.hinhAnhMinhHoa;
            if ($scope.btnsubmit1 == "Thêm loại sản phẩm") {
                console.log(obj)
                $http({
                    method: 'POST',
                    data: obj,
                    url: current_url + '/api/LoaiSanPham/Create-loaisanpham',
                }).then(function (response) {
                    $scope.LoadDanhMuc();
                    alert('Thêm loại sản phẩm thành công!');
                });
            } else {
                $http({
                    method: 'POST',
                    data: obj,
                    url: current_url + '/api/LoaiSanPham/Update-sanpham',
                }).then(function (response) {
                    $scope.LoadDanhMuc();
                    alert('Cập nhật loại sản phẩm thành công!');
                });
            }
        }
    };

    $scope.doanhthuhomnay = 0;
    $scope.get_doanhthu_homnay = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/ThongKe/get-doanhthu-homnay',
        }).then(function (response) {
            // $scope.chitietdh = response.data;
            $scope.doanhthuhomnay = response.data;
            console.log(response.data);
        });
    };
    $scope.listSPBanChay;
    $scope.get_sanphambanchay = function () {
        var today = new Date();

        // Ngày đầu tiên của tháng
        var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

        // Ngày cuối cùng của tháng
        var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // Chuyển định dạng thành MM/dd/yyyy
        var formattedFirstDay = formatDate(firstDay);
        var formattedLastDay = formatDate(lastDay);
        $http({
            method: 'PUT',
            url: current_url + '/api/ThongKe/get-sp-banchay?top=2&ngayMin=' + formattedFirstDay + '&ngayMax=' + formattedLastDay,
        }).then(function (response) {
            // $scope.chitietdh = response.data;
            $scope.listSPBanChay = response.data;
            console.log(response.data);
        });
    };
    $scope.get_doanhthu_homnay();
    $scope.get_sanphambanchay();

    $scope.btnsubmit2 = "Thêm sản phẩm"
    $scope.del_sanpham = function (id) {
        var result = confirm("Bạn có thực sự muốn xóa không?");
        if (result) {
            $http({
                method: 'POST',
                url: current_url + '/api/SanPham/Delete-sanpham/' + id,
            }).then(function (response) {
                // $scope.chitietdh = response.data;
                $scope.LoadSanPham();
                alert('xóa thành công')
            });
        }

    };
    $scope.maSanPham;
    $scope.tenSanPham;
    $scope.soLuongSanPham;
    $scope.donGiaSanPham;
    $scope.hinh1;
    $scope.hinh2;
    $scope.maLoai;
    $scope.moTa;
    $scope.get_sanpham = function (id) {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/Get-sanPham-by-id/' + id,
        }).then(function (response) {
            // $scope.chitietdh = response.data;
            $scope.maSanPham = response.data.maSanPham;
            $scope.tenSanPham = response.data.tenSanPham;
            $scope.soLuongSanPham = response.data.soLuong;
            $scope.donGiaSanPham = response.data.donGia;
            $scope.hinh1 = response.data.hinhDaiDien;
            $scope.hinh2 = response.data.hinhAnDi;
            $scope.maLoai = response.data.maLoai;
            $scope.moTa = response.data.moTa;
            $scope.btnsubmit2 = 'Cập nhật'
            console.log(response.data);
        });
    };
    $scope.SaveSP = async function () {
        try {
            let obj = {};
            obj.maSanPham = $scope.maSanPham;
            obj.tenSanPham = $scope.tenSanPham;
            obj.soLuong = $scope.soLuongSanPham;
            obj.donGia = $scope.donGiaSanPham;
            obj.maLoai = $scope.maLoai;
            console.log($scope.moTa)
            obj.mota = $scope.moTa;
            if($scope.moTa === null || $scope.moTa === '')
            {
                obj.mota = ''
            }
            console.log(obj.mota)
            if ($scope.maSanPham == null || $scope.tenSanPham == null || $scope.soLuongSanPham == null || $scope.donGiaSanPham == null || $scope.maLoai == null) {
                alert('Bạn chưa nhập đủ thông tin')
                return;
            }
            else {
                
                var fileInput1 = document.getElementById('imageInput1');
                var file1 = fileInput1.files[0];
                var fileInput2 = document.getElementById('imageInput2');
                var file2 = fileInput2.files[0];
                if (file2) {
                    obj.hinhAnDi = await $scope.uploadFile(file2);
                } else {
                    if ($scope.hinh2 == null) {

                        obj.hinhAnDi = 'string';
                    }
                    else {
                        obj.hinhAnDi = $scope.hinh2
                    }
                }

                if (file1) {
                    obj.hinhDaiDien = await $scope.uploadFile(file1);
                } else {
                    if ($scope.hinh1 == null) {

                        obj.hinhDaiDien = 'string';
                    }
                    else {
                        obj.hinhDaiDien = $scope.hinh1
                    }
                }
                // console.log(JSON.stringify(obj))
                if ($scope.btnsubmit2 == "Thêm sản phẩm") {
                    console.log(obj)
                    $http({
                        method: 'POST',
                        data: obj,
                        url: current_url + '/api/SanPham/Create-sanpham',
                    }).then(function (response) {
                        $scope.LoadSanPham();
                        alert('Thêm sản phẩm thành công!');
                    });
                } else {
                    $http({
                        method: 'POST',
                        data: obj,
                        url: current_url + '/api/SanPham/Update-sanpham',
                    }).then(function (response) {

                        alert('Cập nhật sản phẩm thành công!');
                        $scope.LoadSanPham();
                        $scope.btnsubmit2 = 'Thêm sản phẩm'
                        $scope.maSanPham = '';
                        $scope.tenSanPham = '';
                        $scope.soLuongSanPham = '';
                        $scope.donGiaSanPham = '';
                        $scope.hinh1 = '';
                        $scope.hinh2 = '';
                        $scope.maLoai = 'Chọn loại sản phẩm';
                        $scope.moTa = '';
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    $scope.uploadFile = function (file) {
        return new Promise(function (resolve, reject) {
            const formData = new FormData();
            formData.append('file', file);

            $http({
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': undefined
                },
                url: current_url + '/api/PhiChucNang/upload',
            }).then(function (response) {
                resolve(response.data.filePath);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
});

function previewImage() {
    // var input = document.getElementById('imageInput');
    // var preview = document.getElementById('imgminhhoaView');

    var fileInput = document.getElementById('imageInput');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('imgminhhoaView').src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}
function previewImage1() {
    // var input = document.getElementById('imageInput');
    // var preview = document.getElementById('imgminhhoaView');

    var fileInput = document.getElementById('imageInput1');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('img1View').src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}
function previewImage2() {
    // var input = document.getElementById('imageInput');
    // var preview = document.getElementById('imgminhhoaView');

    var fileInput = document.getElementById('imageInput2');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('img2View').src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}
function closeForm() {
    document.getElementById('panelchung').style.display = 'none';
}
function formatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    var yyyy = date.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}