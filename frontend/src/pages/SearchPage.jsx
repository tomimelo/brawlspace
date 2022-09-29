import { Box, Button, Center, Input, Text } from '@chakra-ui/react'
import { useForm } from '../hooks'

export const SearchPage = () => {

  const { searchText, onInputChange, onResetForm } = useForm({ searchText: '' });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    console.log(searchText);
    onResetForm();
  }

  return (
    <>
        <Box bgGradient='linear(to-l, #7928CA, #FF0080)' height='100vh'>
            <Center height={"100vh"}>
                <Box 
                    bg='white' 
                    borderRadius="lg"
                    borderWidth='1px'
                    p={5} 
                    shadow='md' 
                >
                    <Text fontSize='5xl'>BrawlApp</Text>
                    <form onSubmit={onSearchSubmit} aria-label="form">
                    <Input
                        name="searchText"
                        value={searchText}
                        onChange={onInputChange}
                        placeholder='Search a profile'
                        size='lg'
                        mb={5}
                    />
                    <Button type="submit">Search</Button>
                    </form>
                </Box >
            </Center>
        </Box>
    </>
  )
}
