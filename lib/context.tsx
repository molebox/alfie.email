'use client'
import { BuildingLibraryIcon, ExclamationTriangleIcon, GlobeEuropeAfricaIcon, PlusCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon, HeartIcon, ShoppingBagIcon } from 'lucide-react';
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Label = {
  name: string;
  color: string;
}

export type FolderType = {
  name: string;
  space: string;
  unreadEmails: number;
  icon?: ReactNode;
  deletable?: boolean;
  labels?: Label[];
};

type FolderContextType = {
  selectedFolder: FolderType;
  setSelectedFolder: (folder: FolderType) => void;
};

export const defaultFolders: FolderType[] = [
  { name: 'Compose', space: 'compose', unreadEmails: 0, icon: <PlusCircleIcon className="mr-2 h-4 w-4" />, deletable: false },
  { name: 'Standard', unreadEmails: 0, space: 'standard', icon: <BuildingLibraryIcon className="mr-2 h-4 w-4" />, deletable: false },
  { name: 'Favorites', unreadEmails: 0, space: 'favorites', icon: <HeartIcon className="mr-2 h-4 w-4" />, deletable: false },
  { name: 'Important', unreadEmails: 0, space: 'important', icon: <ExclamationTriangleIcon className="mr-2 h-4 w-4" />, deletable: false },
  { name: 'Work', unreadEmails: 0, space: 'work', icon: <BriefcaseIcon className="mr-2 h-4 w-4" />, deletable: false },
];

export const userFolders: FolderType[] = [
  {
    name: 'Family',
    space: 'family',
    icon: <UserGroupIcon className="mr-2 h-4 w-4" />,
    deletable: false,
    unreadEmails: 0
  },
  {
    name: 'Travel',
    space: 'travel',
    icon: <GlobeEuropeAfricaIcon className="mr-2 h-4 w-4" />,
    deletable: false,
    unreadEmails: 0
  },
  {
    name: 'Shopping',
    space: 'shopping',
    icon: <ShoppingBagIcon className="mr-2 h-4 w-4" />,
    deletable: false,
    unreadEmails: 0
  },
];

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [selectedFolder, setSelectedFolder] = useState<FolderType>(defaultFolders[0]);

  return (
    <FolderContext.Provider value={{ selectedFolder, setSelectedFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (context === undefined) {
    throw new Error('useFolderContext must be used within a FolderProvider');
  }
  return context;
}
