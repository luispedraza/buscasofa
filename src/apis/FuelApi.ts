import { fetchFuelPrices } from "./fuelApiLib";

/**
 * The Singleton class defines an `instance` getter, that lets clients access
 * the unique singleton instance.
 */
class FuelApi {
  private static instance: FuelApi;
  private data: object | null = null; // Datos obtenidos de la API
  private cacheLocalStorage: boolean; // Indica si se va a usar localStorage para cachear los datos

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor(cacheLocalStorage: boolean = false) {
    this.cacheLocalStorage = cacheLocalStorage;
    this.data = null;
  }

  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static getInstance(cacheLocalStorage: boolean = false): FuelApi {
    if (!FuelApi.instance) {
      FuelApi.instance = new FuelApi(cacheLocalStorage);
    }

    return FuelApi.instance;
  }

  /**
   * Finally, any singleton can define some business logic, which can be
   * executed on its instance.
   */
  public async getFuelPrices() {

    if (this.data) return this.data;

    if (this.cacheLocalStorage) {
      let localData = localStorage.getItem("buscasofaData");
      if (localData) {
        this.data = JSON.parse(localData);
        return this.data;
      }
    }

    // Llamada a la API fuera de la condición de `cacheLocalStorage`
    this.data = await fetchFuelPrices();

    if (this.cacheLocalStorage) {
      localStorage.setItem("buscasofaData", JSON.stringify(this.data));
    }

    return this.data;
  }
}
export { FuelApi };
