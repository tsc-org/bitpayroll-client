const LOGIN = () : string => `auth/login`
const REGISTER_EMPLOYEE = () => `auth/register-employee`
const REGISTER_ORG = () => `auth/register-organisation`

const REQUEST_VERIFICATION = () => `/verification`
const ACTIVATE_ACCOUNT = (token : string) => `/auth/activate/?token=${token}`

export default {
    LOGIN,
    REGISTER_EMPLOYEE,
    REGISTER_ORG,
    REQUEST_VERIFICATION,
    ACTIVATE_ACCOUNT,
}