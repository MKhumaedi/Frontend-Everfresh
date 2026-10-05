import React, { useState } from 'react';
import { useInquiryDetail, useUpdateInquiryStatus, useAddInquiryNote } from '../api/inquiriesApi.js';
import { MessageCircle, Send, CheckCircle2, Clock, Building, MapPin, Mail, Phone } from 'lucide-react';

interface InquiryDetailPaneProps {
  inquiryId: string | null;
}

export const InquiryDetailPane: React.FC<InquiryDetailPaneProps> = ({ inquiryId }) => {
  const { data: inquiry, isLoading } = useInquiryDetail(inquiryId);
  const updateStatus = useUpdateInquiryStatus();
  const addNote = useAddInquiryNote();
  const [noteText, setNoteText] = useState('');

  if (!inquiryId) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-slate-400 bg-white rounded-xl border border-slate-200 text-sm">
        Pilih salah satu permintaan penawaran di sebelah kiri untuk melihat rincian & menindaklanjuti.
      </div>
    );
  }

  if (isLoading || !inquiry) {
    return <div className="p-8 text-center text-slate-400 text-sm animate-pulse">Memuat rincian penawaran...</div>;
  }

  const cleanPhone = inquiry.phone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Halo Bapak/Ibu ${inquiry.fullName} dari ${inquiry.companyName}, kami dari EVERFRESH Industrial Ice menindaklanjuti permintaan penawaran nomor ${inquiry.quoteNumber} untuk ${inquiry.interestedProduct}.`
  )}`;

  const handleSendNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    await addNote.mutateAsync({ id: inquiry.id, note: noteText });
    setNoteText('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs h-full flex flex-col overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            {inquiry.quoteNumber}
          </span>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">{inquiry.fullName}</h2>
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" />{inquiry.companyName}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{inquiry.city}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp</span>
          </a>
          <select
            value={inquiry.status}
            onChange={(e) => updateStatus.mutate({ id: inquiry.id, status: e.target.value })}
            className="text-xs font-bold border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white text-slate-800 cursor-pointer"
          >
            <option value="NEW">Baru Masuk</option>
            <option value="CONTACTED">Sudah Dihubungi</option>
            <option value="SURVEY_SCHEDULED">Jadwal Survei Lokasi</option>
            <option value="PROPOSAL_SENT">Proposal Harga Terkirim</option>
            <option value="DEAL_WON">Deal / Disetujui</option>
            <option value="DEAL_LOST">Batal / Lost</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block">Produk Diminati</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{inquiry.interestedProduct}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Kapasitas Target</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{inquiry.targetCapacity || 'Sesuai Rekomendasi'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Email Kontak</span>
            <span className="font-medium text-slate-800">{inquiry.email}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Telepon / WhatsApp</span>
            <span className="font-medium text-slate-800">{inquiry.phone}</span>
          </div>
        </div>

        {inquiry.notes && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Pesan / Catatan Dari Klien</h4>
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
              {inquiry.notes}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Catatan Internal Tim Sales & Engineering</h4>
          <form onSubmit={handleSendNote} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Tulis catatan tindak lanjut..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:border-[#0B4F8A]"
            />
            <button
              type="submit"
              disabled={addNote.isPending || !noteText.trim()}
              className="px-3.5 py-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg disabled:opacity-50 cursor-pointer flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </button>
          </form>

          <div className="space-y-2">
            {(inquiry.quoteNotes || []).map((n) => (
              <div key={n.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="font-bold text-slate-700">{n.authorName || 'Admin'}</span>
                  <span>{new Date(n.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-slate-700">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
