import create from "zustand";
import {
  ICard,
  ICardAddProps,
  ICardDeleteProps,
  ICardEditProps,
} from "../constants/storage";
import { addCard, deleteCard, editCard } from "../storage/card";

interface Cards {
  addCardModalVisible: boolean;
  toggleAddCardModal: () => void;
  onAddCard: (props: ICardAddProps) => Promise<void>;

  editCardModalVisible: boolean;
  toggleEditCardModal: () => void;
  onEditCard: (props: ICardEditProps) => Promise<void>;
  currentEditingCard: ICard | null;
  setCurrentEditingCard: (cardItem: ICard) => void;

  onDeleteCard: (cardItem: ICardDeleteProps) => Promise<void>;

  showMeanOfWord: Record<number, boolean>;
  toggleShowMeanOfWord: (index: number) => void;
}

export const useCardsStore = create<Cards>()((set) => ({
  addCardModalVisible: false,

  toggleAddCardModal: () =>
    set((state) => ({
      ...state,
      addCardModalVisible: !state.addCardModalVisible,
    })),

  onAddCard: async ({ article, word, cardsId, meanOfWord }: ICardAddProps) => {
    if (await addCard({ article, word, cardsId, meanOfWord })) {
      set((state) => ({
        ...state,
        addCardModalVisible: false,
        showMeanOfWord: [],
      }));
    }
  },
  editCardModalVisible: false,

  toggleEditCardModal: () =>
    set((state) => ({
      ...state,
      editCardModalVisible: !state.editCardModalVisible,
    })),

  onEditCard: async (args: ICardEditProps) => {
    if (await editCard(args)) {
      set((state) => ({ ...state, editCardModalVisible: false }));
    }
  },

  currentEditingCard: null,

  setCurrentEditingCard: (cardItem: ICard) =>
    set((state) => ({ ...state, currentEditingCard: cardItem })),

  onDeleteCard: async (cardItem: ICardDeleteProps) => {
    await deleteCard(cardItem);
  },

  showMeanOfWord: [],

  toggleShowMeanOfWord: (index: number) =>
    set((state) => ({
      ...state,
      showMeanOfWord: {
        ...state.showMeanOfWord,
        [index]: !state.showMeanOfWord[index],
      },
    })),
}));
