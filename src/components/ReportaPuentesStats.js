import React from 'react';

const ReportaPuentesStats = ({ reports }) => {
  // Opciones de problemas para asegurar que todos aparezcan, incluso con 0 reportes
  const problemOptions = [
    "Barandas rotas",
    "Pisos oxidados",
    "Presencia de basura",
    "Grafitis ofensivos",
    "Señalización desgastada",
    "Grietas o filtraciones",
    "Otro"
  ];

  // Contar problemas por tipo
  const problemCounts = reports.reduce((acc, report) => {
    report.problems.forEach(problem => {
      acc[problem] = (acc[problem] || 0) + 1;
    });
    if (report.otherProblem && report.otherProblem.trim() !== '') {
      acc['Otro'] = (acc['Otro'] || 0) + 1;
    }
    return acc;
  }, {});

  // Datos para el gráfico de barras de problemas
  const problemBarChartData = problemOptions.map(problem => ({
    problem,
    count: problemCounts[problem] || 0,
  }));

  const totalReports = reports.length;
  const maxProblemCount = Math.max(...problemBarChartData.map(data => data.count), 1);

  // Colores para las barras
  const colors = [
    '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8A2BE2', '#7FFF00'
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Estadísticas de Reportes</h2>
      
      {/* Gráfico de Total de Reportes */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Total de Reportes Enviados:</h3>
      <div className="flex items-center mb-8">
        <span className="w-32 text-gray-700 text-sm font-medium flex-shrink-0">Reportes:</span>
        <div className="flex-grow bg-gray-200 rounded-full h-8 relative overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out bg-blue-600"
            style={{ width: `${(totalReports / (totalReports > 0 ? totalReports : 1)) * 100}%` }}
          ></div>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-white">
            {totalReports}
          </span>
        </div>
      </div>

      {/* Gráfico de Barras de Reportes por Tipo de Problema */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Reportes por Tipo de Problema:</h3>
      <div className="space-y-4">
        {problemBarChartData.map((data, index) => (
          <div key={data.problem} className="flex items-center">
            <span className="w-32 text-gray-700 text-sm font-medium flex-shrink-0">{data.problem}:</span>
            <div className="flex-grow bg-gray-200 rounded-full h-6 relative overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(data.count / maxProblemCount) * 100}%`,
                  backgroundColor: colors[index % colors.length],
                }}
              ></div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-800">
                {data.count}
              </span>
            </div>
          </div>
        ))}
      </div>

      {totalReports === 0 && (
        <p className="text-gray-600 text-center mt-8">Aún no hay reportes para mostrar estadísticas.</p>
      )}
    </div>
  );
};

export default ReportaPuentesStats;

// DONE