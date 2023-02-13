export interface DataState<T> {
    loading: boolean;
    data: T | null;
    error: {
        state: boolean;
        errMessage: string;
    }
}

export interface Employee {
    firstName: string | null;
    lastName: string | null;
    id: string;
    wallet_address: string;
    salary: number | null;
    organisation: string;
}


