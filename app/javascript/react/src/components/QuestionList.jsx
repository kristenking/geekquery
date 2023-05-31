import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Badge, Stack } from '@chakra-ui/react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxWidth="600px" mx="auto" py={8}>
      <Heading as="h1" mb={8}>Questions</Heading>
      <Stack spacing={4}>
        {questions.map((question) => (
          <Box
            key={question.id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            boxShadow="md"
            _hover={{ boxShadow: 'lg' }}
          >
            <Heading as="h3" mb={2} fontSize="xl">{question.title}</Heading>
            <Badge colorScheme="red">{question.tag}</Badge>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Questions;
