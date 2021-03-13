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
];

export const fields = [
  {
    key: 'no',
    label: 'No.',
    _style: 'width:10px;text-align:center;padding-right:12px!important',
    sorter: false,
  },
  { key: 'nama', _style: 'text-align:center' },
  { key: 'nama_lembaga', label: 'Dari Lembaga', _style: 'text-align:center' },
  {
    key: 'nomor_spd',
    label: 'No. SPD',
    _style: 'min-width:100px;text-align:center;padding-right:12px!important',
  },
  { key: 'nip', label: 'NIP', _style: 'text-align:center' },
  'golongan',
  'jabatan',
  {
    key: 'bukti_spd',
    label: 'Bukti SPD',
    _style: 'min-width:120px;text-align:center;padding-right:12px!important',
  },
  {
    key: 'status_berkas',
    label: 'Status Berkas',
    _style: 'min-width:120px;text-align:center;padding-right:12px!important',
  },
  {
    key: 'status_spd',
    label: 'Status SPD',
    _style: 'text-align:center',
  },
  {
    key: 'alasan_ditolak',
    label: 'Alasan Ditolak',
    _style: 'text-align:center',
  },
  {
    key: 'proses',
    _style: 'width:50px;text-align:center;padding-right:12px!important',
  },
];
