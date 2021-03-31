<template>
  <div>
    <card-form title="Form Input No. SPD">
      <CRow>
        <CCol col="12">
          <CInput
            label="No. SPD"
            placeholder="Masukkan No. SPD"
            v-model.trim="$v.nomor_spd.$model"
            :is-valid="validate('nomor_spd')"
            invalid-feedback="Nomor SPD harus diisi."
            :readonly="readOnly"
            @keyup.enter="addNoSpd"
          />
        </CCol>
      </CRow>
      <CSpinner color="info" v-if="isLoading" />
      <CButton color="primary" @click="addNoSpd()" v-else>Simpan</CButton>
    </card-form>
    <toast-msg :listToasts="listToasts" />
  </div>
</template>

<script>
import CardForm from '../../components/CardForm.vue';
import ToastMsg from '../../components/ToastMsg';
import { PemohonService } from '../../services/pemohon.service';
import { pemohonValidations } from '../../validations/validationRules';

export default {
  name: 'InputSPD',
  components: {
    CardForm,
    ToastMsg,
  },
  data() {
    return {
      pemohonFormData: {
        docType: 'pemohon',
        nomor_spd: '',
        nip: '',
        nama: '',
        golongan: '',
        jabatan: '',
        maksud_perjalanan: '',
        asal: '',
        tujuan: '',
        lama: '',
        bukti_spd: '',
        status_spd: '',
        status_berkas: '',
        alasan_ditolak: '',
        nama_lembaga: '',
      },
      nomor_spd: '',
      listToasts: [],
      isLoading: false,
      readOnly: true,
    };
  },
  validations: pemohonValidations,
  methods: {
    validate(type) {
      if (this.$v[type].$error) {
        return !this.$v[type].$invalid;
      }
      return null;
    },
    async getDataPemohon() {
      this.isLoading = true;
      try {
        const result = await PemohonService.get(this.$route.query.id);

        this.pemohonFormData = result.data;
      } catch (err) {
        const toast = {
          message:
            err?.response?.data?.message ||
            'Terjadi masalah. Data pemohon tidak berhasil didapatkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isLoading = false;
      this.readOnly = false;
    },
    async addNoSpd() {
      this.$v.pemohonFormData.$touch();

      if (this.$v.pemohonFormData.$invalid) return;

      this.isLoading = true;

      try {
        this.pemohonFormData.nomor_spd = this.nomor_spd;

        const response = await PemohonService.update(
          this.$route.query.id,
          this.pemohonFormData,
        );

        const toast = {
          message: response.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push('/data-pemohon');
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Nomor SPD tidak berhasil ditambahkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }

      this.isLoading = false;
    },
  },
  async mounted() {
    await this.getDataPemohon();
  },
};
</script>

<style></style>
