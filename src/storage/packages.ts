import { z } from "zod";
import { message } from "antd";

import {
  EStorage,
  IPackage,
  IPackageAddProps,
  IPackageDeleteProps,
  IPackageEditProps,
} from "../constants/storage";
import { PackagesZod, Storage } from "./index";
import { generateRandomSixDigitNumber } from "../utils/random";
import { addCardId, deleteCardId } from "./cardIds";
import { useStorageStore } from "../stores/storage";
import { deleteCards } from "./card";

export const addPackage = async (props: IPackageAddProps): Promise<boolean> => {
  const { name } = props;

  const packages = getPackages();

  if (!packages) {
    return false;
  }

  if (packages.some((packageItem) => packageItem.name === name)) {
    message.error("Package with this name already exists");
    return false;
  }

  const cardsId = generateRandomSixDigitNumber().toString();

  packages.push({
    name,
    created_at: new Date(),
    updated_at: new Date(),
    cardsId,
  });

  await setPackages(packages);

  await addCardId({ id: cardsId });

  message.success("Package added");
  return true;
};

export const getPackages = (): IPackage[] | null => {
  const res = Storage.getItem(EStorage.PACKAGES);

  if (!res.success) {
    message.error("Something went wrong when getting packages");
    return null;
  }

  return decodePackages(res.data);
};

export const setPackages = async (packages: IPackage[]): Promise<void> => {
  const zodPackages = await encodePackages(packages);

  Storage.setItem(EStorage.PACKAGES, zodPackages);

  useStorageStore.setState((state) => ({
    ...state,
    triggered: !state.triggered,
  }));
};

export const editPackage = async ({
  currentName,
  newName,
}: IPackageEditProps): Promise<boolean> => {
  const packages = getPackages();

  if (!packages) {
    return false;
  }

  const packageIndex = packages.findIndex(
    (packageItem) => packageItem.name === currentName
  );

  if (packageIndex === -1) {
    message.error("Package can't be found");
    return false;
  }

  if (packages.some((packageItem) => packageItem.name === newName)) {
    message.error("Package with this name already exists");
    return false;
  }

  packages[packageIndex].name = newName;

  await setPackages(packages);

  message.success("Package edited");
  return true;
};

export const deletePackage = async ({
  name,
}: IPackageDeleteProps): Promise<boolean> => {
  const packages = getPackages();

  if (!packages) {
    return false;
  }

  const packageIndex = packages.findIndex(
    (packageItem) => packageItem.name === name
  );

  if (packageIndex === -1) {
    message.error("Package can't be found");
    return false;
  }

  await deleteCardId(packages[packageIndex].cardsId);

  await deleteCards({ cardsId: packages[packageIndex].cardsId });

  packages.splice(packageIndex, 1);

  await setPackages(packages);

  message.success("Package deleted");
  return true;
};

const encodePackages = async (
  packages: IPackage[]
): Promise<z.infer<typeof PackagesZod>> => {
  return await PackagesZod.parseAsync(
    packages.map((packageItem) => ({
      ...packageItem,
      created_at: packageItem.created_at.getTime(),
      updated_at: packageItem.updated_at.getTime(),
    }))
  );
};

const decodePackages = (packages: z.infer<typeof PackagesZod>): IPackage[] => {
  return packages.map((item) => {
    return {
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at),
    };
  });
};
