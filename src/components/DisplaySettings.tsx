import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  useToast,
  Switch,
  FormControl,
  FormLabel,
  Grid,
  Badge,
  Divider,
  Icon,
  Tooltip,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';
import { usePokerStore } from '../store/pokerStore';
import { useTranslation } from '../utils/translations';
import { InfoIcon } from '@chakra-ui/icons';
import { SoundType, updateSoundSettings as updateGlobalSoundSettings, playWarningSound as previewWarningSound, initAudio } from '../utils/soundUtils';

type ColorOption = {
  name: string;
  value: string;
  textColor: string;
};

export const DisplaySettings = () => {
  const t = useTranslation();
  const { displaySettings, updateDisplaySettings, updateSoundSettings } = usePokerStore();
  const [selectedBgColor, setSelectedBgColor] = React.useState<string>(displaySettings.backgroundColor);
  const [selectedTextColor, setSelectedTextColor] = React.useState<string>(displaySettings.textColor);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(displaySettings.soundEnabled);
  const [warningSoundType, setWarningSoundType] = useState<SoundType>(
    displaySettings.warningSoundType || SoundType.CASINO
  );
  const [levelChangeSoundType, setLevelChangeSoundType] = useState<SoundType>(
    displaySettings.levelChangeSoundType || SoundType.CASINO
  );
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState<boolean>(false);
  const toast = useToast();

  // コンポーネントマウント時に現在の設定を表示
  useEffect(() => {
    console.log("DisplaySettings - マウント時の設定:", {
      backgroundColor: displaySettings.backgroundColor,
      textColor: displaySettings.textColor,
      soundEnabled: displaySettings.soundEnabled,
      warningSoundType: displaySettings.warningSoundType,
      levelChangeSoundType: displaySettings.levelChangeSoundType
    });
    
    // マウント時に効果音の設定を更新
    if (displaySettings.warningSoundType) {
      updateGlobalSoundSettings(
        displaySettings.warningSoundType,
        displaySettings.levelChangeSoundType || SoundType.CASINO
      );
    }
  }, [displaySettings]);

  // ユーザーインタラクションでオーディオを初期化する関数
  const ensureAudioInitialized = () => {
    if (!isAudioInitialized) {
      console.log("ユーザーインタラクションによりオーディオを初期化します");
      const success = initAudio();
      setIsAudioInitialized(success);
      return success;
    }
    return true;
  };

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

  // 効果音タイプが変更されたときに呼び出される
  const handleWarningSoundChange = (value: SoundType) => {
    console.log(`Warning sound changed to: ${value}`);
    setWarningSoundType(value);
    
    // オーディオの初期化を確認
    ensureAudioInitialized();
    
    // すぐに効果音の設定を更新
    updateGlobalSoundSettings(value, levelChangeSoundType);
  };

  const handleApplySettings = () => {
    console.log("handleApplySettings が呼び出されました");
    
    // オーディオの初期化を確認
    if (soundEnabled) {
      ensureAudioInitialized();
    }
    
    const newSettings = {
      backgroundColor: selectedBgColor,
      textColor: selectedTextColor,
      backgroundImage: displaySettings.backgroundImage || '',
      backgroundImageOptions: displaySettings.backgroundImageOptions || {
        opacity: 0.5,
        blur: 0
      },
      soundEnabled: soundEnabled,
      warningSoundType: warningSoundType,
      levelChangeSoundType: levelChangeSoundType // 既存の値を保持
    };
    
    console.log("保存する設定:", {
      backgroundColor: newSettings.backgroundColor,
      textColor: newSettings.textColor,
      soundEnabled: newSettings.soundEnabled,
      warningSoundType: newSettings.warningSoundType
    });
    
    try {
      // 設定を更新
      updateDisplaySettings(newSettings);
      
      // グローバルな音声設定も更新
      updateGlobalSoundSettings(warningSoundType, levelChangeSoundType);
      
      // ストアの音声設定も更新
      updateSoundSettings(warningSoundType, levelChangeSoundType);
      
      console.log("Sound settings updated to:", {
        warning: warningSoundType,
        levelChange: levelChangeSoundType
      });
      
      toast({
        title: "Settings updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // 効果音をプレビュー再生する関数
  const playSoundPreview = (type: SoundType, isWarningSound: boolean) => {
    if (isPreviewPlaying) return;
    
    try {
      console.log(`Preview sound: ${type}`);
      
      // オーディオコンテキストが初期化されていることを確認
      const initialized = ensureAudioInitialized();
      if (!initialized) {
        console.error('オーディオの初期化に失敗したため、プレビューを再生できません');
        toast({
          title: "エラー",
          description: "音声の再生に失敗しました。ブラウザの設定を確認してください。",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      
      // プレビュー中フラグをセット
      setIsPreviewPlaying(true);
      
      // 一時的にグローバル設定を更新して、プレビュー音を鳴らす
      updateGlobalSoundSettings(type, levelChangeSoundType);
      
      // プレビュー用に実際の警告音を鳴らす
      if (isWarningSound) {
        previewWarningSound();
      }
      
      // 2秒後にフラグをリセット（音の再生が終わるまでの十分な時間）
      setTimeout(() => {
        setIsPreviewPlaying(false);
      }, 2000);
    } catch (error) {
      console.error('音のプレビュー中にエラーが発生しました:', error);
      // エラー発生時にもフラグをリセット
      setIsPreviewPlaying(false);
      
      toast({
        title: "エラー",
        description: "音声のプレビュー中にエラーが発生しました。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg="white"
      p={[4, 5, 6]}
      borderRadius="lg"
      borderColor="gray.200"
      borderWidth="1px"
      shadow="md"
      width="100%"
      maxWidth={["100%", "100%", "600px", "800px"]}
      mx="auto"
    >
      <Flex align="center" mb={6}>
        <Text fontSize={["xl", "2xl"]} fontWeight="bold">
          {t('displaySettings')}
        </Text>
        <Badge ml={3} colorScheme="blue" fontSize="sm">
          {t('customization')}
        </Badge>
      </Flex>

      <Tabs variant="soft-rounded" colorScheme="blue" size={["sm", "md"]}>
        <TabList 
          mb={4} 
          overflowX="auto" 
          flexWrap={["nowrap", "nowrap", "wrap"]} 
          width="100%"
          sx={{
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'gray.100',
              borderRadius: 'full',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'blue.400',
              borderRadius: 'full',
            },
          }}
        >
          <Tab 
            fontSize={["xs", "sm", "md"]}
            px={[3, 4, 5]}
            py={[2, 3]}
            borderRadius="full"
            _selected={{ 
              bg: 'blue.100',
              color: 'blue.700',
              fontWeight: 'semibold'
            }}
          >
            Background
          </Tab>
          <Tab 
            fontSize={["xs", "sm", "md"]}
            px={[3, 4, 5]}
            py={[2, 3]}
            borderRadius="full"
            _selected={{ 
              bg: 'blue.100',
              color: 'blue.700',
              fontWeight: 'semibold'
            }}
          >
            {t('textColor')}
          </Tab>
          <Tab 
            fontSize={["xs", "sm", "md"]}
            px={[3, 4, 5]}
            py={[2, 3]}
            borderRadius="full"
            _selected={{ 
              bg: 'blue.100',
              color: 'blue.700',
              fontWeight: 'semibold'
            }}
          >
            Sound
          </Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Flex align="center" mb={2}>
                <Text fontSize={["sm", "md"]} fontWeight="semibold">
                  {t('backgroundColor')}
                </Text>
                <Tooltip label="Choose a dark background color for better visibility" hasArrow>
                  <Icon as={InfoIcon} ml={2} color="blue.500" />
                </Tooltip>
              </Flex>
              <Grid 
                templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)", "repeat(5, 1fr)"]}
                gap={3}
              >
                {backgroundColors.map((color) => (
                  <Button
                    key={color.value}
                    bg={color.value}
                    color={color.textColor}
                    onClick={() => handleBgColorChange(color.value)}
                    height={["50px", "60px"]}
                    border="2px solid"
                    borderColor={selectedBgColor === color.value ? "blue.400" : "transparent"}
                    _hover={{ 
                      opacity: 0.8,
                      transform: "scale(1.05)",
                      transition: "all 0.2s"
                    }}
                    fontSize={["xs", "sm"]}
                    fontWeight="medium"
                    boxShadow={selectedBgColor === color.value ? "md" : "none"}
                    transition="all 0.2s"
                  >
                    {color.name}
                  </Button>
                ))}
              </Grid>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Box>
                <Flex align="center" mb={2}>
                  <Text fontSize={["sm", "md"]} fontWeight="semibold">
                    {t('textColor')}
                  </Text>
                  <Tooltip label="This color will be used for important information text" hasArrow>
                    <Icon as={InfoIcon} ml={2} color="blue.500" />
                  </Tooltip>
                </Flex>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  Affects PRIZE POOL, TOTAL PRIZE POOL, NEXT BREAK IN, AVG STACK, and PLAYERS text
                </Text>
              </Box>
              <Grid 
                templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)", "repeat(5, 1fr)"]}
                gap={3}
              >
                {textColors.map((color) => (
                  <Button
                    key={color.value}
                    bg="gray.800"
                    color={color.value}
                    onClick={() => handleTextColorChange(color.value)}
                    height={["50px", "60px"]}
                    border="2px solid"
                    borderColor={selectedTextColor === color.value ? "blue.400" : "transparent"}
                    _hover={{ 
                      opacity: 0.8,
                      transform: "scale(1.05)",
                      transition: "all 0.2s"
                    }}
                    fontSize={["xs", "sm"]}
                    fontWeight="medium"
                    boxShadow={selectedTextColor === color.value ? "md" : "none"}
                    transition="all 0.2s"
                  >
                    {color.name}
                  </Button>
                ))}
              </Grid>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={6} align="stretch">
              <FormControl 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between"
                bg="blue.50"
                p={4}
                borderRadius="md"
                borderWidth="2px"
                borderColor="blue.200"
                boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
                _hover={{ 
                  borderColor: "blue.300",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.15)" 
                }}
                transition="all 0.2s"
              >
                <Box>
                  <FormLabel htmlFor="sound-toggle" mb={1} fontSize={["md", "lg"]} fontWeight="bold" color="blue.700">
                    Sound Effects
                  </FormLabel>
                  <Text fontSize={["xs", "sm"]} color="blue.600" fontWeight="medium">
                    Play notification sound when timer ends
                  </Text>
                </Box>
                <Switch
                  id="sound-toggle"
                  isChecked={soundEnabled}
                  onChange={(e) => {
                    setSoundEnabled(e.target.checked);
                    if (e.target.checked) {
                      ensureAudioInitialized();
                    }
                  }}
                  size="lg"
                  colorScheme="blue"
                  sx={{
                    '& span[data-checked]': { 
                      backgroundColor: 'blue.500',
                      boxShadow: '0 0 5px rgba(66, 153, 225, 0.6)'
                    },
                    '& span:not([data-checked])': { 
                      backgroundColor: 'gray.300',
                      boxShadow: '0 0 5px rgba(160, 174, 192, 0.6)'
                    },
                    transform: 'scale(1.2)',
                    '& span': {
                      border: '2px solid',
                      borderColor: 'gray.200',
                    }
                  }}
                />
              </FormControl>

              {soundEnabled && (
                <>
                  <Box
                    bg="gray.50"
                    p={4}
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Text fontSize={["sm", "md"]} fontWeight="semibold" mb={3}>
                      Timer End Sound
                    </Text>
                    <RadioGroup 
                      onChange={(value) => handleWarningSoundChange(value as SoundType)} 
                      value={warningSoundType}
                      mb={4}
                    >
                      <Stack direction="column" spacing={3}>
                        <Flex 
                          as="label" 
                          borderWidth="1px" 
                          borderRadius="md" 
                          borderColor="gray.200"
                          p={3}
                          cursor="pointer"
                          bg={warningSoundType === SoundType.CASINO ? "blue.50" : "white"}
                          _hover={{ bg: "gray.100" }}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Radio value={SoundType.CASINO} colorScheme="blue">
                              Casino
                            </Radio>
                            <Text fontSize="xs" color="gray.600" ml={6} mt={1}>
                              Poker chips, cards and victory sounds
                            </Text>
                          </Box>
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.preventDefault();
                              playSoundPreview(SoundType.CASINO, true);
                            }}
                            colorScheme="blue"
                            variant="outline"
                            isDisabled={isPreviewPlaying}
                          >
                            Preview
                          </Button>
                        </Flex>
                        
                        <Flex 
                          as="label" 
                          borderWidth="1px" 
                          borderRadius="md" 
                          borderColor="gray.200"
                          p={3}
                          cursor="pointer"
                          bg={warningSoundType === SoundType.SIMPLE ? "blue.50" : "white"}
                          _hover={{ bg: "gray.100" }}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Radio value={SoundType.SIMPLE} colorScheme="blue">
                              Simple
                            </Radio>
                            <Text fontSize="xs" color="gray.600" ml={6} mt={1}>
                              Short and simple notification sound
                            </Text>
                          </Box>
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.preventDefault();
                              playSoundPreview(SoundType.SIMPLE, true);
                            }}
                            colorScheme="blue"
                            variant="outline"
                            isDisabled={isPreviewPlaying}
                          >
                            Preview
                          </Button>
                        </Flex>
                        
                        <Flex 
                          as="label" 
                          borderWidth="1px" 
                          borderRadius="md" 
                          borderColor="gray.200"
                          p={3}
                          cursor="pointer"
                          bg={warningSoundType === SoundType.DIGITAL ? "blue.50" : "white"}
                          _hover={{ bg: "gray.100" }}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Radio value={SoundType.DIGITAL} colorScheme="blue">
                              Digital
                            </Radio>
                            <Text fontSize="xs" color="gray.600" ml={6} mt={1}>
                              Electronic beep sound
                            </Text>
                          </Box>
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.preventDefault();
                              playSoundPreview(SoundType.DIGITAL, true);
                            }}
                            colorScheme="blue"
                            variant="outline"
                            isDisabled={isPreviewPlaying}
                          >
                            Preview
                          </Button>
                        </Flex>
                      </Stack>
                    </RadioGroup>
                  </Box>
                </>
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Divider my={6} />

      <Box mb={6}>
        <Flex align="center" mb={3}>
          <Text fontWeight="semibold" fontSize={["sm", "md"]}>Preview</Text>
          <Badge ml={2} colorScheme="green" variant="subtle">Live</Badge>
        </Flex>
        <Box
          position="relative"
          p={5}
          borderRadius="lg"
          bg={selectedBgColor}
          border="1px solid"
          borderColor="whiteAlpha.200"
          overflow="hidden"
          minHeight="120px"
          height="auto"
          transition="all 0.3s"
        >
          <Box position="relative" zIndex={1}>
            <Text color={selectedTextColor} fontSize={["sm", "md"]} mb={3} fontWeight="medium">
              PRIZE POOL
            </Text>
            <Text color={selectedTextColor} fontSize={["sm", "md"]} mb={3} fontWeight="medium">
              TOTAL PRIZE POOL
            </Text>
            <Text color={selectedTextColor} fontSize={["sm", "md"]} fontWeight="medium">
              NEXT BREAK IN
            </Text>
          </Box>
        </Box>
      </Box>

      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleApplySettings}
        width="full"
        height="56px"
        fontSize={["sm", "md"]}
        fontWeight="bold"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        transition="all 0.2s"
      >
        Apply Changes
      </Button>
    </Box>
  );
}; 