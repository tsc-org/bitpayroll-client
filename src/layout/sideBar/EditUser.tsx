import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomModal from "../../components/CustomModal";
import _ from "lodash";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import endpoints from "../../api/endpoints";
import customToast from "../../components/toasts";
import { useMutation } from "react-query";

const EditUser = ({open, close, data}: {open: boolean, close: () => void, data: any}) => {

    const {auth} = useAuth()
    const toast = useToast()
    const UserSchema = Yup.object().shape({
        orgName: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
      });

    
      const updateUser = async (body: {orgName: string}) => {
        return axios
          .put(endpoints.UPDATE_PROFILE(auth.userId), body)
          .then((res) => {
            toast({
                title: "Success",
                status: "success",
                isClosable: true,
            })
            return res
          })
          .catch((err) => {
            const errMessage =
              err?.response?.data?.message || "Please try again later";
              toast({
                title: "Unsuccessfull",
                status: "error",
                description: errMessage,
                isClosable: true,
            })
            return new Error(err)
          });
      };

      const updateMutation = useMutation(updateUser)

    const onSubmitUpdateUser = (values: {orgName: string}) => {
        updateMutation.mutate(values)
    }

    return (
        <CustomModal isOpen={open} handleClose={close} heading="Settings">
            <Formik
              initialValues={data}
              onSubmit={onSubmitUpdateUser}
              validationSchema={UserSchema}
            >
              {props => (
                <Form>
                  <Field name="orgName">
                    {(props: FieldProps) => (
                      <FormControl isInvalid={false}>
                        <FormLabel>Organisation Name</FormLabel>
                        <Input {...props.field} type="text" />
                        <FormErrorMessage>{`${props.form.errors?.orgName}`}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button mt="8" disabled={_.isEqual(data, props.values)} isLoading={updateMutation.isLoading} type="submit" >Update </Button>
                </Form>
              )}
            </Formik>
        </CustomModal>
    )
}

export default EditUser