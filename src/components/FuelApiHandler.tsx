import { errorFuelApi, fuelApiData, isLoadingFuelApi } from "@/store";
import { Outlet } from "react-router-dom";


export default function FuelApiHandler() {

    if (isLoadingFuelApi.value) {
        // As we use this for different routes, we created a mix of views loader 
        return (
            <div className="p-4 space-y-6">
                {/* Map Placeholder */}
                <div className="h-48 w-full bg-gray-300 rounded-lg animate-pulse"></div>

                {/* Fuel Price Placeholder */}
                <div className="flex gap-4">
                    <div className="w-24 h-14 bg-gray-300 rounded-lg animate-pulse"></div>
                    <div className="w-24 h-14 bg-gray-300 rounded-lg animate-pulse"></div>
                    <div className="w-24 h-14 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>

                {/* List Placeholder */}
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-12 w-full bg-gray-300 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>)
    }

    else if (errorFuelApi.value) {
        return <p>Error al cargar las estaciones...</p>;
    }

    else if (!isLoadingFuelApi.value && !errorFuelApi.value) return <Outlet />

}
