import React from 'react'
import Card from '../../components/Card/Card'
import pebbleBg from "../../assets/images/pebbles-Box-svg.svg";
import walletIcon from "../../assets/icons/walletIcon.svg";
import axios from 'axios';
import endpoints from '../../api/endpoints';
import { useQuery } from 'react-query';
import { WalletType } from './wallet';
import { btcFormat } from '../../helpers/btcFormat';

interface walletBalanceRespone {
    network: string,
    address: string,
    confirmed_balance: string,
    unconfirmed_balance: string
}

const WalletCard = ({wallet, idx}: {wallet: WalletType, idx: number}) => {
    
    const fetcher = async() :Promise<walletBalanceRespone> => {
        return axios.get(endpoints.GET_WALLET_BALANCE(wallet.address)).then(res => res.data.data)
    }

    const walletBalance = useQuery(`walletBalance_${idx}`, fetcher)


  return (
    <Card
        imgSrc={pebbleBg}
        icon={walletIcon}
        bgColor="grey.200"
        title="Your wallet"
        value={btcFormat(walletBalance.data?.confirmed_balance)}
        actionText="Add funds"
        loading={walletBalance.isLoading}
    />
  )
}

export default WalletCard