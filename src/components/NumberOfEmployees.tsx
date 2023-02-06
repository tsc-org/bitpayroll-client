import { Spinner } from "@chakra-ui/react";
import { UseQueryResult } from "react-query";
import { Employee } from "../types";

const NumberOfEmployees = ({employees}: {employees: UseQueryResult<Employee[], unknown>}) => {
  if (employees.isLoading) return <Spinner size="xs" />;
  if (employees.isSuccess) return <h1>{employees.data.length}.0</h1>;
  return (
    <h1 color="black">N/A</h1>
  );
};

export default NumberOfEmployees