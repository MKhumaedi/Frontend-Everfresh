import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from './AuthContext.js';
import { apiClient } from '../../lib/api/client.js';
import { EverfreshLogo } from '../../components/ui/EverfreshLogo.js';
import { ShieldCheck, Lock, Mail, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Kata sandi minimal 6 karakter'),
});

type LoginInputs = z.infer<typeof loginSchema>;

function zodResolver(schema: typeof loginSchema) {
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

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'superadmin@everfresh.id', password: '' },
  });

  const onSubmit = async (values: LoginInputs) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await apiClient<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      if (res.data?.token && res.data?.user) {
        login(res.data.token, res.data.user);
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Email atau kata sandi tidak sesuai');
    } finally {
      setIsSubmitting(false);
    }
  };

  const setCredentials = (email: string, pass: string) => {
    setValue('email', email);
    setValue('password', pass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F8FB] px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <EverfreshLogo size="md" />
          </div>
          <span className="text-[11px] font-bold tracking-widest text-[#0B4F8A] uppercase block">
            Industrial Management Console
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 pt-2">Masuk ke Portal Staf</h1>
          <p className="text-xs text-slate-500">Khusus staf internal berwenang (SUPERADMIN & ADMIN).</p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Akun</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                {...register('email')}
                type="email"
                placeholder="superadmin@everfresh.id"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:border-[#0B4F8A]"
              />
            </div>
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:border-[#0B4F8A]"
              />
            </div>
            {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0B4F8A] hover:bg-[#083a66] text-white font-semibold text-sm py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isSubmitting ? 'Memverifikasi...' : 'Masuk Portal'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 space-y-2 text-center text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Pilih Akun Demo Uji:</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setCredentials('superadmin@everfresh.id', 'SuperAdmin2025!')}
              className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0B4F8A] text-left cursor-pointer border border-sky-100"
            >
              <span className="font-bold block text-[11px]">SUPERADMIN</span>
              <span className="text-[10px] text-slate-500">Akses Penuh Semua Menu</span>
            </button>
            <button
              type="button"
              onClick={() => setCredentials('admin@everfresh.id', 'AdminPass123!')}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-left cursor-pointer border border-slate-200"
            >
              <span className="font-bold block text-[11px]">ADMIN</span>
              <span className="text-[10px] text-slate-500">Kelola Konten & Penawaran</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLoginPage;
