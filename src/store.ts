import { signal } from "@preact/signals-react";
import { GasStationData } from "./types";


export const userName = signal<string | undefined>();
export const isLoadingFuelApi = signal(true);
export const fuelApiData = signal<GasStationData[]>([])
export const errorFuelApi = signal<string | undefined>(undefined);