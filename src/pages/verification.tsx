import AuthStatus from '../components/AuthStatus'

const Verification = () => {
  return (
    <AuthStatus
      isError={false}
      text="Your account was created. Please confirm your email to continue"
      link='/dashboard'
      linkText='Go to Dashboard'
    />
  )
}

export default Verification