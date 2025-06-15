import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { FuelApi } from './apis/FuelApi';
import { effect } from "@preact/signals-react";


import Header from './components/Header';
import FuelMap from './components/FuelMap';
import About from './components/About';
import Home from './components/Home';
import StationDetail from './components/StationDetail';
import FuelTable from './components/FuelTable';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import { NotFound } from './NotFound';
import { FuelApiResponse, GasStationData } from './types';
import { errorFuelApi, fuelApiData, isLoadingFuelApi } from './store';
import FuelApiHandler from './components/FuelApiHandler';

// Componente principal de la aplicación
// Este componente es el punto de entrada de la aplicación y se encarga de gestionar las rutas y el estado global de la aplicación.
// Utiliza React Router para la navegación entre diferentes componentes y páginas.
// También se encarga de la carga inicial de datos (precios de combustible) y del manejo de errores.
// El componente utiliza el hook useEffect para realizar una llamada a la API de precios de combustible al cargar la aplicación.
// Además, utiliza el hook useState para gestionar el estado de los precios de combustible, el usuario autenticado, el estado de carga y los errores.
// El componente Header se encarga de mostrar la barra de navegación y el estado de autenticación del usuario.
// El componente Routes se encarga de definir las diferentes rutas de la aplicación y los componentes que se renderizan en cada ruta.
// El componente BrowserRouter se encarga de gestionar la navegación entre las diferentes rutas de la aplicación.

effect(() => {
  const fetchData = async () => {
    isLoadingFuelApi.value = true
    try {
      const res = await FuelApi.getInstance().getFuelPrices()
      const resData = await res as FuelApiResponse | undefined;
      if (!resData) {
        errorFuelApi.value = "Ha habido un error al cargar la informacion de las EE.SS"
        return
      }
      fuelApiData.value = resData.ListaEESSPrecio
    }
    finally {
      isLoadingFuelApi.value = false
    }

  }

  fetchData()
})
function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <div className='flex-grow'>
          <Routes>
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />

            <Route element={<FuelApiHandler />}>
              <Route path="/" element={<Home stations={fuelApiData.value} />} />
              <Route path="/mapa" element={<FuelMap stations={fuelApiData.value} />} />
              <Route path="/lista" element={<FuelTable stations={fuelApiData.value} />} />
              <Route path="/station/:id" element={<StationDetail stations={fuelApiData.value} />} />
            </Route>
            <Route path="*" element={<NotFound />} /> {/* Pagina no encontrada */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App