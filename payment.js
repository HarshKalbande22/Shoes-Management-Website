document.addEventListener('DOMContentLoaded', () => {
    const totalAmountElement = document.getElementById('total-amount');
    const totalAmount = localStorage.getItem('totalAmount') || '$0.00';
    totalAmountElement.innerText = totalAmount;

    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        // Here, you can handle the payment processing (e.g., integrating with a payment gateway)

        alert(`Payment successful! \nMethod: ${paymentMethod} \nTotal: ${totalAmount} \nMobile: ${mobile} \nEmail: ${email} \nAddress: ${address}`);
        // Redirect to a success page or back to the cart
    });
});
