$(document).ready(function () {
    let i = 1;

    function ktDangKY() {
    let tendn = $("#txtDN").val();
    let btcq = /^[a-zA-Z0-9]+$/; 
    
    if (tendn === "") {
        $("#errDN").html("Tên đăng nhập không được rỗng");
        return false;
    } else if (btcq.test(tendn) == false) {
        $("#errDN").html("Tên đăng nhập không hợp lệ");
        return false;
    }
    $("#errDN").html("(*)");
    return true;
    }

    $("#txtDN").blur(function (e) {
        ktDangKY();
    });
    function kiemtraMK() {
        let mk = $("#txtMK").val().trim();
        let reght = /^[A-Za-z0-9(!@#$%^&*()_ ]{6,20}$/;
        if (mk.length === 0) {
            $("#errMK").html("Mật khẩu không được để trống");
            $("#txtMK").focus();
            return false;
        } else if (reght.test(mk)==false) {
            $("#errMK").html("MK quá ngắn, không hợp lệ");
            $("#txtMK").focus();
            return false;
        }
        $("#errMK").html("(Hợp lệ)");
        return true;
    }

    $("#txtMK").blur(function () {
        kiemtraMK();
    });
    function kiemtraXN() {
        let mk = $("#txtMK").val().trim();
        let reght = /^[A-Za-z0-9(!@#$%^&*()_ ]{6,20}$/;
        let xn =$("#txtXNMK").val().trim();
        if (xn.length === 0) {
            $("#errXNMK").html("Mật khẩu không được để trống");
            $("#txtXNMK").focus();
            return false;
        } else if (reght.test(mk)==false) {
            $("#errXNMK").html("XNMK quá ngắn, không hợp lệ");
            $("#txtXNMK").focus();
            return false;
        }
         else if (xn != mk) {
        $("#errXNMK").html("XNMK không đúng");
        $("#txtXNMK").focus();
        return false;
    }
        $("#errXNMK").html("(Hợp lệ)");
        return true;
    }

    $("#txtXNMK").blur(function () {
        kiemtraXN();
    });

    function ktdiachi() {
    let dc = $("#txtDC").val();
    let btcq = /^[\p{L}0-9\s,.\/-]+$/u; 
    
    if (dc.trim() === "") {
        $("#errDC").html("Địa chỉ không được rỗng");
        return false;
    } else if (btcq.test(dc) == false) {
        $("#errDC").html("Địa chỉ không hợp lệ");
        $("#txtDC").focus();
        return false;
    }
    $("#errDC").html("(*)");
    return true;
    }

    $("#txtDC").blur(function (e) {
        ktdiachi();
    });

    function ktSDT() {
        let sdt = $("#txtSDT").val();
        let btcq = /^(03|09|08|07)[0-9]{8}$/;
        if (sdt === "") {
            $("#errSDT").html("Số điện thoại không được rỗng");
            return false;
        } else if (btcq.test(sdt)) {
            $("#errSDT").html("(*)");
            return true;
        } else {
            $("#errSDT").html("Số điện thoại có định dạng là 10 con số trong đó luôn bắt đầu 09,03,08 hoặc 07.");
            return false;
        }
    }

    $("#txtSDT").blur(function (e) {
        ktSDT();
    });

    function ktemail() {
        let em = $("#txtEmail").val();
        if (em === "") {
            $("#errEmail").html("Địa chỉ không được phép rỗng");
            return false;
        } else {
            $("#errEmail").html("(*)");
            return true;
        }
    }
    $("#txtEmail").blur(function (e) {
        ktemail();
    });
    $("form.form-control").submit(function (e) {
        e.preventDefault(); 

        let isDN = ktDangKY();
        let isMK = kiemtraMK();
        let isXN = kiemtraXN();
        let isDC = ktdiachi();
        let isSDT = ktSDT();
        let isEmail = ktemail();

        if (isDN && isMK && isXN && isDC && isSDT && isEmail) {
            let tendn = $("#txtDN").val();
            let matkhau = $("#txtMK").val();

            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            let isExist = users.some(u => u.tendn === tendn);
            if (isExist) {
                alert("Tên đăng nhập này đã tồn tại, vui lòng chọn tên khác!");
                $("#txtDN").focus();
                return;
            }

            users.push({ tendn: tendn, matkhau: matkhau });
            localStorage.setItem('users', JSON.stringify(users));

            alert("Đăng ký thành công! Chuyển hướng sang trang đăng nhập.");
            window.location.href = "../HTML/dangnhap.html";
        } else {
            alert("Vui lòng điền đúng và đầy đủ thông tin trước khi đăng ký!");
        }
    });
});