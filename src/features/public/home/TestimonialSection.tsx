import React from 'react';
import { TestimonialData } from '../../../types/public.js';
import { Star, Quote } from 'lucide-react';

interface TestimonialSectionProps {
  testimonials?: TestimonialData[];
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'
      }`}
    />
  ));
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials = [] }) => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Kepercayaan Klien
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Apa Kata Pemilik Pabrik Es & Eksportir Seafood
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Komitmen kami dibuktikan oleh kepuasan operasional pabrik klien yang beroperasi non-stop
            menjaga mutu rantai dingin di berbagai pulau di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id || t.clientName}
              className="flex flex-col justify-between p-8 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-sky-200 mb-4" />
              <div>
                <div className="flex items-center gap-1 mb-4">{renderStars(t.rating)}</div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={t.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                  alt={t.clientName}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.clientName}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                  <p className="text-xs font-semibold text-[#0B4F8A]">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
