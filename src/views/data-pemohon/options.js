export const buktiSpdOptions = [
  {
    label: 'Tidak ada',
    value: 'Tidak ada',
  },
  {
    label: 'Ada',
    value: 'Ada',
  },
];

export const statusBerkasOptions = [
  {
    label: 'Bagian Umum',
    value: 'Bagian Umum',
  },
  {
    label: 'Rektorat',
    value: 'Rektorat',
  },
  {
    label: 'Biro AUPK',
    value: 'Biro AUPK',
  },
  {
    label: 'Dalam Proses Pelaksanaan',
    value: 'Dalam Proses Pelaksanaan',
  },
];

export const golonganOptions = [
  { label: 'I A', value: 'I A' },
  { label: 'I B', value: 'I B' },
  { label: 'I C', value: 'I C' },
  { label: 'I D', value: 'I D' },
  { label: 'II A', value: 'II A' },
  { label: 'II B', value: 'II B' },
  { label: 'II C', value: 'II C' },
  { label: 'II D', value: 'II D' },
  { label: 'III A', value: 'III A' },
  { label: 'III B', value: 'III B' },
  { label: 'III C', value: 'III C' },
  { label: 'III D', value: 'III D' },
  { label: 'IV A', value: 'IV A' },
  { label: 'IV B', value: 'IV B' },
  { label: 'IV C', value: 'IV C' },
  { label: 'IV D', value: 'IV D' },
  { label: 'IV E', value: 'IV E' },
];

export const namaPangkat = [
  { label: 'Juru Muda', value: 'Juru Muda' },
  { label: 'Juru Muda Tingkat 1', value: 'Juru Muda Tingkat 1' },
  { label: 'Juru', value: 'Juru' },
  { label: 'Juru Tingkat 1', value: 'Juru Tingkat 1' },
  { label: 'Pengatur Muda', value: 'Pengatur Muda' },
  { label: 'Pengatur Muda Tingkat 1', value: 'Pengatur Muda Tingkat 1' },
  { label: 'Pengatur', value: 'Pengatur' },
  { label: 'Pengatur Tingkat 1', value: 'Pengatur Tingkat 1' },
  { label: 'Penata Muda', value: 'Penata Muda' },
  { label: 'Penata Muda Tingkat 1', value: 'Penata Muda Tingkat 1' },
  { label: 'Penata', value: 'Penata' },
  { label: 'Penata Tingkat 1', value: 'Penata Tingkat 1' },
  { label: 'Pembina', value: 'Pembina' },
  { label: 'Pembina Tingkat 1', value: 'Pembina Tingkat 1' },
  { label: 'Pembina Utama Muda', value: 'Pembina Utama Muda' },
  { label: 'Pembina Utama Madya', value: 'Pembina Utama Madya' },
  { label: 'Pembina Utama', value: 'Pembina Utama' },
];

export const fields = [
  {
    key: 'no',
    label: 'No.',
    _style: 'width:10px;text-align:center;padding-right:12px!important',
    sorter: false,
  },
  { key: 'nama', _style: '' },
  { key: 'nama_lembaga', label: 'Dari Lembaga', _style: '' },
  {
    key: 'nomor_spd',
    label: 'No. SPD',
    _style: 'min-width:100px;padding-right:12px!important',
  },
  { key: 'nip', label: 'NIP', _style: '' },
  { key: 'golongan', _style: '' },
  { key: 'jabatan', _style: '' },
  {
    key: 'bukti_spd',
    label: 'Bukti SPD',
    _style: 'min-width:120px;padding-right:12px!important',
  },
  {
    key: 'status_berkas',
    label: 'Status Berkas',
    _style: 'min-width:120px;padding-right:12px!important',
  },
  {
    key: 'status_spd',
    label: 'Status SPD',
    _style: '',
  },
  {
    key: 'alasan_ditolak',
    label: 'Alasan Ditolak',
    _style: '',
  },
  {
    key: 'proses',
    _style: 'width:50px;text-align:center;padding-right:12px!important',
  },
];
