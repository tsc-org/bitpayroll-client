export const btcFormat = (value: string | undefined, dp: number = 4) => {
    if (value) {
        return `${Number(value).toFixed(dp)} BTC`
    } 
    return '0 BTC'
}