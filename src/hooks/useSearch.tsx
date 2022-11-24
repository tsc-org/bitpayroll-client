import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import React, { useState } from 'react'

const useSearch = ({searchFnc}: any) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchState, setSearchState] = useState(
        {
            loading: false,
            results: [],
            error: false,
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const onSearch = async () => {
        searchFnc(searchTerm)
    }
    
  return {results: searchState.results, searchTerm, handleChange }
}

export default useSearch