import React, { useContext, useState, useEffect } from 'react';
import { Box, Flex, Image, Heading, Text, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import UserContext from './UserContext';

const ProfilePage = () => {
    const user = useContext(UserContext);
    console.log('User context:', user);
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:3000/api/v1/users`)
                .then((response) => {
                    setProfileImage(response.data.profile_picture);
                })
                .catch((error) => console.error(error));
        }
    }, [user]);


    const handleImageUpload = async (event) => {
        if (user) {
            const selectedUploadFile = event.target.files[0];
            const avatarUploadData = new FormData();
            avatarUploadData.append('user[profile_picture]', selectedUploadFile);
            submitToApi(avatarUploadData);
        }
    };

    const submitToApi = (avatarUploadData) => {
        if (user) {
            const csrfToken = document.querySelector("[name='csrf-token']").content;
            axios.put(`http://localhost:3000/api/v1/users`, avatarUploadData, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            })
                .then((response) => {
                    setProfileImage(response.data.profile_picture);
                })
                .catch((error) => console.error(error));
        }
    };

    //temporarily hardcoded data
    const myQuestions = [
        {
            id: 1,
            title: 'How to use Chakra UI in a React application?',
            tags: ['React', 'Chakra UI'],
        },
        {
            id: 2,
            title: 'What are the best practices for building a RESTful API?',
            tags: ['API', 'Best Practices'],
        },
    ];

    const savedQuestions = [
        {
            id: 3,
            title: 'What is the difference between a SQL and NoSQL database?',
            tags: ['SQL', 'NoSQL', 'Database'],
        },
        {
            id: 4,
            title: 'What is the purpose of the useEffect Hook in React?',
            tags: ['React', 'useEffect', 'Hooks'],
        },
    ];

    return (
        <Box maxWidth="1200px" py={8}>
            <Flex>
                <Box align="center">
                    <Image src={profileImage} alt="profile pic" boxSize="200px" objectFit="cover" borderRadius="md" ml={3} mb={3} mr={5} />
                    <Button as="label" bg="#FFC108" color="white" size="sm" htmlFor="avatar">
                        Upload Image
                        <input id="avatar" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </Button>
                </Box>

                <Flex width="calc(100% - 220px)" justify="space-between">
                    <Box width="45%" maxHeight="600px" overflowY="auto">
                        <Heading as="h2" fontSize="2xl" mb={4}>
                            My Questions
                        </Heading>
                        {myQuestions.map((question) => (
                            <Box
                                key={question.id}
                                borderWidth="1px"
                                borderRadius="md"
                                p={2}
                                boxShadow="md"
                                mb={4}
                                height="100px"
                            >
                                <Heading as="h3" fontSize="lg" mb={1} noOfLines={1}>
                                    {question.title}
                                </Heading>
                                <Flex wrap="wrap">
                                    {question.tags.map((tag) => (
                                        <Text key={tag} mr={2} fontSize="sm" color="gray.500">
                                            #{tag}
                                        </Text>
                                    ))}
                                </Flex>
                            </Box>
                        ))}
                    </Box>

                    <Box width="45%" maxHeight="600px" overflowY="auto">
                        <Heading as="h2" fontSize="2xl" mb={4}>
                            Saved Questions
                        </Heading>
                        {savedQuestions.map((question) => (
                            <Box
                                key={question.id}
                                borderWidth="1px"
                                borderRadius="md"
                                p={2}
                                boxShadow="md"
                                mb={4}
                                height="100px"
                            >
                                <Heading as="h3" fontSize="lg" mb={1} noOfLines={1}>
                                    {question.title}
                                </Heading>
                                <Flex wrap="wrap">
                                    {question.tags.map((tag) => (
                                        <Text key={tag} mr={2} fontSize="sm" color="gray.500">
                                            #{tag}
                                        </Text>
                                    ))}
                                </Flex>
                            </Box>
                        ))}
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ProfilePage;
