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
import { usePokerStore, BlindLevel, Tournament, TournamentTemplate } from '../store/pokerStore';
import { useTranslation } from '../utils/translations';
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
      minW={["800px", "800px", "auto"]}
      px={4}
      py={3}
      bg={isBreak ? "blue.50" : "white"}
      borderWidth="1px"
      borderRadius="md"
      _hover={{ 
        borderColor: isBreak ? "blue.300" : "gray.300"
      }}
      transition="all 0.2s"
      boxShadow={isDragging ? "lg" : "none"}
      borderColor={isDragging ? "blue.400" : isBreak ? "blue.200" : "gray.200"}
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
        width="auto"
      >
        <Icon 
          as={MdDragIndicator} 
          boxSize={6} 
          color="gray.400"
        />
      </Box>
      <Text 
        w="50px" 
        textAlign="center" 
        color={isBreak ? "blue.500" : "inherit"} 
        fontWeight="bold"
        fontSize={["sm", "md"]}
        flexShrink={0}
      >
        {isBreak ? "Break" : `Level ${level}`}
      </Text>
      {isBreak ? (
        <>
          <Box visibility="hidden">
            <Text fontSize="xs" color="gray.500" mb={1}>SB</Text>
            <NumberInput
              value={0}
              w="120px"
              size="lg"
              isReadOnly
            >
              <NumberInputField
                fontSize="16px"
                textAlign="right"
                paddingRight="8px"
                height="44px"
                fontWeight="bold"
                borderColor="gray.200"
                bg="white"
              />
            </NumberInput>
          </Box>
          <Box visibility="hidden">
            <Text fontSize="xs" color="gray.500" mb={1}>BB</Text>
            <NumberInput
              value={0}
              w="120px"
              size="lg"
              isReadOnly
            >
              <NumberInputField
                fontSize="16px"
                textAlign="right"
                paddingRight="8px"
                height="44px"
                fontWeight="bold"
                borderColor="gray.200"
                bg="white"
              />
            </NumberInput>
          </Box>
          <Box visibility="hidden">
            <Text fontSize="xs" color="gray.500" mb={1}>Ante</Text>
            <NumberInput
              value={0}
              w="120px"
              size="lg"
              isReadOnly
            >
              <NumberInputField
                fontSize="16px"
                textAlign="right"
                paddingRight="8px"
                height="44px"
                fontWeight="bold"
                borderColor="gray.200"
                bg="white"
              />
            </NumberInput>
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.500" mb={1}>Time (min)</Text>
            <NumberInput
              value={time}
              onChange={(_, value) => onTimeChange(value)}
              w="120px"
              size="lg"
            >
              <NumberInputField
                fontSize="16px"
                textAlign="right"
                paddingRight="8px"
                height="44px"
                fontWeight="bold"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                bg="white"
              />
            </NumberInput>
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Text fontSize="xs" color="gray.500" mb={1}>SB</Text>
            <NumberInput
              value={sb}
              onChange={(_, value) => onSbChange(value)}
              w="120px"
              size="lg"
            >
              <NumberInputField
                fontSize="16px"
                textAlign="right"
                paddingRight="8px"
                height="44px"
                fontWeight="bold"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                bg="white"
              />
            </NumberInput>
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.500" mb={1}>BB</Text>
            <NumberInput
              value={bb}
              onChange={(_, value) => onBbChange(value)}
              w="120px"
              size="lg"
            >
              <NumberInputField
                fontSize="16px"
                textAlign="right"
                paddingRight="8px"
                height="44px"
                fontWeight="bold"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                bg="white"
              />
            </NumberInput>
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.500" mb={1}>Ante</Text>
            <NumberInput
              value={ante}
              onChange={(_, value) => onAnteChange(value)}
              w="120px"
              size="lg"
            >
              <NumberInputField
                fontSize="16px"
                textAlign="right"
                paddingRight="8px"
                height="44px"
                fontWeight="bold"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                bg="white"
              />
            </NumberInput>
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.500" mb={1}>Time (min)</Text>
            <NumberInput
              value={time}
              onChange={(_, value) => onTimeChange(value)}
              w="120px"
              size="lg"
            >
              <NumberInputField
                fontSize="16px"
                textAlign="right"
                paddingRight="8px"
                height="44px"
                fontWeight="bold"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                bg="white"
              />
            </NumberInput>
          </Box>
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
  const t = useTranslation();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [newTournamentName, setNewTournamentName] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [displayName, setDisplayName] = useState('Tournament');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const resetConfirmRef = React.useRef<HTMLButtonElement>(null);
  const [bulkTimeValue, setBulkTimeValue] = useState<number>(0);

  // トーナメントテンプレート
  const tournamentTemplates: TournamentTemplate[] = [
    {
      id: 'turbo-100',
      name: 'ターボ100',
      description: '100/200から始まるターボトーナメント（60分~120分想定）',
      blindLevels: [
        { id: 0, smallBlind: 100, bigBlind: 200, ante: 200, duration: 6, isBreak: false },
        { id: 1, smallBlind: 200, bigBlind: 400, ante: 400, duration: 6, isBreak: false },
        { id: 2, smallBlind: 300, bigBlind: 600, ante: 600, duration: 6, isBreak: false },
        { id: 3, smallBlind: 500, bigBlind: 1000, ante: 1000, duration: 6, isBreak: false },
        { id: 4, smallBlind: 800, bigBlind: 1600, ante: 1600, duration: 6, isBreak: false },
        { id: 5, smallBlind: 1200, bigBlind: 2400, ante: 2400, duration: 6, isBreak: false },
        { id: 6, smallBlind: 2000, bigBlind: 4000, ante: 4000, duration: 6, isBreak: false },
        { id: 7, smallBlind: 3000, bigBlind: 6000, ante: 6000, duration: 6, isBreak: false },
        { id: 8, smallBlind: 5000, bigBlind: 10000, ante: 10000, duration: 6, isBreak: false },
        { id: 9, smallBlind: 8000, bigBlind: 16000, ante: 16000, duration: 6, isBreak: false },
        { id: 10, smallBlind: 12000, bigBlind: 24000, ante: 24000, duration: 6, isBreak: false },
        { id: 11, smallBlind: 20000, bigBlind: 40000, ante: 40000, duration: 6, isBreak: false },
        { id: 12, smallBlind: 30000, bigBlind: 60000, ante: 60000, duration: 6, isBreak: false },
        { id: 13, smallBlind: 50000, bigBlind: 100000, ante: 100000, duration: 6, isBreak: false },
        { id: 14, smallBlind: 80000, bigBlind: 160000, ante: 160000, duration: 6, isBreak: false },
        { id: 15, smallBlind: 120000, bigBlind: 240000, ante: 240000, duration: 6, isBreak: false },
        { id: 16, smallBlind: 200000, bigBlind: 400000, ante: 400000, duration: 6, isBreak: false }
      ]
    },
    {
      id: 'turbo-10',
      name: 'ターボ10',
      description: '10/20から始まるターボトーナメント（60分~120分想定）',
      blindLevels: [
        { id: 0, smallBlind: 10, bigBlind: 20, ante: 20, duration: 6, isBreak: false },
        { id: 1, smallBlind: 20, bigBlind: 40, ante: 40, duration: 6, isBreak: false },
        { id: 2, smallBlind: 30, bigBlind: 60, ante: 60, duration: 6, isBreak: false },
        { id: 3, smallBlind: 50, bigBlind: 100, ante: 100, duration: 6, isBreak: false },
        { id: 4, smallBlind: 80, bigBlind: 160, ante: 160, duration: 6, isBreak: false },
        { id: 5, smallBlind: 120, bigBlind: 240, ante: 240, duration: 6, isBreak: false },
        { id: 6, smallBlind: 200, bigBlind: 400, ante: 400, duration: 6, isBreak: false },
        { id: 7, smallBlind: 300, bigBlind: 600, ante: 600, duration: 6, isBreak: false },
        { id: 8, smallBlind: 500, bigBlind: 1000, ante: 1000, duration: 6, isBreak: false },
        { id: 9, smallBlind: 800, bigBlind: 1600, ante: 1600, duration: 6, isBreak: false },
        { id: 10, smallBlind: 1200, bigBlind: 2400, ante: 2400, duration: 6, isBreak: false },
        { id: 11, smallBlind: 2000, bigBlind: 4000, ante: 4000, duration: 6, isBreak: false },
        { id: 12, smallBlind: 3000, bigBlind: 6000, ante: 6000, duration: 6, isBreak: false },
        { id: 13, smallBlind: 5000, bigBlind: 10000, ante: 10000, duration: 6, isBreak: false },
        { id: 14, smallBlind: 8000, bigBlind: 16000, ante: 16000, duration: 6, isBreak: false },
        { id: 15, smallBlind: 12000, bigBlind: 24000, ante: 24000, duration: 6, isBreak: false },
        { id: 16, smallBlind: 20000, bigBlind: 40000, ante: 40000, duration: 6, isBreak: false }
      ]
    },
    {
      id: 'turbo-1',
      name: 'ターボ1',
      description: '1/2から始まるターボトーナメント（60分~120分想定）',
      blindLevels: [
        { id: 0, smallBlind: 1, bigBlind: 2, ante: 2, duration: 6, isBreak: false },
        { id: 1, smallBlind: 2, bigBlind: 4, ante: 4, duration: 6, isBreak: false },
        { id: 2, smallBlind: 3, bigBlind: 6, ante: 6, duration: 6, isBreak: false },
        { id: 3, smallBlind: 5, bigBlind: 10, ante: 10, duration: 6, isBreak: false },
        { id: 4, smallBlind: 8, bigBlind: 16, ante: 16, duration: 6, isBreak: false },
        { id: 5, smallBlind: 12, bigBlind: 24, ante: 24, duration: 6, isBreak: false },
        { id: 6, smallBlind: 20, bigBlind: 40, ante: 40, duration: 6, isBreak: false },
        { id: 7, smallBlind: 30, bigBlind: 60, ante: 60, duration: 6, isBreak: false },
        { id: 8, smallBlind: 50, bigBlind: 100, ante: 100, duration: 6, isBreak: false },
        { id: 9, smallBlind: 80, bigBlind: 160, ante: 160, duration: 6, isBreak: false },
        { id: 10, smallBlind: 120, bigBlind: 240, ante: 240, duration: 6, isBreak: false },
        { id: 11, smallBlind: 200, bigBlind: 400, ante: 400, duration: 6, isBreak: false },
        { id: 12, smallBlind: 300, bigBlind: 600, ante: 600, duration: 6, isBreak: false },
        { id: 13, smallBlind: 500, bigBlind: 1000, ante: 1000, duration: 6, isBreak: false },
        { id: 14, smallBlind: 800, bigBlind: 1600, ante: 1600, duration: 6, isBreak: false },
        { id: 15, smallBlind: 1200, bigBlind: 2400, ante: 2400, duration: 6, isBreak: false },
        { id: 16, smallBlind: 2000, bigBlind: 4000, ante: 4000, duration: 6, isBreak: false }
      ]
    },
    {
      id: 'long-structure',
      name: 'ロングストラクチャー',
      description: '100/200から始まる店舗用ロングストラクチャー',
      blindLevels: [
        { id: 0, smallBlind: 100, bigBlind: 200, ante: 200, duration: 20, isBreak: false },
        { id: 1, smallBlind: 200, bigBlind: 400, ante: 400, duration: 20, isBreak: false },
        { id: 2, smallBlind: 300, bigBlind: 600, ante: 600, duration: 20, isBreak: false },
        { id: 3, smallBlind: 500, bigBlind: 1000, ante: 1000, duration: 20, isBreak: false },
        { id: 4, smallBlind: 800, bigBlind: 1600, ante: 1600, duration: 20, isBreak: false },
        { id: 5, smallBlind: 1200, bigBlind: 2400, ante: 2400, duration: 20, isBreak: false },
        { id: 6, smallBlind: 2000, bigBlind: 4000, ante: 4000, duration: 20, isBreak: false },
        { id: 7, smallBlind: 3000, bigBlind: 6000, ante: 6000, duration: 20, isBreak: false },
        { id: 8, smallBlind: 5000, bigBlind: 10000, ante: 10000, duration: 20, isBreak: false },
        { id: 9, smallBlind: 8000, bigBlind: 16000, ante: 16000, duration: 20, isBreak: false },
        { id: 10, smallBlind: 12000, bigBlind: 24000, ante: 24000, duration: 20, isBreak: false },
        { id: 11, smallBlind: 20000, bigBlind: 40000, ante: 40000, duration: 20, isBreak: false },
        { id: 12, smallBlind: 30000, bigBlind: 60000, ante: 60000, duration: 20, isBreak: false },
        { id: 13, smallBlind: 50000, bigBlind: 100000, ante: 100000, duration: 20, isBreak: false },
        { id: 14, smallBlind: 80000, bigBlind: 160000, ante: 160000, duration: 20, isBreak: false },
        { id: 15, smallBlind: 120000, bigBlind: 240000, ante: 240000, duration: 20, isBreak: false },
        { id: 16, smallBlind: 200000, bigBlind: 400000, ante: 400000, duration: 20, isBreak: false }
      ]
    }
  ];

  const { blindLevels, updateBlindLevels, updateAllBlindTimes, applyTournamentTemplate, deleteBlindLevel, addBreak } = usePokerStore();
  const savedTournaments = usePokerStore(state => state.savedTournaments);
  const saveTournament = usePokerStore(state => state.saveTournament);
  const loadTournament = usePokerStore(state => state.loadTournament);
  const deleteTournament = usePokerStore(state => state.deleteTournament);
  const tournamentName = usePokerStore(state => state.tournamentName);
  const setTournamentName = usePokerStore(state => state.setTournamentName);

  // Function to generate clean blind values based on common poker tournament structures
  const getNextBlindValue = (currentValue: number): number => {
    // Common blind values used in poker tournaments
    const commonValues = [
      5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 200, 300, 
      400, 500, 600, 800, 1000, 1200, 1500, 2000, 3000, 4000, 5000, 
      6000, 8000, 10000, 12000, 15000, 20000, 30000, 40000, 50000
    ];
    
    // Find the next appropriate blind value
    for (let i = 0; i < commonValues.length; i++) {
      if (commonValues[i] > currentValue) {
        return commonValues[i];
      }
    }
    
    // If the current value is already very high, increase by approximately 25-50%
    // and round to a clean number
    const nextApproxValue = currentValue * 1.5;
    
    // Round to the nearest clean number based on magnitude
    if (nextApproxValue < 100) {
      return Math.ceil(nextApproxValue / 5) * 5; // Round to nearest 5
    } else if (nextApproxValue < 1000) {
      return Math.ceil(nextApproxValue / 50) * 50; // Round to nearest 50
    } else if (nextApproxValue < 10000) {
      return Math.ceil(nextApproxValue / 500) * 500; // Round to nearest 500
    } else {
      return Math.ceil(nextApproxValue / 5000) * 5000; // Round to nearest 5000
    }
  };

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
    // 空文字列の場合は0、それ以外は数値に変換
    const newValue = value === '' ? 0 : parseInt(value) || 0;
    const newLevels = blindLevels.map((level, i) => {
      if (i === index) {
        return { ...level, [field]: newValue };
      }
      return level;
    });
    updateBlindLevels(newLevels);
  };

  const handleResetBlinds = useCallback(() => {
    // Default initial blind level
    const initialLevel = {
      id: 0,
      smallBlind: 0,
      bigBlind: 0,
      ante: 0,
      duration: 15,
      isBreak: false
    };
    
    updateBlindLevels([initialLevel]);
    setIsResetConfirmOpen(false);
    
    toast({
      title: 'Reset Complete',
      description: 'Blind levels have been reset',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  }, [updateBlindLevels, toast]);

  const handleBulkTimeUpdate = useCallback(() => {
    if (!bulkTimeValue || bulkTimeValue <= 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid time value',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    updateAllBlindTimes(bulkTimeValue);
    
    toast({
      title: 'Updated',
      description: `All blind levels updated to ${bulkTimeValue} minutes`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [bulkTimeValue, updateAllBlindTimes, toast]);

  const handleTemplateApply = useCallback((template: TournamentTemplate) => {
    applyTournamentTemplate(template);
    
    toast({
      title: 'Template Applied',
      description: `${template.name} template has been applied`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [applyTournamentTemplate, toast]);

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
        title: 'Error',
        description: 'Please enter tournament name',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    saveTournament(newTournamentName.trim());
    setNewTournamentName('');
    toast({
      title: 'Saved',
      description: 'Tournament settings saved',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [newTournamentName, saveTournament, toast]);

  const handleLoadTournament = useCallback((id: string) => {
    loadTournament(id);
    onClose();
    toast({
      title: 'Loaded',
      description: 'Tournament settings loaded',
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
        title: 'Deleted',
        description: 'Tournament settings deleted',
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
        p={[3, 4, 6]}
        borderRadius="md"
        borderColor="gray.200"
        borderWidth="1px"
        shadow="sm"
        width="100%"
      >
        <Tabs width="100%">
          <TabList>
            <Tab fontWeight="bold" _selected={{ color: "blue.500", borderColor: "blue.500" }}>{t('blindSettings')}</Tab>
            <Tab fontWeight="bold" _selected={{ color: "blue.500", borderColor: "blue.500" }}>{t('savedTournaments')}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={4} align="stretch" w="full">
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                  <Heading size="md">{t('blindSettings')}</Heading>
                  <Text fontSize="sm" color="gray.600" mt={[2, 0]}>
                    *{t('dragToReorder')}
                  </Text>
                </Box>
                
                {/* 一括時間設定 */}
                <Box 
                  bgColor="blue.50"
                  borderWidth="1px"
                  borderColor="blue.200"
                  borderRadius="md"
                  p={4}
                >
                  <HStack spacing={4} align="center" flexWrap="wrap">
                    <Text fontWeight="bold" fontSize="sm" color="blue.700">
                      一括時間設定:
                    </Text>
                    <NumberInput
                      value={bulkTimeValue}
                      onChange={(_, value) => setBulkTimeValue(value)}
                      w="120px"
                      size="md"
                    >
                      <NumberInputField
                        fontSize="14px"
                        textAlign="right"
                        paddingRight="8px"
                        height="36px"
                        fontWeight="bold"
                        borderColor="blue.300"
                        _hover={{ borderColor: "blue.400" }}
                        bg="white"
                      />
                    </NumberInput>
                    <Text fontSize="sm" color="gray.600">
                      分
                    </Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="solid"
                      onClick={handleBulkTimeUpdate}
                      isDisabled={!bulkTimeValue || bulkTimeValue <= 0}
                    >
                      全てのブラインドに適用
                    </Button>
                  </HStack>
                </Box>
                
                {/* トーナメントテンプレート */}
                <Box 
                  bgColor="green.50"
                  borderWidth="1px"
                  borderColor="green.200"
                  borderRadius="md"
                  p={4}
                >
                  <Text fontWeight="bold" fontSize="sm" color="green.700" mb={3}>
                    トーナメントテンプレート
                  </Text>
                  <VStack spacing={3} align="stretch">
                    {tournamentTemplates.map((template) => (
                      <Box key={template.id}>
                        <HStack spacing={3} align="center" flexWrap="wrap">
                          <Button
                            size="sm"
                            colorScheme="green"
                            variant="solid"
                            onClick={() => handleTemplateApply(template)}
                            minW="120px"
                          >
                            {template.name}
                          </Button>
                          <Text fontSize="xs" color="gray.600" flex={1}>
                            {template.description}
                          </Text>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>
                
                <Box 
                  bgColor="gray.50"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                >
                  <Box
                    overflowX="auto"
                    css={{
                      "&::-webkit-scrollbar": { height: "8px" },
                      "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "4px" }
                    }}
                  >
                    <Grid 
                      templateColumns={["1fr", "1fr", "50px 1fr 1fr 1fr 1fr 50px"]} 
                      gap={4} 
                      pb={2} 
                      px={4} 
                      display={["none", "none", "grid"]}
                      width="100%"
                    >
                      <Text fontWeight="bold" fontSize="sm" color="gray.500"></Text>
                      <Text fontWeight="bold" fontSize="sm" color="gray.500" textAlign="center">Small Blind</Text>
                      <Text fontWeight="bold" fontSize="sm" color="gray.500" textAlign="center">Big Blind</Text>
                      <Text fontWeight="bold" fontSize="sm" color="gray.500" textAlign="center">Ante</Text>
                      <Text fontWeight="bold" fontSize="sm" color="gray.500" textAlign="center">Time (minutes)</Text>
                      <Text fontWeight="bold" fontSize="sm" color="gray.500"></Text>
                    </Grid>
                    
                    <Box minW={["800px", "800px", "auto"]}>
                      <SortableContext items={blindLevels} strategy={verticalListSortingStrategy}>
                        <VStack spacing={2} align="stretch">
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
                  
                    <Divider my={4} />

                    <HStack spacing={2} flexWrap="wrap" justifyContent={["center", "flex-start"]}>
                      <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        onClick={() => {
                          const lastLevel = blindLevels[blindLevels.length - 1];
                          let newSmallBlind = 25;
                          let newBigBlind = 50;
                          let newAnte = 0;
                          let newDuration = 15;

                          // Calculate next blind levels based on common poker tournament structures
                          if (lastLevel && !lastLevel.isBreak) {
                            newSmallBlind = getNextBlindValue(lastLevel.smallBlind);
                            newBigBlind = newSmallBlind * 2; // Maintain SB:BB ratio of 1:2
                            
                            // Calculate ante if applicable (usually 10-25% of BB)
                            if (lastLevel.ante > 0) {
                              // Approximately 10-20% of BB, rounded to a clean number
                              const antePercent = lastLevel.ante / lastLevel.bigBlind;
                              newAnte = Math.round((newBigBlind * antePercent) / 5) * 5;
                              
                              // Ensure ante is at least 5 if previously existed
                              newAnte = Math.max(5, newAnte);
                            }
                            
                            newDuration = lastLevel.duration;
                          } else if (lastLevel && lastLevel.isBreak) {
                            // If the last level is a break, find the last non-break level and use that as reference
                            let lastNonBreakIndex = blindLevels.length - 2; // Start from the level before the break
                            
                            // Find the last non-break level
                            while (lastNonBreakIndex >= 0 && blindLevels[lastNonBreakIndex].isBreak) {
                              lastNonBreakIndex--;
                            }
                            
                            if (lastNonBreakIndex >= 0) {
                              const referenceLevel = blindLevels[lastNonBreakIndex];
                              
                              // Use the reference level to calculate the next blind values
                              newSmallBlind = getNextBlindValue(referenceLevel.smallBlind);
                              newBigBlind = newSmallBlind * 2;
                              
                              // Calculate ante if applicable
                              if (referenceLevel.ante > 0) {
                                const antePercent = referenceLevel.ante / referenceLevel.bigBlind;
                                newAnte = Math.round((newBigBlind * antePercent) / 5) * 5;
                                newAnte = Math.max(5, newAnte);
                              }
                              
                              newDuration = referenceLevel.duration;
                            }
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
                          toast({
                            title: 'Level Added',
                            description: 'New blind level added',
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                          });
                        }}
                        size="md"
                        mb={[2, 0]}
                      >
                        Add Blind Level
                      </Button>
                      <Button
                        colorScheme="teal"
                        onClick={addBreak}
                        size="md"
                        mb={[2, 0]}
                      >
                        Add Break
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => setIsResetConfirmOpen(true)}
                        size="md"
                        mb={[2, 0]}
                      >
                        Reset
                      </Button>
                    </HStack>
                  </Box>
                </Box>

                <Box
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                  bg="gray.50"
                  width="100%"
                >
                  <FormControl>
                    <FormLabel fontWeight="bold">Tournament Name</FormLabel>
                    <Input
                      value={displayName}
                      onChange={handleTournamentNameChange}
                      placeholder="Enter tournament name"
                      bg="white"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.300" }}
                      fontWeight="medium"
                    />
                  </FormControl>

                  <Button
                    colorScheme="green"
                    onClick={handleSaveTournament}
                    isDisabled={!tournamentName}
                    size="md"
                    width={["100%", "auto"]}
                    alignSelf="flex-start"
                    mt={4}
                    leftIcon={<CheckIcon />}
                  >
                    Save
                  </Button>
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Text fontSize="xl" fontWeight="bold">
                  {t('savedTournaments')}
                </Text>
                <Box
                  bgColor="white"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                >
                  <Box
                    overflowX="auto"
                    css={{
                      "&::-webkit-scrollbar": { height: "8px" },
                      "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "4px" }
                    }}
                  >
                    <Table variant="simple" colorScheme="blue" minW={["800px", "800px", "auto"]}>
                      <Thead bg="blue.50">
                        <Tr>
                          <Th>Name</Th>
                          <Th>Created At</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {savedTournaments.length === 0 ? (
                          <Tr>
                            <Td colSpan={3} textAlign="center" py={8}>
                              <Text color="gray.500">No saved tournaments</Text>
                            </Td>
                          </Tr>
                        ) : (
                          savedTournaments.map((tournament) => (
                            <SavedTournamentRow
                              key={tournament.id}
                              tournament={tournament}
                              onLoad={handleLoadTournament}
                              onDeleteClick={(id) => {
                                setSelectedTournamentId(id);
                                onOpen();
                              }}
                            />
                          ))
                        )}
                      </Tbody>
                    </Table>
                  </Box>
                </Box>
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
        
        <AlertDialog
          isOpen={isResetConfirmOpen}
          leastDestructiveRef={resetConfirmRef}
          onClose={() => setIsResetConfirmOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Reset Blind Levels
              </AlertDialogHeader>

              <AlertDialogBody>
                This will reset all blind levels. Are you sure you want to continue?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={resetConfirmRef} onClick={() => setIsResetConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleResetBlinds} ml={3}>
                  Reset
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