import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import axios from "../api/axios";
import endpoints from "../api/endpoints";
import { Employee } from "../types";
import useAuth from "./useAuth";

const useEmployees = () => {
  const { auth } = useAuth();
  const toast = useToast();
  const getEmployees = async (): Promise<Employee[]> => {
    return axios
      .get(endpoints.GET_ALL_EMPLOYEES(auth.userId))
      .then((res) => res.data.employee)
      .catch((err) => err);
  };

  const sendInvite = async (body: {email: string, salary: number}) => {
    return axios
      .post(endpoints.SEND_INVITE(auth.userId), body)
      .then((res) => {
        toast({
          title: "Success",
          description: `Invite sent to ${body.email} `,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return res
      })
      .catch((err) => {
        const errMessage =
          err?.response?.data?.message || "Please try again later";
        toast({
          title: "Unable to send invite",
          description: errMessage,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        return new Error(err)
      });
  };

  const employees = useQuery("employees", getEmployees);

  const inviteEmployee = useMutation(sendInvite)

  return {employees, inviteEmployee};
};

export default useEmployees;
