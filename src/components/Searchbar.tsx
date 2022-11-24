import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"
import { MdSearch } from "react-icons/md"


const SearchBar = ({searchTerm, handleChange, ...props}: any) => {
    return (
        <>
            <InputGroup w="auto" display={{base: "none", md: "block"}}>
                <InputLeftElement
                    bgColor="transparent"
                    pointerEvents='none'
                    children={<MdSearch color='grey.100' />}
                />
                <Input type='text' {...props} value={searchTerm} onChange={handleChange} />
            </InputGroup>
        </>
    )
}


export default SearchBar