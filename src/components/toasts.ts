import { useToast } from "@chakra-ui/react";

interface Props {
    isSuccess: boolean;
    title?: string;
    desc?: string;
    duration?: number;
}

const customToast = ({isSuccess, title, desc, duration}: Props) => {
    const toast = useToast()
    
    if (isSuccess) {
        return toast({
            title: title || "Success",
            description: desc || "",
            status: "success",
            duration: duration || 3000,
            isClosable: true,
          })
    }
    return toast({
        title: title || "Unsuccessful",
        description: desc,
        status: "error",
        duration: duration || 6000,
        isClosable: true,
      });
}

export default customToast