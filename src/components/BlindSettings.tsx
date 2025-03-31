'use client'

import React, { useState, useCallback, memo, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Grid,
  FormControl,
  FormLabel,
  Divider,
  Flex,
  ButtonGroup,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, CheckIcon, ChevronUpIcon, ChevronDownIcon, DragHandleIcon } from '@chakra-ui/icons';
import { usePokerStore, BlindLevel, Tournament } from '../store/pokerStore';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator } from 'react-icons/md';

const BlindLevelRow = memo(({ 
  level, 
  onUpdate, 
  onDelete 
}: { 
  level: BlindLevel; 
  onUpdate: (id: number, updates: Partial<BlindLevel>) => void;
  onDelete: (id: number) => void;
}) => (
  <Tr>
    <Td>{level.id}</Td>
    <Td>
      <NumberInput
        value={level.smallBlind}
        onChange={(_, value) => onUpdate(level.id, { smallBlind: value })}
        min={0}
        step={100}
      >
        <NumberInputField 
          textAlign="right"
          paddingRight="8px"
          fontSize={["13px", "14px"]}
        />
      </NumberInput>
    </Td>
    <Td>
      <NumberInput
        value={level.bigBlind}
        onChange={(_, value) => onUpdate(level.id, { bigBlind: value })}
        min={0}
        step={100}
      >
        <NumberInputField 
          textAlign="right"
          paddingRight="8px"
          fontSize={["13px", "14px"]}
        />
      </NumberInput>
    </Td>
    <Td>
      <NumberInput
        value={level.ante}
        onChange={(_, value) => onUpdate(level.id, { ante: value })}
        min={0}
        step={100}
      >
        <NumberInputField 
          textAlign="right"
          paddingRight="8px"
          fontSize={["13px", "14px"]}
        />
      </NumberInput>
    </Td>
    <Td>
      <NumberInput
        value={level.duration}
        onChange={(_, value) => onUpdate(level.id, { duration: value })}
        min={1}
        max={120}
      >
        <NumberInputField 
          textAlign="right"
          paddingRight="8px"
          fontSize={["13px", "14px"]}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Td>
    <Td>
      <IconButton
        aria-label="Delete level"
        icon={<DeleteIcon />}
        colorScheme="red"
        variant="ghost"
        onClick={() => onDelete(level.id)}
      />
    </Td>
  </Tr>
));

BlindLevelRow.displayName = 'BlindLevelRow';

const SavedTournamentRow = memo(({ 
  tournament, 
  onLoad, 
  onDeleteClick 
}: { 
  tournament: Tournament; 
  onLoad: (id: string) => void;
  onDeleteClick: (id: string) => void;
}) => (
  <Tr>
    <Td>{tournament.name}</Td>
    <Td>{new Date(tournament.createdAt).toLocaleString()}</Td>
    <Td>
      <HStack spacing={2}>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => onLoad(tournament.id)}
        >
          Load
        </Button>
        <IconButton
          aria-label="Delete tournament"
          icon={<DeleteIcon />}
          colorScheme="red"
          variant="ghost"
          size="sm"
          onClick={() => onDeleteClick(tournament.id)}
        />
      </HStack>
    </Td>
  </Tr>
));

SavedTournamentRow.displayName = 'SavedTournamentRow';

interface SortableItemProps {
  id: string;
  level: number;
  sb: number;
  bb: number;
  ante: number;
  time: number;
  isBreak?: boolean;
  onDelete: () => void;
  onSbChange: (value: number) => void;
  onBbChange: (value: number) => void;
  onAnteChange: (value: number) => void;
  onTimeChange: (value: number) => void;
}

const SortableItem = ({
  id,
  level,
  sb,
  bb,
  ante,
  time,
  isBreak,
  onDelete,
  onSbChange,
  onBbChange,
  onAnteChange,
  onTimeChange,
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <HStack 
      ref={setNodeRef} 
      style={style} 
      spacing={4} 
      position="relative"
      minW="800px"
      px={4}
      py={3}
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      _hover={{ 
        borderColor: "blue.200"
      }}
      transition="all 0.2s"
      boxShadow={isDragging ? "lg" : "none"}
      borderColor={isDragging ? "blue.400" : "gray.200"}
    >
      <Box
        {...attributes}
        {...listeners}
        cursor="grab"
        _active={{ cursor: "grabbing" }}
        p={2}
        borderRadius="md"
        _hover={{ 
          bg: "gray.100"
        }}
        display="flex"
        alignItems="center"
      >
        <Icon 
          as={MdDragIndicator} 
          boxSize={6} 
          color="gray.400"
        />
      </Box>
      <Text w="50px" textAlign="center" color={isBreak ? "blue.500" : "inherit"} fontWeight={isBreak ? "bold" : "normal"}>
        {isBreak ? "Break" : level}
      </Text>
      {isBreak ? (
        <>
          <Box w="120px" />
          <Box w="120px" />
          <Box w="120px" />
          <NumberInput
            value={time}
            onChange={(_, value) => onTimeChange(value)}
            min={0}
            w="120px"
            size="lg"
          >
            <NumberInputField
              fontSize="16px"
              textAlign="right"
              paddingRight="8px"
              height="44px"
            />
          </NumberInput>
        </>
      ) : (
        <>
          <NumberInput
            value={sb}
            onChange={(_, value) => onSbChange(value)}
            min={0}
            w="120px"
            size="lg"
          >
            <NumberInputField
              fontSize="16px"
              textAlign="right"
              paddingRight="8px"
              height="44px"
            />
          </NumberInput>
          <NumberInput
            value={bb}
            onChange={(_, value) => onBbChange(value)}
            min={0}
            w="120px"
            size="lg"
          >
            <NumberInputField
              fontSize="16px"
              textAlign="right"
              paddingRight="8px"
              height="44px"
            />
          </NumberInput>
          <NumberInput
            value={ante}
            onChange={(_, value) => onAnteChange(value)}
            min={0}
            w="120px"
            size="lg"
          >
            <NumberInputField
              fontSize="16px"
              textAlign="right"
              paddingRight="8px"
              height="44px"
            />
          </NumberInput>
          <NumberInput
            value={time}
            onChange={(_, value) => onTimeChange(value)}
            min={0}
            w="120px"
            size="lg"
          >
            <NumberInputField
              fontSize="16px"
              textAlign="right"
              paddingRight="8px"
              height="44px"
            />
          </NumberInput>
        </>
      )}
      <IconButton
        aria-label="Delete blind level"
        icon={<DeleteIcon />}
        onClick={onDelete}
        colorScheme="red"
        variant="ghost"
      />
    </HStack>
  );
};

export const BlindSettings = memo(() => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [newTournamentName, setNewTournamentName] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [displayName, setDisplayName] = useState('Tournament');
  const [activeId, setActiveId] = useState<string | null>(null);

  const { blindLevels, updateBlindLevels, deleteBlindLevel, addBreak } = usePokerStore();
  const savedTournaments = usePokerStore(state => state.savedTournaments);
  const saveTournament = usePokerStore(state => state.saveTournament);
  const loadTournament = usePokerStore(state => state.loadTournament);
  const deleteTournament = usePokerStore(state => state.deleteTournament);
  const tournamentName = usePokerStore(state => state.tournamentName);
  const setTournamentName = usePokerStore(state => state.setTournamentName);

  useEffect(() => {
    setMounted(true);
    setNewTournamentName(tournamentName);
    setDisplayName(tournamentName);
  }, [tournamentName]);

  const handleTournamentNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewTournamentName(name);
    setDisplayName(name);
    setTournamentName(name);
  }, [setTournamentName]);

  const handleDelete = (index: number) => {
    deleteBlindLevel(index);
  };

  const handleBlindChange = (
    index: number,
    field: 'smallBlind' | 'bigBlind' | 'ante' | 'duration',
    value: string
  ) => {
    const newValue = parseInt(value) || 0;
    const newLevels = blindLevels.map((level, i) => {
      if (i === index) {
        return { ...level, [field]: newValue };
      }
      return level;
    });
    updateBlindLevels(newLevels);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      } as const,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates as any,
    })
  );

  const handleDragStart = (event: any) => {
    document.body.style.cursor = 'grabbing';
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    document.body.style.cursor = 'default';
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = blindLevels.findIndex((level) => level.id.toString() === active.id);
      const newIndex = blindLevels.findIndex((level) => level.id.toString() === over.id);
      
      const newBlindLevels = arrayMove(blindLevels, oldIndex, newIndex);
      updateBlindLevels(newBlindLevels);
    }
  };

  const handleSaveTournament = useCallback(() => {
    if (!newTournamentName.trim()) {
      toast({
        title: 'エラー',
        description: 'トーナメント名を入力してください',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    saveTournament(newTournamentName.trim());
    setNewTournamentName('');
    toast({
      title: '保存完了',
      description: 'トーナメント設定を保存しました',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [newTournamentName, saveTournament, toast]);

  const handleLoadTournament = useCallback((id: string) => {
    loadTournament(id);
    onClose();
    toast({
      title: '読み込み完了',
      description: 'トーナメント設定を読み込みました',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [loadTournament, onClose, toast]);

  const handleConfirmDelete = useCallback(() => {
    if (selectedTournamentId) {
      deleteTournament(selectedTournamentId);
      setSelectedTournamentId(null);
      onClose();
      toast({
        title: '削除完了',
        description: 'トーナメント設定を削除しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [selectedTournamentId, deleteTournament, onClose, toast]);

  if (!mounted) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Box
        bg="white"
        p={6}
        borderRadius="md"
        borderColor="gray.200"
        borderWidth="1px"
        shadow="sm"
        width="100%"
      >
        <Tabs>
          <TabList>
            <Tab>Blind Settings</Tab>
            <Tab>Saved Tournaments</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={4} align="stretch" w="full">
                <Heading size="md">Blind Settings</Heading>

                <Box 
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                  bg="gray.50"
                >
                  <Box overflowX="auto">
                    <Box minW="800px">
                      <SortableContext items={blindLevels} strategy={verticalListSortingStrategy}>
                        <VStack spacing={0} align="stretch">
                          {blindLevels.map((blind, index) => {
                            let actualLevel = 1;
                            for (let i = 0; i < index; i++) {
                              if (!blindLevels[i].isBreak) {
                                actualLevel++;
                              }
                            }
                            
                            return (
                              <Box key={blind.id}>
                                {index === 0 && (
                                  <Box 
                                    h="8px" 
                                    bg={activeId ? "blue.50" : "transparent"} 
                                    borderWidth={activeId ? "1px" : "0"}
                                    borderStyle="dashed"
                                    borderColor="blue.200"
                                    transition="all 0.2s"
                                    mx={2}
                                    borderRadius="full"
                                  />
                                )}
                                <SortableItem
                                  id={blind.id.toString()}
                                  level={actualLevel}
                                  sb={blind.smallBlind}
                                  bb={blind.bigBlind}
                                  ante={blind.ante}
                                  time={blind.duration}
                                  isBreak={blind.isBreak}
                                  onSbChange={(value) => handleBlindChange(index, "smallBlind", value.toString())}
                                  onBbChange={(value) => handleBlindChange(index, "bigBlind", value.toString())}
                                  onAnteChange={(value) => handleBlindChange(index, "ante", value.toString())}
                                  onTimeChange={(value) => handleBlindChange(index, "duration", value.toString())}
                                  onDelete={() => handleDelete(index)}
                                />
                                <Box 
                                  h="8px" 
                                  bg={activeId ? "blue.50" : "transparent"}
                                  borderWidth={activeId ? "1px" : "0"}
                                  borderStyle="dashed"
                                  borderColor="blue.200"
                                  transition="all 0.2s"
                                  mx={2}
                                  borderRadius="full"
                                />
                              </Box>
                            );
                          })}
                        </VStack>
                      </SortableContext>
                    </Box>
                  </Box>
                  
                  <Divider my={4} />

                  <HStack spacing={2}>
                    <Button
                      leftIcon={<AddIcon />}
                      colorScheme="blue"
                      onClick={() => {
                        const lastLevel = blindLevels[blindLevels.length - 1];
                        let newSmallBlind = 100;
                        let newBigBlind = 200;
                        let newAnte = 0;
                        let newDuration = 15;

                        // 前のレベルが存在し、ブレイクでない場合は値を2倍にする
                        if (lastLevel && !lastLevel.isBreak) {
                          newSmallBlind = lastLevel.smallBlind * 2;
                          newBigBlind = lastLevel.bigBlind * 2;
                          newAnte = lastLevel.ante > 0 ? lastLevel.ante * 2 : 0;
                          newDuration = lastLevel.duration;
                        }

                        const newLevel = {
                          id: blindLevels.length,
                          smallBlind: newSmallBlind,
                          bigBlind: newBigBlind,
                          ante: newAnte,
                          duration: newDuration,
                          isBreak: false
                        };
                        updateBlindLevels([...blindLevels, newLevel]);
                      }}
                      size="sm"
                    >
                      Add Level
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={addBreak}
                      size="sm"
                    >
                      Add Break
                    </Button>
                  </HStack>
                </Box>

                <Box
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                  bg="gray.50"
                >
                  <FormControl>
                    <FormLabel>Tournament Name</FormLabel>
                    <Input
                      value={displayName}
                      onChange={handleTournamentNameChange}
                      placeholder="Enter tournament name"
                      bg="white"
                    />
                  </FormControl>

                  <Button
                    colorScheme="green"
                    onClick={handleSaveTournament}
                    isDisabled={!tournamentName}
                    size="sm"
                    width="auto"
                    alignSelf="flex-start"
                    mt={4}
                  >
                    Save
                  </Button>
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Text fontSize="xl" fontWeight="bold">
                  Saved Tournaments
                </Text>
                <Table variant="unstyled">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Created At</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {savedTournaments.map((tournament) => (
                      <SavedTournamentRow
                        key={tournament.id}
                        tournament={tournament}
                        onLoad={handleLoadTournament}
                        onDeleteClick={(id) => {
                          setSelectedTournamentId(id);
                          onOpen();
                        }}
                      />
                    ))}
                  </Tbody>
                </Table>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Tournament
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
      <DragOverlay>
        {activeId ? (
          <Box
            bg="white"
            borderWidth="2px"
            borderColor="blue.400"
            borderRadius="md"
            boxShadow="xl"
            opacity={0.8}
            transform="scale(1.02)"
          >
            {blindLevels.find(level => level.id.toString() === activeId) && (
              <SortableItem
                id={activeId}
                level={blindLevels.find(level => level.id.toString() === activeId)?.id || 0}
                sb={blindLevels.find(level => level.id.toString() === activeId)?.smallBlind || 0}
                bb={blindLevels.find(level => level.id.toString() === activeId)?.bigBlind || 0}
                ante={blindLevels.find(level => level.id.toString() === activeId)?.ante || 0}
                time={blindLevels.find(level => level.id.toString() === activeId)?.duration || 0}
                isBreak={blindLevels.find(level => level.id.toString() === activeId)?.isBreak}
                onSbChange={() => {}}
                onBbChange={() => {}}
                onAnteChange={() => {}}
                onTimeChange={() => {}}
                onDelete={() => {}}
              />
            )}
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
});

BlindSettings.displayName = 'BlindSettings'; 