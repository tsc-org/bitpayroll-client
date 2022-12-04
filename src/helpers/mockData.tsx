import { Employee } from "../types";

export interface MockData {
    data: Employee[]
}

// const data = [
//     {firstName: "Erwin", lastName: "Yeager", id: 1, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 2, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 3, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 4, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 5, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 6, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 7, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 8, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 9, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 10, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 11, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 12, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 13, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 13, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
//     {firstName: "Erwin", lastName: "Yeager", id: 14, wallet_address: "3437schbn13uSHJ8978247", salary: null, organisation: "Noel Inc" },
// ]

// export const getData = async() => {
//     const response: Employee[] = [...data]
//     setTimeout(() => {
//     }, 5000);
//     return response
// }
