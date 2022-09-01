export enum EStorage {
  PACKAGES = "packages",
  CARD_IDS = "cardIds",
  CARD = "CARD-",
}

export interface IPackage {
  name: string;
  created_at: Date;
  updated_at: Date;
  cardsId: string;
}

export interface IPackageAddProps extends Pick<IPackage, "name"> {}

export interface IPackageEditProps {
  currentName: IPackage["name"];
  newName: IPackage["name"];
}

export interface IPackageDeleteProps extends Pick<IPackage, "name"> {}

export interface ICard {
  id: string;
  cardsId: string;
  article: string;
  word: string;
  meanOfWord: string;
  doMemorized: boolean;
}

export interface ICardAddProps extends Omit<ICard, "doMemorized" | "id"> {}

export interface ICardEditProps extends ICard {}

export interface ICardDeleteProps extends Pick<ICard, "id" | "cardsId"> {}

export interface ICardsDeleteProps extends Pick<ICard, "cardsId"> {}

export interface ICardId {
  id: string;
}

export interface ICardIdAddProps extends ICardId {}
