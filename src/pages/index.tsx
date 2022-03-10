import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Button, Stack } from "@chakra-ui/react";
import { Input } from "../Components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { register,handleSubmit, formState } = useForm({
    resolver: yupResolver(schema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
  }

  console.log(errors)

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        direction="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input 
            name="email"
            type="email"
            label="E-mail" {...register("email")}
            error={errors.email}
            //dentro de errors existe outras mensagens, por isso é necessários
            //especificar que você quer o que está dentro de email, nesse caso
            />
          <Input
            name="password"
            type="password"
            label="Senha" {...register("password")}
            error={errors.password}
            //dentro de errors existe outras mensagens, por isso é necessários
            //especificar que você quer o que está dentro de password, nesse caso
            />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" isLoading={formState.isSubmitting} >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
