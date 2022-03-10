import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError; //essa props não é uma simples string, por isso é necessário uma tipagem específica que vem de dentro do React Hook Form
}

//Para fazer o encaminhamento de "ref" é necessário transformar a função em "arrow function"
//A função vai receber a "ref" como segundo parâmetro

//TIPAGEM:
//Para fazer a tipagem da "ref" é necessário utilizar a tipagem que vem de dentro do React
//chamada "ForwardRefRenderFuncion"
//como parâmetro dessa tipagem é necessário passar o tipo de elemento que está sendo tratado,
//nesse caso foi um HTMLInputElement, e como segundo parâmetro da tipagem pode passar a tipagem das 
//props referente ao sua função
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps > = ({name, label, error, ...rest}, ref) => {
  return (
    //o sinal de duas esclamações "!!" transforma o "error" em um boolean, ou seja, se tiver um valor ela vira "true", se não, "false"
    //a propriedade isInvalid do Chakra está recebendo o error
    //e caso tenha algo dentro do error, o formControl terá um comportamento visual de invalidar
    //o submit do formulário
    <FormControl isInvalid={!!error} >
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        size="lg"
        _hover={{
          bgColor: "gray.900",
        }}
        ref={ref}
        {...rest}
      />

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

//Depois de transformar a função em "arrow function", é necessário exportar a função
//utilizando o método do React chamado "forwardRef" para conseguir receber a "ref"
//dentro do componente
export const Input = forwardRef(InputBase)
