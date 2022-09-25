import { Button, Container, Input, Text } from '@chakra-ui/react'
import { useForm } from './hooks'

export const BrawlApp = () => {

  const { searchText, onInputChange, onResetForm } = useForm({searchText: ''});

  const onSearchSubmit = (event) => {
    event.preventDefault();
    console.log(searchText);
    onResetForm();
  }

  return (
    <>
      <Container maxW='container.lg' >
        <Text fontSize='5xl'>BrawlApp</Text>
        <form onSubmit={ onSearchSubmit } aria-label="form">
          <Input 
            name="searchText" 
            value={ searchText } 
            onChange={ onInputChange } 
            placeholder='Busca tu perfil' 
            size='lg' 
          />
          <Button type="submit">Search</Button>
        </form>
      </Container >
    </>
  )
}
