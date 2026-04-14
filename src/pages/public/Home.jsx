import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col flex-grow bg-gray-50">
      <section className="bg-brand-dark py-12 lg:py-16 relative overflow-hidden flex-shrink-0">
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

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              L'<span className="text-brand-mint relative inline-block">
                Intelligence Artificielle
                <span className="absolute bottom-1 left-0 w-full h-2 bg-brand-mint/20 -z-10 rounded-full"></span>
              </span> au service du diagnostic pour tous.
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 flex-grow flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">À Propos de MedIA</h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6 text-justify">
            MedIA est une initiative novatrice née de la volonté d'offrir des diagnostics rapides, précis et abordables à toutes les communautés. Si nous révolutionnons la santé grâce à l'imagerie médicale assistée par ordinateur, notre expertise s'étend à l'ensemble du spectre de l'Intelligence Artificielle.
          </p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 text-justify">
            Nous accompagnons la modernisation des structures à travers des solutions d'automatisation intelligente et des systèmes d'OCR haute précision. Acteur engagé du transfert de compétences, MedIA propose également des programmes de formation pour préparer les talents aux défis technologiques de demain.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <Link to="/services" className="inline-flex items-center justify-center space-x-2 bg-brand-mint text-brand-dark px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md hover:-translate-y-0.5 hover:bg-opacity-90">
              <span>Découvrir nos services</span>
              <Icons.ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-brand-mint hover:text-slate-900 transition-all shadow-sm">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
