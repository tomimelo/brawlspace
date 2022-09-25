import { Button, Center, Input, Text } from '@chakra-ui/react'

export const BrawlApp = () => {
  return (
    <>
      <Center bg='tomato' h='100px' color='white' >
        <Text fontSize='5xl'>BrawlApp</Text>
        <Input placeholder='large size' size='lg' />
        <Button>Search</Button>
      </Center>
    </>
  )
}
