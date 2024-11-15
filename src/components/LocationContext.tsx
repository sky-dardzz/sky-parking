"use client"
import React, { createContext, useState, ReactNode } from 'react';

export interface Location {
    coordinates: Coordinates
    placeId: string;
    description: string;
}
interface Coordinates{
    lat: number;
    lng: number;
}
interface LocationContextProps {
    location: Location;
    setLocation: (location: Location) => void;
}

const defaultLocation: Location = {
    coordinates: {
        lat: 0,
        lng: 0
    },
    placeId: '',
    description: ''
};

export const LocationContext = createContext<LocationContextProps>({
    location: defaultLocation,
    setLocation: () => {}
});

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<Location>(defaultLocation);

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
};