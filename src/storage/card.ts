import { z } from "zod";
import { message } from "antd";

import {
  EStorage,
  ICard,
  ICardAddProps,
  ICardDeleteProps,
  ICardEditProps,
  ICardsDeleteProps,
} from "../constants/storage";
import { CardZod, Storage } from "./index";
import { useStorageStore } from "../stores/storage";
import { generateRandomSixDigitNumber } from "../utils/random";

export const addCard = async (props: ICardAddProps): Promise<boolean> => {
  const { article, word, cardsId, meanOfWord } = props;

  const cards = getCards(cardsId);

  if (!cards) {
    return false;
  }

  cards.push({
    article,
    cardsId,
    id: generateRandomSixDigitNumber().toString(),
    word,
    meanOfWord,
    doMemorized: false,
  });

  await setCards(cards);

  return true;
};

export const getCards = (id: ICard["cardsId"]): ICard[] | null => {
  if (localStorage.getItem(`${EStorage.CARD}${id}`) === "[]") {
    return [];
  }

  let res: z.SafeParseReturnType<ICard[], ICard[]> | null = null;

  try {
    res = Storage.getItem(`${EStorage.CARD}${id}` as EStorage.CARD);
  } catch (error) {
    return null;
  }

  if (!res.success) {
    message.error("Something went wrong when getting cards");
    return null;
  }

  const decodedData = decodeCards(res.data);

  return decodedData;
};

export const editCard = async ({
  article,
  word,
  doMemorized,
  meanOfWord,
  id,
  cardsId,
}: ICardEditProps): Promise<boolean> => {
  const cards = getCards(cardsId);

  if (!cards) {
    return false;
  }

  const cardIndex = cards.findIndex((card) => card.id === id);

  if (cardIndex === -1) {
    message.error("Card can't be found");
    return false;
  }

  cards[cardIndex] = {
    ...cards[cardIndex],
    article,
    word,
    meanOfWord,
    doMemorized,
  };

  await setCards(cards);

  message.success("Card edited");
  return true;
};

export const deleteCard = async ({
  id,
  cardsId,
}: ICardDeleteProps): Promise<boolean> => {
  const cards = getCards(cardsId);

  if (!cards) {
    return false;
  }

  const cardIndex = cards.findIndex((card) => card.id === id);

  if (cardIndex === -1) {
    message.error("Card can't be found");
    return false;
  }

  cards.splice(cardIndex, 1);

  await setCards(cards, cardsId);

  message.success("Card deleted");
  return true;
};

export const deleteCards = async (
  props: ICardsDeleteProps
): Promise<boolean> => {
  Storage.removeItem(`${EStorage.CARD}${props.cardsId}` as EStorage.CARD);

  return true;
};

export const setCards = async (
  cards: ICard[],
  cardsId: ICard["cardsId"] | null = null
): Promise<void> => {
  const zodCards = await encodeCards(cards);

  Storage.setItem(
    `${EStorage.CARD}${cardsId || cards[0].cardsId}` as EStorage.CARD,
    zodCards
  );

  useStorageStore.setState((state) => ({
    ...state,
    triggered: !state.triggered,
  }));
};

const encodeCards = async (
  cards: ICard[]
): Promise<z.infer<typeof CardZod>> => {
  return await CardZod.parseAsync(cards);
};

const decodeCards = (cards: z.infer<typeof CardZod>): ICard[] => {
  return cards;
};
