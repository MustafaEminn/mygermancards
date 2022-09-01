import create from "zustand";
import {
  IPackage,
  IPackageAddProps,
  IPackageDeleteProps,
  IPackageEditProps,
} from "../constants/storage";
import { addPackage, deletePackage, editPackage } from "../storage/packages";

interface Packages {
  addPackageModalVisible: boolean;
  toggleAddPackageModal: () => void;
  onAddPackage: (props: IPackageAddProps) => Promise<void>;

  editPackageModalVisible: boolean;
  toggleEditPackageModal: () => void;
  onEditPackage: (props: IPackageEditProps) => Promise<void>;
  currentEditingPackage: IPackage | null;
  setCurrentEditingPackage: (packageItem: IPackage) => void;

  deletePackageModalVisible: boolean;
  toggleDeletePackageModal: () => void;
  onDeletePackage: (packageItem: IPackageDeleteProps) => Promise<void>;
}

export const usePackagesStore = create<Packages>()((set) => ({
  addPackageModalVisible: false,

  toggleAddPackageModal: () =>
    set((state) => ({
      ...state,
      addPackageModalVisible: !state.addPackageModalVisible,
    })),

  onAddPackage: async ({ name }: IPackageAddProps) => {
    if (await addPackage({ name })) {
      set((state) => ({ ...state, addPackageModalVisible: false }));
    }
  },
  editPackageModalVisible: false,

  toggleEditPackageModal: () =>
    set((state) => ({
      ...state,
      editPackageModalVisible: !state.editPackageModalVisible,
    })),

  onEditPackage: async ({ newName, currentName }: IPackageEditProps) => {
    if (await editPackage({ currentName, newName })) {
      set((state) => ({ ...state, editPackageModalVisible: false }));
    }
  },

  currentEditingPackage: null,

  setCurrentEditingPackage: (packageItem: IPackage) =>
    set((state) => ({ ...state, currentEditingPackage: packageItem })),

  deletePackageModalVisible: false,

  toggleDeletePackageModal: () =>
    set((state) => ({
      ...state,
      deletePackageModalVisible: !state.deletePackageModalVisible,
    })),

  onDeletePackage: async (packageItem: IPackageDeleteProps) => {
    if (await deletePackage(packageItem)) {
      set((state) => ({ ...state, deletePackageModalVisible: false }));
    }
  },
}));
