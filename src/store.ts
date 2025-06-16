import { signal } from "@preact/signals-react";
import { GasStationData } from "./types";

interface IUserStore {
  username: string;
  role: "user" | "admin";
}
export const userStore = signal<IUserStore | undefined>();
export const isLoadingFuelApi = signal(true);
export const fuelApiData = signal<GasStationData[]>([]);
export const errorFuelApi = signal<string | undefined>(undefined);
