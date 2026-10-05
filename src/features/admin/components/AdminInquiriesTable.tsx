import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card.js';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/Table.js';
import { Snowflake, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const inquiries = [
  { name: 'Ir. Budi Santoso', company: 'PT Sumber Es Makmur', product: 'Mesin Es Tube 10 Ton' },
  { name: 'Hendra Kurniawan', company: 'CV Lautan Dingin', product: 'Mesin Es Flake 5 Ton' },
  { name: 'Ibu Stefanie Wijaya', company: 'PT Segar Abadi Berkah', product: 'Cold Storage 50 Ton' },
  { name: 'Ronald Papilaya', company: 'Koperasi Nelayan Samudera', product: 'Mesin Es Balok Direct 20 Ton' },
  { name: 'Bambang Sutrisno', company: 'PT Tirta Berkah Mandiri', product: 'Mesin Es Tube 15 Ton' },
  { name: 'Wahyu Hidayat', company: 'Tambak Udang Windu Sejahtera', product: 'Mesin Es Slurry Liquid Flow' },
];

function renderTableRows() {
  return inquiries.map((item) => (
    <TableRow key={item.name}>
      <TableCell className="font-semibold text-[#0B4F8A]">{item.name}</TableCell>
      <TableCell className="text-[#5A6E7F]">{item.company}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5 font-medium text-[#0F1F2E]">
          <Snowflake className="w-3.5 h-3.5 text-[#4FC3F7]" />
          <span>{item.product}</span>
        </div>
      </TableCell>
    </TableRow>
  ));
}

export const AdminInquiriesTable: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Permintaan Penawaran Terbaru</CardTitle>
          <CardDescription>6 permintaan terakhir dari formulir publik website</CardDescription>
        </div>
        <Link
          to="/admin/inquiries"
          className="text-xs font-semibold text-[#0B4F8A] hover:underline flex items-center gap-1"
        >
          <span>Lihat Semua (12)</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="border-0 rounded-none">
          <TableHeader>
            <TableRow>
              <TableHead>NAMA PEMOHON</TableHead>
              <TableHead>PERUSAHAAN</TableHead>
              <TableHead>PRODUK DIMINATI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
