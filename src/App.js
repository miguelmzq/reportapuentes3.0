import React, { useState } from 'react';
import ReportaPuentesHeader from './components/ReportaPuentesHeader';
import ReportaPuentesForm from './components/ReportaPuentesForm';
import ReportaPuentesStats from './components/ReportaPuentesStats';
import { useLocalStorage } from './utils/storage';
import { initialReports } from './mock/reports';

const App = () => {
  const [currentPage, setCurrentPage] = useState('form'); // 'form' o 'stats'
  const [reports, setReports] = useLocalStorage('reports', initialReports);

  const handleReportSubmit = (newReport) => {
    setReports((prevReports) => [...prevReports, newReport]);
    alert('¡Reporte enviado con éxito! Gracias por tu contribución.');
    setCurrentPage('stats'); // Redirigir a estadísticas después de enviar
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 font-sans">
      <ReportaPuentesHeader />

      <nav className="flex justify-center space-x-4 p-4 bg-white shadow-md">
        <button
          onClick={() => setCurrentPage('form')}
          className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
            currentPage === 'form'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Reportar
        </button>
        <button
          onClick={() => setCurrentPage('stats')}
          className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
            currentPage === 'stats'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Estadísticas
        </button>
      </nav>

      <main className="container mx-auto p-4">
        {currentPage === 'form' && <ReportaPuentesForm onReportSubmit={handleReportSubmit} />}
        {currentPage === 'stats' && <ReportaPuentesStats reports={reports} />}
      </main>
    </div>
  );
};

export default App;

// DONE