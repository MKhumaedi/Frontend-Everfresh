import React from 'react';
import { OfficeData } from '../../../types/public.js';
import { MapPin, Phone, Mail } from 'lucide-react';

interface OfficeCardsProps {
  offices?: OfficeData[];
}

export const OfficeCards: React.FC<OfficeCardsProps> = ({ offices = [] }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900">Kantor Pemasaran & Fasilitas Workshop</h3>
      <div className="space-y-4">
        {offices.map((office) => (
          <div
            key={office.id || office.city}
            className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2 text-sm"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900">{office.city}</h4>
              {office.isHeadquarters && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-[#0B4F8A] px-2 py-0.5 rounded">
                  Kantor Pusat
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">{office.officeType}</p>
            <div className="flex items-start gap-2 text-xs text-slate-600 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0B4F8A] shrink-0 mt-0.5" />
              <span>{office.address}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{office.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{office.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
