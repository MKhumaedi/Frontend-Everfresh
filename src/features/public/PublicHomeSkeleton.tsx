import React, { useState } from 'react';
import { Button } from '../../components/ui/Button.js';
import { Card, CardContent } from '../../components/ui/Card.js';
import { Badge } from '../../components/ui/Badge.js';
import { Input } from '../../components/ui/Input.js';
import { Select } from '../../components/ui/Select.js';
import { Textarea } from '../../components/ui/Textarea.js';
import { Modal } from '../../components/ui/Modal.js';
import { useToast } from '../../hooks/useToast.js';
import { Snowflake, ShieldCheck, Zap, Factory, ArrowRight, CheckCircle2 } from 'lucide-react';

function renderHero(onOpenModal: () => void) {
  return (
    <section className="bg-gradient-to-b from-[#EBF4FC] to-[#F4F8FB] border-b border-[#E3EAF0] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <Badge variant="primary" size="md" className="mb-4">
          Teknologi Pendingin Industri Standar Internasional
        </Badge>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F1F2E] tracking-tight max-w-4xl">
          Mesin Es Industri &amp; Cold Storage Berkualitas Tinggi di Indonesia
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#5A6E7F] max-w-2xl">
          Solusi terintegrasi fabrikasi mesin es Tube, Flake, Block direct cooling, dan fasilitas gudang pendingin
          otomatis bergaransi resmi untuk perikanan, agrikultur, serta industri makanan.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="lg" onClick={onOpenModal} rightIcon={<ArrowRight className="w-5 h-5" />}>
            Minta Penawaran Harga
          </Button>
          <Button variant="secondary" size="lg">
            Unduh Brosur Spesifikasi
          </Button>
        </div>
      </div>
    </section>
  );
}

function renderFeatures() {
  const items = [
    { title: 'Kapasitas 1 - 100 Ton / 24 Jam', desc: 'Fabrikasi modular sesuai kapasitas tonase harian pabrik Anda.', icon: Factory },
    { title: 'Efisiensi Energi Tinggi', desc: 'Kompresor Bitzer & Hanbell hemat daya hingga 28% dibanding sistem konvensional.', icon: Zap },
    { title: 'Higienis & Food-Grade SS304/SS316', desc: 'Material kontak es anti-korosi berstandar sertifikasi keamanan pangan.', icon: ShieldCheck },
    { title: 'Dukungan Servis 24/7 Nasional', desc: 'Jaringan teknisi siaga di Jawa, Sumatera, Sulawesi, Maluku, dan Papua.', icon: Snowflake },
  ];

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((feat) => {
          const Icon = feat.icon;
          return (
            <Card key={feat.title} className="p-5">
              <div className="w-10 h-10 rounded-[8px] bg-[#EBF4FC] text-[#0B4F8A] flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-[#006688]" />
              </div>
              <h3 className="text-sm font-bold text-[#0F1F2E]">{feat.title}</h3>
              <p className="text-xs text-[#5A6E7F] mt-1.5 leading-relaxed">{feat.desc}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export const PublicHomeSkeleton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    showToast({
      type: 'success',
      title: 'Permintaan Diterima',
      message: 'Spesimen penawaran telah dicatat. Tim kami akan menghubungi Anda.',
    });
  };

  return (
    <div className="flex flex-col flex-1">
      {renderHero(() => setModalOpen(true))}
      {renderFeatures()}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Formulir Permintaan Penawaran Mesin"
        description="Lengkapi kebutuhan kapasitas es dan spesifikasi lokasi pabrik Anda."
      >
        <form onSubmit={handleTestSubmit} className="flex flex-col gap-4">
          <Input label="Nama Lengkap" placeholder="Contoh: Ir. Budi Santoso" required />
          <Input label="Nama Perusahaan / Usaha" placeholder="Contoh: PT Lautan Dingin Perkasa" required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="WhatsApp / Telepon" placeholder="0812xxxxxxxx" required />
            <Input label="Kota / Lokasi Pemasangan" placeholder="Contoh: Sidoarjo, Jatim" required />
          </div>
          <Select
            label="Jenis Mesin Es / Pendingin"
            options={[
              { value: 'tube', label: 'Mesin Es Tube (Konsumsi & Resto)' },
              { value: 'flake', label: 'Mesin Es Flake (Perikanan Laut)' },
              { value: 'block', label: 'Mesin Es Balok Direct Block Ice' },
              { value: 'coldstorage', label: 'Fasilitas Cold Storage Walk-in' },
            ]}
            placeholder="Pilih jenis mesin..."
            required
          />
          <Textarea label="Keterangan Kapasitas & Kebutuhan" placeholder="Misal: Kebutuhan 10 ton per 24 jam dengan sumber air payau..." />
          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Kirim Permintaan Penawaran
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
