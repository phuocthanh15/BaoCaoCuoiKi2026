document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-add-to-cart, .btn-order').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            let productItem = this.closest('.product-item');
            let name = productItem.querySelector('p').innerText;
            let priceText = productItem.querySelector('.product-price').innerText;
            let price = parseInt(priceText.replace(/\D/g, ''));
            let imgSource = productItem.querySelector('.product-image').src;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            let existingProductIndex = cart.findIndex(item => item.name === name);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    img: imgSource,
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            window.location.href = '../HTML/Giohang.html';
        });
    });
});