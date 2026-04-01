import React from 'react';

// Configuración de rangos que definimos para SmartGrow
const CONFIG = {
  ph: { min: 5.2, max: 6.5, low: 5.1, high: 6.6 },
  ppm: { min: 500, max: 900 }
};

export default function SmartGrowPage() {
  // Simulación de datos (luego los conectaremos a tus sensores)
  const currentPH = 6.2; 
  const currentPPM = 750;

  const getStatus = (val: number, type: 'ph' | 'ppm') => {
    if (type === 'ph') {
      if (val <= CONFIG.ph.low) return { label: 'BAJO', color: 'text-red-500' };
      if (val >= CONFIG.ph.high) return { label: 'ALTO', color: 'text-red-500' };
      return { label: 'OPTIMO', color: 'text-green-500' };
    }
    return val >= CONFIG.ppm.min && val <= CONFIG.ppm.max 
      ? { label: 'OPTIMO', color: 'text-green-500' } 
      : { label: 'REVISAR', color: 'text-yellow-500' };
  };

  const phStatus = getStatus(currentPH, 'ph');
  const ppmStatus = getStatus(currentPPM, 'ppm');

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2d3436' }}>🌿 SmartGrow Dashboard</h1>
        <p style={{ color: '#636e72' }}>Monitoreo en tiempo real - Nexus Project</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {/* Card de pH */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>Nivel de pH</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>{currentPH}</p>
          <span style={{ fontWeight: 'bold', color: phStatus.label === 'OPTIMO' ? '#00b894' : '#d63031' }}>
            ESTADO: {phStatus.label}
          </span>
        </div>

        {/* Card de PPM */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>Concentración (PPM)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>{currentPPM}</p>
          <span style={{ fontWeight: 'bold', color: ppmStatus.label === 'OPTIMO' ? '#00b894' : '#e17055' }}>
            ESTADO: {ppmStatus.label}
          </span>
        </div>
      </div>

      <footer style={{ marginTop: '40px', fontSize: '0.8rem', color: '#b2bec3' }}>
        Rango pH ideal: {CONFIG.ph.min} - {CONFIG.ph.max} | Rango PPM ideal: {CONFIG.ppm.min} - {CONFIG.ppm.max}
      </footer>
    </div>
  );
}
