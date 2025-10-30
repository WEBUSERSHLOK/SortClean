import React, {createContext, useContext, useState} from "react";

type PhotoItem = {
    webPath: string;
    type: "Recycling" | "Trash" | "Neither";
    predictions?: {
        className: string;
        probability: number;
    }[];
};


export type PhotoContextType = {
  photos: PhotoItem[];
  setPhotos: React.Dispatch<React.SetStateAction<PhotoItem[]>>;
    addPhoto: (photo: PhotoItem) => void;
    removePhoto: (webPath: string) => void;
};

export const PhotoContext = createContext<PhotoContextType>({
    photos: [],
    setPhotos: () => {},
    addPhoto: () => {},
    removePhoto: () => {},
});




export const PhotoProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [photos, setPhotos] = useState<PhotoItem[]>([]);

    const addPhoto = (photo: PhotoItem) => {
        setPhotos((prevPhotos) => [...prevPhotos, photo]);
    };
    const removePhoto = (webPath: string) => {
        setPhotos(prev => prev.filter(photo => photo.webPath !== webPath));
    };
        
    return (
        <PhotoContext.Provider value={{photos, addPhoto, setPhotos, removePhoto}}>
            {children}
        </PhotoContext.Provider>
    );
};


