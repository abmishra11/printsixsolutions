export const generateCouponCode = (title='', expiryDate='') => {
    const formattedTitle = title.toUpperCase().replace(/\s+/g, '');

    const formattedExpiryDate = expiryDate
                                .split('-')
                                .reverse()
                                .join('');

    const couponCode = `${formattedTitle}-${formattedExpiryDate}`;

    return couponCode;
}