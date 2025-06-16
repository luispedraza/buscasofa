import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FuelFilters from './FuelFilters';
import './FuelTable.css';

const PAGE_SIZE = 20;

const FuelTable = ({ stations }) => {

  // Filtros
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');

  // Orden
  const [sortField, setSortField] = useState<string>('Precio Gasoleo A');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);


  // Provincias y ciudades únicas
  const provinces : string[] = useMemo(
    () => Array.from(new Set(stations.map(s => s.Provincia))).sort() as string[],
    [stations]
  );
  const cities: string[] = useMemo(
    () =>
      Array.from(
        new Set(
          stations
            .filter(s => !selectedProvince || s.Provincia === selectedProvince)
            .map(s => s.Municipio)
        )
      ).sort() as string[],
    [stations, selectedProvince]
  );

  // Filtrado
  const filteredStations = useMemo(() => {
    return stations.filter(station => {
      const matchProvince = !selectedProvince || station.Provincia === selectedProvince;
      const matchCity = !selectedCity || station.Municipio === selectedCity;
      const matchFuel =
        !selectedFuel ||
        (station[selectedFuel] && station[selectedFuel].replace(',', '.') !== '' && station[selectedFuel] !== '-');
      return matchProvince && matchCity && matchFuel;
    });
  }, [stations, selectedProvince, selectedCity, selectedFuel]);

  // Ordenación
  const sortedStations = useMemo(() => {
    /*if (!selectedFuel) return filteredStations;
      return [...filteredStations].sort((a, b) => {
      const aVal = parseFloat((a[sortField] || '0').replace(',', '.')) || 0;
      const bVal = parseFloat((b[sortField] || '0').replace(',', '.')) || 0;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });*/

    return [...filteredStations].sort((a, b) => { //Evita que las vacías salgan cómo las menores
      const rawA = a[sortField];
      const rawB = b[sortField];

      const hasA = rawA && rawA !== '-' && rawA.trim() !== '';
      const hasB = rawB && rawB !== '-' && rawB.trim() !== '';

      if (!hasA && !hasB) return 0;
      if (!hasA) return 1; // a va después
      if (!hasB) return -1; // b va después

      const aVal = parseFloat(rawA.replace(',', '.')) || 0;
      const bVal = parseFloat(rawB.replace(',', '.')) || 0;

      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

  }, [filteredStations, sortField, sortOrder, selectedFuel]);

  // Paginación
  const totalPages = Math.ceil(sortedStations.length / PAGE_SIZE);
  const paginatedStations = sortedStations.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Cambiar orden
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Reset página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProvince, selectedCity, selectedFuel]);

  // Converir , decimal a . para cálculos. Quitar vacíos/nulos
  const parsePrice = (val: string) => {
  if (!val || typeof val !== 'string') return NaN;
    const cleaned = val.replace(',', '.').trim();
    const num = parseFloat(cleaned);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const getTopPercentiles = (values: number[]) => {
    const cleaned = values.filter(v => typeof v === 'number' && !isNaN(v) && v > 0);
    // console.log('Valores válidos para percentil:', cleaned);
    const sorted = [...cleaned].sort((a, b) => a - b)
    const p10 = sorted[Math.floor(0.1 * sorted.length)] || 0
    const p20 = sorted[Math.floor(0.2 * sorted.length)] || 0
    const p80 = sorted[Math.floor(0.8 * sorted.length)] || 0
    return { p10, p20, p80 }
  }

  const { p10: diesel10, p20: diesel20, p80: diesel80 } = useMemo(() => {
    const values = sortedStations.map(s => parsePrice(s['Precio Gasoleo A']))
    return getTopPercentiles(values)
  }, [sortedStations])

  const { p10: gas9510, p20: gas9520, p80: gas9580 } = useMemo(() => {
    const values = sortedStations.map(s => parsePrice(s['Precio Gasolina 95 E5']))
    return getTopPercentiles(values)
  }, [sortedStations])

  const getPriceClassDynamic = (value: string, p10: number, p20: number, p80: number) => {
    const val = parsePrice(value)
    if (val <= p10) return 'text-green-600 font-semibold'
    if (val <= p20) return 'text-yellow-600'
    if (val >= p80) return 'text-red-600 font-semibold'
    return 'text-black'
  }

  const getPriceLabel = (value: string, p10: number, p20: number, p80: number) => {
    const val = parsePrice(value)
    if (val <= p10) return '(Top 10%)'
    if (val <= p20) return '(Top 20%)'
    if (val >= p80) return '(Caro)'
    return ''
  }

  return (
    <div className='container mx-auto'>
      <h2>Precios de combustibles en gasolineras españolas</h2>
      <FuelFilters
        provinces={provinces}
        cities={cities}
        selectedProvince={selectedProvince}
        selectedCity={selectedCity}
        selectedFuel={selectedFuel}
        onProvinceChange={setSelectedProvince}
        onCityChange={setSelectedCity}
        onFuelChange={setSelectedFuel}
      />
      <div className="flex justify-center gap-4 mb-4">
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
          🟢 Top 10% más barato
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
          🟡 Top 20%
        </div>
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
          🔴 20% más caro
        </div>
      </div>
      <table className="fuel-table">
        <thead>
          <tr>
            <th>Gasolinera</th>
            <th>Dirección</th>
            <th>Municipio</th>
            <th>
              <button
                className="sortable"
                onClick={() => handleSort('Precio Gasoleo A')}
              >
                Gasóleo A {sortField === 'Precio Gasoleo A' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
              </button>
            </th>
            <th>
              <button
                className="sortable"
                onClick={() => handleSort('Precio Gasolina 95 E5')}
              >
                Gasolina 95 E5 {sortField === 'Precio Gasolina 95 E5' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
              </button>
            </th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStations.map((station, idx) => (
            <tr key={station.IDEESS || idx}>
              <td>{station['Rótulo']}</td>
              <td>{station['Dirección']}</td>
              <td>{station['Municipio']}</td>
              <td className={getPriceClassDynamic(station['Precio Gasoleo A'], diesel10, diesel20, diesel80)}>
                {station['Precio Gasoleo A']} <span className="text-xs">{getPriceLabel(station['Precio Gasoleo A'], diesel10, diesel20, diesel80)}</span>
              </td>
              <td className={getPriceClassDynamic(station['Precio Gasolina 95 E5'], gas9510, gas9520, gas9580)}>
                {station['Precio Gasolina 95 E5']} <span className="text-xs">{getPriceLabel(station['Precio Gasolina 95 E5'], gas9510, gas9520, gas9580)}</span>
              </td>
              <td>
                <Link
                  to={`/station/${station.IDEESS}`}
                  state={{
                    gobackLink: "/lista"
                  }}
                >
                  Ver detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          {'<<'}
        </button>
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
          {'<'}
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          {'>'}
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default FuelTable;