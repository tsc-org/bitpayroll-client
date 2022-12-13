const LOGIN = () : string => `auth/login`
const REGISTER_EMPLOYEE = () => `auth/register-employee`
const REGISTER_ORG = () => `auth/register-organisation`

const REQUEST_VERIFICATION = () => `/verification`
const ACTIVATE_ACCOUNT = (token : string) => `/auth/activate/${token}`

const CREATE_WALLET = (id: string) => `/org/create-wallet/${id}`
const GET_ALL_ORG_WALLETS = (id: string) => `org/list-wallet/${id}`
const GET_ALL_EMPLOYEES = (id: string) => `org/list-employee/${id}`
const GET_WALLET_BALANCE = (addr: string) => `https://chain.so/api/v2/get_address_balance/BTCTEST/${addr}`

const GET_BTC_PRICE = () => `https://chain.so/api/v2/get_price/BTC/USD`

const SEND_INVITE = (id: string) => `/org/invite-employee/${id}`
const SEND_PAYMENT = (id: string) => `/org/send-payment/${id}`

const CREATE_EMPLOYEE_WITH_INVITE = (inviteCode: string) => `/emp/update-details/${inviteCode}`
const UPDATE_PROFILE = (id: string) => `/org/org-update-profile/${id}`



export default {
    LOGIN,
    REGISTER_EMPLOYEE,
    REGISTER_ORG,
    REQUEST_VERIFICATION,
    ACTIVATE_ACCOUNT,
    CREATE_WALLET,
    GET_ALL_EMPLOYEES,
    GET_ALL_ORG_WALLETS,
    GET_WALLET_BALANCE,
    GET_BTC_PRICE,
    SEND_INVITE,
    CREATE_EMPLOYEE_WITH_INVITE,
    SEND_PAYMENT,
    UPDATE_PROFILE,
}