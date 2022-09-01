import { z } from "zod";
import { message } from "antd";
import { EStorage, ICardId, ICardIdAddProps } from "../constants/storage";
import { CardIdsZod, Storage } from "./index";

export const addCardId = async (props: ICardIdAddProps): Promise<boolean> => {
  const { id } = props;

  const cardIds = getCardIds();

  if (!cardIds) {
    return false;
  }

  cardIds.push({ id });

  await setCardIds(cardIds);

  return true;
};

export const getCardIds = (): ICardId[] | null => {
  const res = Storage.getItem(EStorage.CARD_IDS);

  if (!res.success) {
    message.error("Something went wrong when getting card ids");
    return null;
  }

  return decodeCardIds(res.data);
};

export const setCardIds = async (cardIds: ICardId[]): Promise<void> => {
  const zodCardIds = await encodeCardIds(cardIds);

  Storage.setItem(EStorage.CARD_IDS, zodCardIds);
};

export const deleteCardId = async (id: ICardId["id"]): Promise<void> => {
  const cardIds = getCardIds();

  if (!cardIds) {
    message.error("Something went wrong when getting card ids");

    return;
  }

  const newCardIds = cardIds.filter((cardId) => cardId.id !== id);

  await setCardIds(newCardIds);
};

const encodeCardIds = async (
  cardIds: ICardId[]
): Promise<z.infer<typeof CardIdsZod>> => {
  return await CardIdsZod.parseAsync(cardIds.map((cardId) => cardId.id));
};

const decodeCardIds = (cardIds: z.infer<typeof CardIdsZod>): ICardId[] => {
  return cardIds.map((cardId) => {
    return {
      id: cardId,
    };
  });
};
