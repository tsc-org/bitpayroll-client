
export interface MockData {
    data: MockDataSingle[]
}
export interface MockDataSingle {
    firstName: string;
    lastName: string;
    id: string | number;
    address: string;
}



const data = [
    {firstName: "Erwin", lastName: "Yeager", id: 1, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 2, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 3, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 4, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 5, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 6, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 7, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 8, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 9, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 10, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 11, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 12, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 13, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 13, address: "3437schbn13uSHJ8978247" },
    {firstName: "Erwin", lastName: "Yeager", id: 14, address: "3437schbn13uSHJ8978247" },
]

export const getData = async() => {
    const response: MockDataSingle[] = [...data]
    setTimeout(() => {
    }, 5000);
    return response
}
