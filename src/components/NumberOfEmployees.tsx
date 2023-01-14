import { Spinner } from "@chakra-ui/react";
import { UseQueryResult } from "react-query";
import { Employee } from "../types";

const NumberOfEmployees = ({employees}: {employees: UseQueryResult<Employee[], unknown>}) => {
  if (employees.isLoading) return <Spinner size="xs" />;
  if (employees.isSuccess) return <span>{employees.data.length}</span>;
  return (
    <span>n/a</span>
  );
};

export default NumberOfEmployees