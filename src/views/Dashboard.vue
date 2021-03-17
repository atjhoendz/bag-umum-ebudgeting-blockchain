<template>
  <CRow>
    <CCol sm="12" lg="6">
      <CWidgetSimple
        header="Message"
        text="Selamat Datang di Halaman Bagian Umum"
      >
      </CWidgetSimple>
    </CCol>
    <CCol sm="12" lg="3">
      <CWidgetSimple header="Data Pemohon" :text="jmlDataPemohon">
        <CSpinner color="info" v-if="isLoading && !jmlDataPemohon" />
      </CWidgetSimple>
    </CCol>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import { PemohonService } from '../services/pemohon.service';
import ToastMsg from '../components/ToastMsg';
export default {
  name: 'Dashboard',
  components: {
    ToastMsg,
  },
  data: () => ({
    jmlDataPemohon: '',
    isLoading: false,
    listToasts: [],
  }),
  methods: {
    async getCountData() {
      this.isLoading = true;
      try {
        const data = await PemohonService.getCountData();

        this.jmlDataPemohon = data.toString();
      } catch (err) {
        const toast = {
          message:
            'Terjadi masalah. Jumlah data pemohon tidak berhasil didapatkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isLoading = false;
    },
  },
  async mounted() {
    await this.getCountData();
  },
};
</script>
