import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import axios from "../api/axios";
import endpoints from "../api/endpoints";
import useAuth from "./useAuth";
import { WalletType } from "../types";
import React, { useState } from "react";


const useWallet = () => {
  const { auth } = useAuth();
  const toast = useToast();
  const initialWalletModal = {
    open: false,
    loading: false,
    data: {
      mnemonic: "",
      address: "",
    },
    error: {
      state: false,
      message: "",
    },
    seed: {
      copied: false,
      error: false,
    },
  };
  const [newWalletModal, setNewWalletModal] = useState(initialWalletModal);

  const getFetcher = async (): Promise<WalletType[]> => {
    return axios
      .get(endpoints.GET_ALL_ORG_WALLETS(auth.userId))
      .then((res) => res.data);
  };
  const { data: walletsData, error: walletsError, isLoading: walletsLoading, refetch: walletsRefetch} = useQuery('wallets', getFetcher)
  
  const createWallet = () => {
    setNewWalletModal({ ...initialWalletModal, open: true, loading: true });
    axios
      .post(endpoints.CREATE_WALLET(auth.userId))
      .then((res) => {
        let data = res.data;
        setNewWalletModal((prev) => ({ ...prev, data, loading: false }));
        walletsRefetch()
      })
      .catch((err) => {
        const errMessage =
          err?.response?.data?.message || "Please try again later";
        let error = {
          state: true,
          message: errMessage,
        };
        setNewWalletModal((prev) => ({ ...prev, error, loading: false }));
      });
  };

  const wallet = useQuery("wallet", getFetcher);

  return {wallet};


};

export default useWallet;
