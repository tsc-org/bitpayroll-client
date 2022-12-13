import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from '../api/axios'
import plainAxios from 'axios'
import endpoints from '../api/endpoints'

const useUSDTOBTC = (value?: number) => {
  const getPrice = async () => {
    return plainAxios.get(endpoints.GET_BTC_PRICE()).then(res => res.data.data)
  }

  const [singlePrice, setSinglePrice] = useState<null | number>(null)

  const returnSinglePrice = (res: any) => {
    const prices = res.prices.map((priceInfo: {price: string}) => {
        let priceVal = Number(priceInfo.price)
        if (priceVal) return priceVal
        return
    })
    try {
        const med = value ? value / median(prices) : median(prices)
        med.toFixed(6)
        setSinglePrice(med)
    } catch (error) {
        price.refetch()
    }
  }

  const price = useQuery('USDTOBTC', getPrice, {
    onSuccess: (res) => {
        returnSinglePrice(res)
    }
  })

  return {price, singlePrice}
}

export default useUSDTOBTC

const median = (array: number[]) => {
    const _array = array.filter(price => typeof(price) === "number")
    if (_array.length === 0) {
        throw new Error("Invalid price")
    }
    _array.sort((a,b) => a - b)
    const even = Boolean(array.length % 2)
    
    if (_array.length === 1) return _array[0]
    if (!even) {
        return _array[Math.floor(_array.length/2)]
    } else {
        let secondIdx = Math.floor(_array.length/2)
        let firstIdx = secondIdx - 1
        return ((_array[firstIdx] + _array[secondIdx])/2)
    }
}