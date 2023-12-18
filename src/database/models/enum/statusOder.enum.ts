enum statusOrder{
    PENDING = 'PENDING', // supplier hasn't accepted yet
    ACCEPTED = 'ACCEPTED', // supplier has accepted
    REJECTED = 'REJECTED', // supplier has rejected
    CANCEL = 'CANCEL', // customer has canceled
    FINISHED = 'FINISHED', // customer has received
    SHIPPING = 'SHIPPING',
    WAITING = 'WAITING',
    PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
    PAYMENT_FAIL = 'PAYMENT_FAIL',
    SHIPPING_SUCCESS = 'SHIPPING_SUCCESS',
    SHIPPING_FAIL = 'SHIPPING_FAIL',
    SHIPPING_CANCEL = 'SHIPPING_CANCEL',
    SHIPPING_RETURN = 'SHIPPING_RETURN',
    OUT_OF_STOCK = 'OUT_OF_STOCK', // supplier has rejected
}

export default statusOrder;