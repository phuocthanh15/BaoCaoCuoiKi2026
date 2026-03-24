document.addEventListener('DOMContentLoaded', function() {
    renderCart();
});

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartBody = document.getElementById('cart-body');
    let subTotalEl = document.getElementById('sub-total');
    let finalTotalEl = document.getElementById('final-total');

    if (!cartBody) return;

    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="6" class="text-center">Giỏ hàng trống</td></tr>';
        if (subTotalEl) subTotalEl.innerText = '0đ';
        if (finalTotalEl) finalTotalEl.innerText = 'Tổng tiền: 0đ';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
        <tr>
            <td><img src="${item.img}" width="80"></td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString('vi-VN')}đ</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="form-control" style="width:70px" onchange="updateQty(${index}, this.value)">
            </td>
            <td>${itemTotal.toLocaleString('vi-VN')}đ</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });

    cartBody.innerHTML = html;
    if (subTotalEl) subTotalEl.innerText = total.toLocaleString('vi-VN') + 'đ';
    if (finalTotalEl) finalTotalEl.innerText = 'Tổng tiền: ' + total.toLocaleString('vi-VN') + 'đ';
}

function updateQty(index, qty) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(qty) || 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}