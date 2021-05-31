import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51IvHIBSFzFXT8shLyNva0QewrelE3zzNpCiY4wo8ihoQupq8ore6QXsS8J8ck2sT3e3jM7JVKl9n5i9AMQiyf5Bh00rNImwp9P'

    const onToken = (token) => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label={`Pay $${price}`}
            name='CROWN SHOPPING Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}

        />
    )
}

export default StripeCheckoutButton