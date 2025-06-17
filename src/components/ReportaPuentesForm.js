import React, { useState } from 'react';

const ReportaPuentesForm = ({ onReportSubmit }) => {
  const [reporterName, setReporterName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [otherProblem, setOtherProblem] = useState('');
  const [photos, setPhotos] = useState([]);
  const [observations, setObservations] = useState('');

  const problemOptions = [
    "Barandas rotas",
    "Pisos oxidados",
    "Presencia de basura",
    "Grafitis ofensivos",
    "Señalización desgastada",
    "Grietas o filtraciones",
  ];

  const handleProblemChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedProblems([...selectedProblems, value]);
    } else {
      setSelectedProblems(selectedProblems.filter((problem) => problem !== value));
    }
  };

  const handleFileChange = (e) => {
    setPhotos([...photos, ...Array.from(e.target.files)]);
  };

  const handleSubmit = () => {
    const report = {
      reporterName,
      location,
      problems: selectedProblems,
      otherProblem,
      photos: photos.map(file => file.name), // Solo guardamos los nombres para el mock
      observations,
    };
    onReportSubmit(report);
    // Limpiar formulario
    setReporterName('');
    setLocation('');
    setSelectedProblems([]);
    setOtherProblem('');
    setPhotos([]);
    setObservations('');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reportar un Puente</h2>

      <div className="mb-4">
        <label htmlFor="reporterName" className="block text-gray-700 text-sm font-bold mb-2">
          Tu Nombre (Opcional):
        </label>
        <input
          type="text"
          id="reporterName"
          value={reporterName}
          onChange={(e) => setReporterName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Ej. Juan Pérez"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
          Ubicación del Puente:
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Ej. Puente Primavera, Surco"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Problemas Encontrados:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {problemOptions.map((option) => (
            <label key={option} className="inline-flex items-center">
              <input
                type="checkbox"
                value={option}
                checked={selectedProblems.includes(option)}
                onChange={handleProblemChange}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="Otro"
              checked={selectedProblems.includes("Otro")}
              onChange={handleProblemChange}
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
            />
            <span className="ml-2 text-gray-700">Otro:</span>
          </label>
        </div>
        {selectedProblems.includes("Otro") && (
          <textarea
            value={otherProblem}
            onChange={(e) => setOtherProblem(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            rows="2"
            placeholder="Describe el otro problema..."
          ></textarea>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="photos" className="block text-gray-700 text-sm font-bold mb-2">
          Adjuntar Fotos:
        </label>
        <input
          type="file"
          id="photos"
          multiple
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <div className="mt-2 text-sm text-gray-600">
          {photos.length > 0 ? `Archivos seleccionados: ${photos.map(f => f.name).join(', ')}` : 'Ningún archivo seleccionado.'}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="observations" className="block text-gray-700 text-sm font-bold mb-2">
          Observaciones Adicionales:
        </label>
        <textarea
          id="observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          rows="4"
          placeholder="Cualquier detalle adicional sobre el estado del puente..."
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        Enviar Reporte
      </button>
    </div>
  );
};

export default ReportaPuentesForm;