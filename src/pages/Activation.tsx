import { Center } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from '../api/axios';
import endpoints from '../api/endpoints';
import { storageService } from '../auth/storageService';
import AuthStatus from '../components/AuthStatus';

interface activationStateType {
  loading: boolean;
  data: {} | null;
  error: null | string;
}

const Activation = () => {

  const token = useParams().token;

  const [activation, setActivation] = useState<activationStateType>({
    loading: true,
    data: null,
    error: null,
  })

  const madeActivateCall = useRef(false)

  const activateAccount = () => {
    if (madeActivateCall.current) return
    if (token) {
      madeActivateCall.current = true
      storageService.removeData()
      axios.put(endpoints.ACTIVATE_ACCOUNT(token))
      .then(res => {
        console.log(res)
        setActivation({data: res.data, loading: false, error: null})
      })
      .catch(err => {
        let errMessage = err?.response?.data?.message || "Something went wrong"
        setActivation({data: null, loading: false, error: errMessage})
      })
    }
  }

  useEffect(() => {
    activateAccount()
  }, [])

  if (!token) {
    return <Center w="full" h="100vh">Not found</Center>
  }
  
  if (activation.loading) {
    return <Center w="full" h="100vh">Please wait while we activate your account</Center>
  }

  return (
    <AuthStatus 
      isError={Boolean(!activation.loading && activation.error)}
      text={activation.error? activation.error : "Account Successfuly Activated"}
      link={Boolean(!activation.loading && activation.error) ? undefined : "/login"}
      linkText='Login'
    />
  )
}

export default Activation