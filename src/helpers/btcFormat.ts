export const btcFormat = (value: string | undefined) => {
    if (value) {
        return `${Number(value).toFixed(4)} BTC`
    } 
    return '0 BTC'
}