import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { usePublicHome, useSubmitQuote, QuoteFormData } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { OfficeCards } from './components/OfficeCards.js';
import { QuoteSuccessCard } from './components/QuoteSuccessCard.js';
import { QuoteFormFields } from './components/QuoteFormFields.js';
import { Send, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Nama minimal 2 karakter'),
  companyName: z.string().min(2, 'Nama perusahaan minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().min(8, 'Nomor WhatsApp minimal 8 digit'),
  city: z.string().min(2, 'Kota lokasi wajib diisi'),
  interestedProduct: z.string().min(2, 'Pilih produk yang diminati'),
  targetCapacity: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

function zodResolver(schema: typeof formSchema) {
  return async (data: unknown) => {
    const res = schema.safeParse(data);
    if (res.success) return { values: res.data, errors: {} };
    const errs: Record<string, { message: string }> = {};
    res.error.issues.forEach((issue) => {
      const field = String(issue.path[0]);
      if (!errs[field]) errs[field] = { message: issue.message };
    });
    return { values: {}, errors: errs };
  };
}

export const ContactQuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefill = searchParams.get('product') || searchParams.get('service') || '';
  const [submittedQuoteNo, setSubmittedQuoteNo] = useState<string | null>(null);
  const [rateLimitErr, setRateLimitErr] = useState<string | null>(null);

  const { data: homeData } = usePublicHome();
  const submitQuote = useSubmitQuote();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { interestedProduct: prefill || 'Mesin Es Tube' },
  });

  const onSubmit = async (values: QuoteFormData) => {
    setRateLimitErr(null);
    const lastSubmit = Number(sessionStorage.getItem('ef_quote_ts') || '0');
    if (Date.now() - lastSubmit < 30000) {
      setRateLimitErr('Permintaan sedang diproses. Mohon tunggu 30 detik sebelum mengirim kembali.');
      return;
    }
    try {
      const res = await submitQuote.mutateAsync(values);
      sessionStorage.setItem('ef_quote_ts', String(Date.now()));
      setSubmittedQuoteNo(res?.quoteNumber || 'EF-2025-0101');
      reset();
    } catch {
      // Handled by TanStack mutation
    }
  };

  const cleanPhone = (homeData?.settings?.whatsappNumber || '+628118899721').replace(/[^0-9]/g, '');

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEOHead
        title="Minta Penawaran Harga & Kontak Kantor"
        description="Formulir resmi permintaan penawaran harga mesin es industri dan cold storage."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Respon Cepat 1x24 Jam
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Permintaan Penawaran Harga & Spesifikasi
          </h1>
          <p className="text-slate-600 mt-2 text-sm">
            Isi formulir untuk menerima estimasi penawaran teknis resmi dari insinyur refrigerasi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            {submittedQuoteNo ? (
              <QuoteSuccessCard
                quoteNumber={submittedQuoteNo}
                cleanPhone={cleanPhone}
                onReset={() => setSubmittedQuoteNo(null)}
              />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <QuoteFormFields register={register} errors={errors} />

                {(submitQuote.isError || rateLimitErr) && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 text-rose-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{rateLimitErr || (submitQuote.error as Error)?.message || 'Terjadi kesalahan sistem.'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitQuote.isPending}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitQuote.isPending ? 'Mengirim Formulir...' : 'Kirim Permintaan Penawaran'}</span>
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5">
            <OfficeCards offices={homeData?.offices} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactQuotePage;
