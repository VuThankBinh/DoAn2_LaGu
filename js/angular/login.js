function Login123() {
    var item = {};
    item.UserName = document.getElementById("tk").value;
    item.Password = document.getElementById("mk").value;
    var check = document.getElementById("loginwithAcc");
    if (check.checked) {
        $.ajax({
            type: "POST",
            url: "https://localhost:44373/api/PhiChucNang/login-admin",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(item)
        }).done(function (data) {
            debugger;
            if (data != null && data.message != null && data.message != 'undefined') {
                alert(data.message);
            } else {
                localStorage.setItem("user-Admin", JSON.stringify(data));
                alert('Đăng nhập thành công')
                window.location.href = "adminPage.html";
            }

        }).fail(function () {
            alert('Thông tin tài khoản không hợp lệ hoặc bạn không phải admin');
        });
    }
    else
    {
        $.ajax({
            type: "POST",
            url: "https://localhost:44373/api/User/login",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(item)
        }).done(function (data) {
            debugger;
            if (data != null && data.message != null && data.message != 'undefined') {
                alert(data.message);
            } else {
                localStorage.setItem("user", JSON.stringify(data));
                alert('Đăng nhập thành công')
                window.location.href = "TrangChu.html";
            }
           
        }) .fail(function() {
          alert('Thông tin tài khoản không chính xác');
        });
    }

};
function dangky123(){
    var username=$('#tk').val();
    var Password=$('#password').val();
    var Password2=$('#password2').val();
    var email2=$('#emailInput').val();
    console.log(username)
    if(username==""||Password==""||Password2==""||email2==""){
        alert('Bạn phải nhập đủ thông tin')
        return;
    }
    if(Password!=Password2){
        alert("Mật khẩu không trùng khớp")
        return;
    }
    else{
        $.ajax({
            type: "POST",
            url: current_url+"/api/User/create-account?username="+ username+"&password="+Password,
            
            contentType: 'text/plain'
        }).done(function (data) {
            debugger;
            if (data != null && data.message != null && data.message != 'undefined') {
                alert(data.message);
            } else {
                alert(data)
                
            }
    
        }).fail(function () {
            alert('lỗi');
        });
    }
    
}