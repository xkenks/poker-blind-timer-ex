import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import { usePokerStore } from '../store/pokerStore';

type ColorOption = {
  name: string;
  value: string;
  textColor: string;
};

export const DisplaySettings = () => {
  const { displaySettings, updateDisplaySettings } = usePokerStore();
  const [selectedBgColor, setSelectedBgColor] = React.useState<string>(displaySettings.backgroundColor);
  const [selectedTextColor, setSelectedTextColor] = React.useState<string>(displaySettings.textColor);

  const backgroundColors: ColorOption[] = [
    { name: 'Dark Gray', value: 'gray.900', textColor: 'white' },
    { name: 'Black', value: 'black', textColor: 'white' },
    { name: 'Navy', value: 'navy', textColor: 'white' },
    { name: 'Dark Blue', value: 'blue.900', textColor: 'white' },
    { name: 'Dark Purple', value: 'purple.900', textColor: 'white' },
    { name: 'Dark Green', value: 'green.900', textColor: 'white' },
    { name: 'Dark Red', value: 'red.900', textColor: 'white' },
    { name: 'Dark Orange', value: 'orange.900', textColor: 'white' },
    { name: 'Dark Teal', value: 'teal.900', textColor: 'white' },
    { name: 'Dark Cyan', value: 'cyan.900', textColor: 'white' },
  ];

  const textColors: ColorOption[] = [
    { name: 'Gray', value: 'gray.400', textColor: 'gray.400' },
    { name: 'White', value: 'white', textColor: 'white' },
    { name: 'Blue', value: 'blue.400', textColor: 'blue.400' },
    { name: 'Green', value: 'green.400', textColor: 'green.400' },
    { name: 'Yellow', value: 'yellow.400', textColor: 'yellow.400' },
    { name: 'Orange', value: 'orange.400', textColor: 'orange.400' },
    { name: 'Red', value: 'red.400', textColor: 'red.400' },
    { name: 'Purple', value: 'purple.400', textColor: 'purple.400' },
    { name: 'Teal', value: 'teal.400', textColor: 'teal.400' },
    { name: 'Cyan', value: 'cyan.400', textColor: 'cyan.400' },
  ];

  const handleBgColorChange = (color: string) => {
    setSelectedBgColor(color);
  };

  const handleTextColorChange = (color: string) => {
    setSelectedTextColor(color);
  };

  const handleApplySettings = () => {
    updateDisplaySettings({
      backgroundColor: selectedBgColor,
      textColor: selectedTextColor
    });
  };

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="md"
      borderColor="gray.200"
      borderWidth="1px"
      shadow="sm"
      width="100%"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Display Settings
      </Text>
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList mb={4}>
          <Tab>Background Color</Tab>
          <Tab>Text Color</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Text fontSize="md" mb={4}>
                Select the background color for the timer display
              </Text>
              <Flex wrap="wrap" gap={2}>
                {backgroundColors.map((color) => (
                  <Button
                    key={color.value}
                    bg={color.value}
                    color={color.textColor}
                    onClick={() => handleBgColorChange(color.value)}
                    size="sm"
                    width="100px"
                    height="60px"
                    border="2px solid"
                    borderColor={selectedBgColor === color.value ? "blue.400" : "transparent"}
                    _hover={{ opacity: 0.8 }}
                  >
                    {color.name}
                  </Button>
                ))}
              </Flex>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" mb={2}>Info Text Color</Text>
              <Text fontSize="sm" color="gray.500" mb={4}>
                This will change the color of PRIZE POOL, TOTAL PRIZE POOL, NEXT BREAK IN, AVG STACK, and PLAYERS text.
              </Text>
              <Flex wrap="wrap" gap={2}>
                {textColors.map((color) => (
                  <Button
                    key={color.value}
                    bg="gray.800"
                    color={color.value}
                    onClick={() => handleTextColorChange(color.value)}
                    size="sm"
                    width="100px"
                    height="60px"
                    border="2px solid"
                    borderColor={selectedTextColor === color.value ? "blue.400" : "transparent"}
                    _hover={{ opacity: 0.8 }}
                  >
                    {color.name}
                  </Button>
                ))}
              </Flex>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button
        mt={6}
        colorScheme="blue"
        size="md"
        onClick={handleApplySettings}
        width="full"
      >
        Apply Changes
      </Button>

      <Box mt={6}>
        <Text fontWeight="bold" mb={2}>Preview</Text>
        <Box
          p={4}
          borderRadius="md"
          bg={selectedBgColor}
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          <Text color={selectedTextColor} fontSize="sm">
            PRIZE POOL
          </Text>
          <Text color={selectedTextColor} fontSize="sm" mt={2}>
            TOTAL PRIZE POOL
          </Text>
          <Text color={selectedTextColor} fontSize="sm" mt={2}>
            NEXT BREAK IN
          </Text>
        </Box>
      </Box>
    </Box>
  );
}; 