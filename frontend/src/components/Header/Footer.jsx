import {
    ButtonGroup,
    IconButton,
    Stack,
    Text,
    Container,
  } from "@chakra-ui/react";
  import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
  import React from "react";
  
  function Footer() {
    return (
      <Container
        maxW="container.8xl"
        bg="blue.500"
        color="white"
        borderRadius="1"
        padding={8}
        marginTop={5}
      >
        <Stack justify="center" direction="row" display="flex" marginBottom={5}>
          <ButtonGroup variant="ghost">
            <IconButton
              target="_blank"
              as="a"
              href="https://www.linkedin.com/in/furkan-karakus/"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              target="_blank"
              as="a"
              href="https://github.com/m1erla"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              target="_blank"
              as="a"
              href="https://twitter.com/FurkanMierla"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize={10} color="subtle">
          &copy; {new Date().getFullYear()} Created By m1erla
        </Text>
      </Container>
    );
  }
  
  export default Footer;