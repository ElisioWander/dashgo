import { Button, Icon } from "@chakra-ui/react";
import { RiRefreshLine } from 'react-icons/ri'

interface RefetchButtonProps {
  handleRefetch: () => void
}

export function RefetchButton({ handleRefetch }:RefetchButtonProps) {
  return (
    <Button
      size="sm"
      bgColor="transparent"
      mr="4"
      _hover={{
        color: "pink",
      }}
      onClick={handleRefetch}
    >
      <Icon as={RiRefreshLine} fontSize="20" />
    </Button>
  );
}
