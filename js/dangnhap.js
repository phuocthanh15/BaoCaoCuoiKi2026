$(document).ready(function () {
    let i = 1;

    function ktDangnhap() {
        let tendn = $("#txtTDN").val();
        // Sửa lại Regex giống file đăng ký để cho phép chữ hoa và số
        let btcq = /^[a-zA-Z0-9]+$/; 
        
        if (tendn === "") {
            $("#errTDN").html("Tên đăng nhập không được rỗng");
            return false;
        } else if (btcq.test(tendn)==false) {
            $("#errTDN").html("Tên đăng nhập không hợp lệ");
            $("#txtTDN").focus();
            return false;
        }
        $("#errTDN").html("(*)");
        return true;
    }

    $("#txtTDN").blur(function (e) {
        ktDangnhap();
    });
    
    function kiemtraMK() {
        let mk = $("#txtMKDN").val().trim();
        let reght = /^[A-Za-z0-9(!@#$%^&*()_ ]{6,20}$/;
        
        if (mk.length === 0) {
            $("#errMKDN").html("Mật khẩu không được để trống");
            $("#txtMKDN").focus();
            return false;
        } else if (reght.test(mk)==false) {
            $("#errMKDN").html("MK quá ngắn, không hợp lệ");
            $("#txtMKDN").focus();
            return false;
        }
        $("#errMKDN").html("(Hợp lệ)");
        return true;
    }

    $("#txtMKDN").blur(function (e) {
        kiemtraMK();
    });

    // Thêm chức năng xử lý đăng nhập
    $("form.form-control").submit(function (e) {
        e.preventDefault(); // Chặn tải lại trang

        let isTDN = ktDangnhap();
        let isMK = kiemtraMK();

        if (isTDN && isMK) {
            let tendn = $("#txtTDN").val();
            let matkhau = $("#txtMKDN").val().trim();

            // Lấy danh sách tài khoản từ localStorage
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Đối chiếu tên đăng nhập và mật khẩu
            let validUser = users.find(u => u.tendn === tendn && u.matkhau === matkhau);

            if (validUser) {
                alert("Đăng nhập thành công!");
                window.location.href = "../HTML/Homepage.html"; // Chuyển hướng về trang chủ
            } else {
                alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
            }
        }
    });
});