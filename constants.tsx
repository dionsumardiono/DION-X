
import React from 'react';
import { Category, FormField } from './types';

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  [Category.ZAKAT]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  [Category.NIKAH]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  [Category.WARIS]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  [Category.EKONOMI]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 01-2 2h22a2 2 0 01-2-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6" />
    </svg>
  ),
  [Category.THAHARAH]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  [Category.IBADAH]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

export const CATEGORY_FORMS: Record<Category, FormField[]> = {
  [Category.ZAKAT]: [
    { name: 'asset_type', label: 'Jenis Harta', type: 'select', options: ['Emas/Perak', 'Uang Simpanan', 'Penghasilan/Profesi', 'Perdagangan'], required: true },
    { name: 'amount', label: 'Nilai/Jumlah Harta', type: 'number', placeholder: 'Masukkan nominal', required: true },
    { name: 'period', label: 'Lama Kepemilikan (Tahun)', type: 'number', placeholder: 'Contoh: 1', required: true },
  ],
  [Category.WARIS]: [
    { name: 'total_harta', label: 'Total Nilai Warisan', type: 'number', required: true },
    { name: 'ahli_waris', label: 'Ahli Waris yang Ada', type: 'textarea', placeholder: 'Contoh: Istri, 2 Anak Laki-laki, Ibu', required: true },
    { name: 'hutang', label: 'Hutang Pewaris (Jika ada)', type: 'number' },
  ],
  [Category.NIKAH]: [
    { name: 'status', label: 'Status Hubungan', type: 'select', options: ['Calon Pasangan', 'Sudah Menikah', 'Cerai/Talak', 'Rujuk'], required: true },
    { name: 'issue', label: 'Masalah Utama', type: 'textarea', placeholder: 'Ceritakan detail masalahnya...', required: true },
  ],
  [Category.EKONOMI]: [
    { name: 'transaksi', label: 'Jenis Transaksi', type: 'select', options: ['Pinjaman/Hutang', 'Investasi', 'Jual Beli', 'E-Wallet/Fintech'], required: true },
    { name: 'detail', label: 'Detail Transaksi', type: 'textarea', required: true },
  ],
  [Category.THAHARAH]: [
    { name: 'perkara', label: 'Hal yang Ditanyakan', type: 'textarea', placeholder: 'Contoh: Tata cara mandi wajib, najis pada pakaian...', required: true },
  ],
  [Category.IBADAH]: [
    { name: 'ibadah_type', label: 'Jenis Ibadah', type: 'select', options: ['Shalat', 'Puasa', 'Haji/Umrah', 'Adab'], required: true },
    { name: 'question', label: 'Pertanyaan Detail', type: 'textarea', required: true },
  ],
  [Category.LAINNYA]: [
    { name: 'question', label: 'Pertanyaan Anda', type: 'textarea', required: true },
  ],
};
