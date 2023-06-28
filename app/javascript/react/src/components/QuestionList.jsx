import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, Heading, Badge, Stack, Flex, IconButton, Text, Input, Button, Image } from '@chakra-ui/react';
import { IoMdHeart, IoMdHeartEmpty, IoMdClose } from 'react-icons/io';
import UserContext from './UserContext';

const QuestionList = () => {

  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  
  const user = useContext(UserContext);


  useEffect(() => {
    if (user) {
      fetchQuestions();
    }
  }, [user]);


  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/questions');
      const updatedQuestions = response.data.map((question) => ({
        ...question,
        liked_by_user: question.likes.some((like) => like.user_id === user.id),
      }));
      setQuestions(updatedQuestions);
      updatedQuestions.forEach(question => fetchComments(question.id));
    } catch (error) {
      console.error(error);
    }
  };


  const fetchComments = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/questions/${questionId}/comments`);
      setComments(prevComments => ({ ...prevComments, [questionId]: response.data }));
    } catch (error) {
      console.error(error);
    }
  };


  const handleToggleLike = async (questionId) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/questions/${questionId}/toggle_like`);
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };


  const handleAddComment = async (questionId) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/questions/${questionId}/comments`, { comment_body: newComments[questionId] });
      fetchComments(questionId);
      setNewComments(prevComments => ({ ...prevComments, [questionId]: '' }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (questionId, commentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/questions/${questionId}/comments/${commentId}`);
      fetchComments(questionId);
    } catch (error) {
      console.error(error);
    }
  };


  const handleToggleExpandComments = (questionId) => {
    setExpandedComments(prevExpanded => ({ ...prevExpanded, [questionId]: !prevExpanded[questionId] }));
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
            {question.image_urls && question.image_urls.map((url, index) => (
              <Flex justifyContent="center" alignItems="center" h="100%" w="100%" key={index}>
                <Image
                  src={url}
                  alt="Question related"
                  w="auto"
                  h="auto"
                  borderRadius={5}
                  objectFit="contain"
                  m={0}
                />
              </Flex>

            ))}
            <Flex align="center" mt={2}>
              <IconButton
                icon={question.liked_by_user ? <IoMdHeart /> : <IoMdHeartEmpty />}
                onClick={() => handleToggleLike(question.id)}
                aria-label="Toggle Like"
                colorScheme={question.liked_by_user ? 'red' : 'gray'}
                size="sm"
                mr={2}
              />
              <span>{question.likes.length}</span>
            </Flex>
            <Text mt={2}>Comments:</Text>
            <Stack spacing={2}>
              {(comments[question.id] || []).slice(0, expandedComments[question.id] ? undefined : 3).map(comment => (
                <Box key={comment.id} bg="gray.100" p={2} borderRadius="md" position="relative">
                  <Flex align="center" justify="space-between">
                    <Text fontSize="sm">{comment.username}: {comment.body}</Text>
                    {user && comment.user_id === user.id && (
                      <IconButton
                        icon={<IoMdClose />}
                        onClick={() => handleDeleteComment(question.id, comment.id)}
                        colorScheme="red"
                        size="sm"
                      />
                    )}
                  </Flex>
                </Box>
              ))}
              {
                comments[question.id] && comments[question.id].length > 3 &&
                <Button onClick={() => handleToggleExpandComments(question.id)}>
                  {expandedComments[question.id] ? 'Show Less' : 'Show More'}
                </Button>
              }
              <Input
                value={newComments[question.id] || ''}
                onChange={(e) => setNewComments(prevComments => ({ ...prevComments, [question.id]: e.target.value }))}
                placeholder="Add a comment"
              />
              <Button onClick={() => handleAddComment(question.id)} size="sm">Add Comment</Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default QuestionList;
