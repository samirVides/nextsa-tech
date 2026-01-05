import React from 'react';

const DigitalGlobe = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
      
      {/* CONTENEDOR ESFÉRICO PRINCIPAL */}
      <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full shadow-[0_0_100px_rgba(59,130,246,0.4)] bg-[#050b1d] overflow-hidden">
        
        {/* 1. La Textura de los Continentes Girando */}
        <div className="absolute inset-0 w-full h-full animate-spin-earth z-10"></div>

        {/* 2. Efecto de "Grid" o Malla encima (Estático) para efecto digital */}
        <div className="absolute inset-0 z-20 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-repeat rounded-full mix-blend-overlay"></div>

        {/* 3. Sombra Interior (Da el efecto 3D esférico) */}
        <div className="absolute inset-0 rounded-full shadow-[inset_20px_0_60px_15px_rgba(0,0,0,0.95)] z-30 pointer-events-none"></div>
        
        {/* 4. Brillo Atmosférico (Borde Azul) */}
        <div className="absolute inset-0 rounded-full border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-40"></div>
      
      </div>
    </div>
  );
};

export default DigitalGlobe;