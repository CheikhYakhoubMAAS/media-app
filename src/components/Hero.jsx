import React from 'react';
import { ArrowRight, ActivitySquare } from 'lucide-react';

const Hero = () => {
  return (
    <section id="accueil" className="relative bg-brand-dark pt-20 pb-28 lg:pt-32 lg:pb-40 overflow-hidden flex-grow flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/4 w-[800px] h-[800px]" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="400" fill="url(#gradient)" />
          <defs>
            <radialGradient id="gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 400) rotate(90) scale(400)">
              <stop stopColor="#62C298" />
              <stop offset="1" stopColor="#0F2C23" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 border border-brand-mint/20 backdrop-blur-sm">
              <ActivitySquare className="h-5 w-5 text-brand-mint" />
              <span className="text-brand-mint text-sm font-medium tracking-wide uppercase">Innovation en santé</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              L'<span className="text-brand-mint relative inline-block">
                Intelligence Artificielle
                <span className="absolute bottom-1 left-0 w-full h-3 bg-brand-mint/20 -z-10 rounded-full"></span>
              </span> au service du diagnostic médical pour tous.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              Solutions innovantes pour l'amélioration du diagnostic dans les environnements à ressources limitées. Découvrez FibroDetect AI.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 pt-4">
              <button className="flex items-center justify-center space-x-2 bg-brand-mint text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-white transition-all shadow-[0_4px_14px_0_rgba(98,194,152,0.39)] hover:shadow-[0_6px_20px_rgba(98,194,152,0.23)] transform hover:-translate-y-1">
                <span>Découvrir la solution</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button className="flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white border-2 border-gray-600 hover:border-brand-mint hover:text-brand-mint transition-all bg-white/5 backdrop-blur-sm">
                Nous contacter
              </button>
            </div>
          </div>
          
          {/* Abstract Image / Illustration placeholder */}
          <div className="relative hidden lg:block">
            {/* Glowing effect behind the device */}
            <div className="absolute inset-0 bg-brand-mint/20 rounded-full filter blur-3xl transform scale-75 animate-pulse duration-3000"></div>
            
            {/* 3D-like container */}
            <div className="relative h-[550px] w-full flex justify-center items-center perspective-1000">
               {/* Mock Mobile UI for FibroDetect App */}
               <div className="w-72 h-[500px] bg-brand-gray rounded-[2.5rem] border-[10px] border-gray-800 shadow-2xl relative overflow-hidden transform rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out z-20">
                  {/* Notch */}
                  <div className="absolute top-0 inset-x-0 h-6 flex justify-center items-end bg-gray-800 rounded-b-2xl px-4 pb-1 mx-auto w-32 z-30">
                    <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
                  </div>
                  
                  {/* App Content */}
                  <div className="bg-white h-full w-full pt-10 px-5 flex flex-col space-y-5">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">Patient #492</span>
                        <span className="text-sm font-bold text-brand-dark">Dr. Diallo</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-brand-mint/20 flex items-center justify-center">
                        <ActivitySquare className="h-4 w-4 text-brand-mint" />
                      </div>
                    </div>
                    
                    {/* Fake Ultrasound Scan Image */}
                    <div className="h-40 bg-gray-900 rounded-2xl relative overflow-hidden shadow-inner">
                      {/* Ultrasound static pattern fake */}
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600 via-gray-800 to-black mix-blend-screen"></div>
                      
                      {/* Overlay scanning effect */}
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-brand-mint/40 to-transparent"></div>
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-mint shadow-[0_0_10px_#62C298] animate-pulse"></div>
                      
                      {/* Detection bounding box */}
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-brand-mint border-dashed rounded-lg flex items-center justify-center bg-brand-mint/10">
                        <span className="bg-brand-mint text-brand-dark text-[10px] font-bold px-1.5 py-0.5 rounded absolute -top-3 left-1/2 -translate-x-1/2">
                          Zone cible
                        </span>
                      </div>
                    </div>
                    
                    {/* Insights Block */}
                    <div className="space-y-3">
                       <div className="flex items-center justify-between mt-2">
                         <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Résultats</span>
                         <span className="text-xs font-bold text-brand-mint bg-brand-mint/10 px-2 py-1 rounded">Analyse complète</span>
                       </div>
                       
                       <div className="bg-brand-gray p-3 rounded-xl border border-gray-200">
                         <div className="flex justify-between items-center mb-1">
                           <span className="text-xs font-semibold text-gray-600">Confiance IA</span>
                           <span className="text-xs font-bold text-brand-mint">98.4%</span>
                         </div>
                         <div className="w-full bg-gray-200 rounded-full h-1.5">
                           <div className="bg-brand-mint h-1.5 rounded-full" style={{ width: '98%' }}></div>
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                         <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                         <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                         <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                       </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-auto pt-2 pb-4">
                      <div className="w-full h-12 bg-brand-dark text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-md">
                        Enregistrer l'examen
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
