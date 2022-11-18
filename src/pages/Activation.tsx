import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const activateAccount = () => {
      if (token) {
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
    activateAccount()
  }, [])

  if (!token) {
    return <div>Not found</div>
  }
  
  if (activation.loading) {
    return <div>Please wait while we activate your account</div>
  }

  return (
    <AuthStatus 
      isError={Boolean(!activation.loading && activation.error)}
      text={activation.error? activation.error : "Account Successfuly Activated"}
      link="/login"
      linkText='Login'
    />
  )
}

export default Activation