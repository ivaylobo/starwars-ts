import {ReactNode} from "react";

export interface FetchedTable {
    name: string;
    url: string;
}

export interface TableProps<T> {
    data: T[]; // Array of the generic type T
    handlePrev: () => void;
    handleNext: () => void;
    currPage: number;
    children?: ReactNode;
    disableNext: boolean;
}

export interface PeopleData {
    name: string;
    mass: string;
    height: string;
    hair_color: string;
    skin_color: string;
}

export interface FilmData {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
}

export interface StarshipData {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
}

export interface PlanetData {
    name: string;
    population: string;
    climate: string;
    gravity: string;
}

export interface VehiclesData {
    name: string;
    model: string;
    manufacturer: string;
    length: string;
}

export interface SpeciesData {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
}

export type TableData = PeopleData | FilmData | StarshipData | PlanetData | VehiclesData | SpeciesData;