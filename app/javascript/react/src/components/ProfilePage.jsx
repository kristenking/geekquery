import React, { useContext, useState } from 'react';
import { Box, Flex, Image, Heading, Text, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import UserContext from './UserContext';

const ProfilePage = () => {
    const user = useContext(UserContext);
    const [profileImage, setProfileImage] = useState(user.avatar);

    const handleImageUpload = async (event) => {
        const selectedUploadFile = event.target.files[0];
        const avatarUploadData = new FormData();
        avatarUploadData.append('user[avatar]', selectedUploadFile);

        try {
            const response = await axios.put('http://localhost:3000/api/v1/users', avatarUploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setProfileImage(response.data.avatar);
            }
        } catch (error) {
            console.error(error);
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
                    <Image src={profileImage} alt="profile pic" boxSize="200px" objectFit="cover" borderRadius="md" ml={3} />
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
