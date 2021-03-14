<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Data Pemohon"
        :routeEndpoint="routeEndpoint"
        :items="items"
        :fields="fields"
        :isLoading="isLoading"
      >
        <template #proses="{item, index}">
          <CButton
            color="success"
            @click="updateData(item.key)"
            :hidden="isBtnSimpanHidden(index)"
            >Simpan</CButton
          >
          <CButton
            color="danger"
            @click="confirmDelete(item.key)"
            :hidden="!isBtnSimpanHidden(index)"
            >Hapus</CButton
          >
        </template>
        <template #nomor_spd="{item}">
          <CButton
            v-if="!item.nomor_spd"
            :to="inputSpd(item.key)"
            color="primary"
            size="sm"
            >Input No. SPD</CButton
          >
          <div v-else>{{ item.nomor_spd }}</div>
        </template>
        <template #bukti_spd="{item, index}">
          <CSelect
            :options="buktiSpdOptions"
            placeholder="Pilih"
            :value="item.bukti_spd"
            @update:value="setValueForUpdate('buktiSpd', $event, index)"
            size="sm"
          ></CSelect>
        </template>
        <template #status_berkas="{item, index}">
          <CSelect
            :options="statusBerkasOptions"
            placeholder="Pilih"
            :value="item.status_berkas"
            @update:value="setValueForUpdate('statusBerkas', $event, index)"
            size="sm"
          ></CSelect>
        </template>
      </card-list-data>
    </CCol>
    <CModal title="Hapus" color="warning" :show.sync="showModalDelete" centered>
      Apakah anda yakin untuk menghapus data ini?
      <template #footer>
        <CButton @click="showModalDelete = false" color="secondary"
          >Batal</CButton
        >
        <CSpinner color="info" v-if="isDeleting" />
        <CButton @click="deleteData()" color="danger" v-if="!isDeleting"
          >Hapus</CButton
        >
      </template>
    </CModal>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../../components/CardListData.vue';
import ToastMsg from '../../components/ToastMsg';
import { buktiSpdOptions, statusBerkasOptions, fields } from './options';
import { PemohonService } from '../../services/pemohon.service';

export default {
  name: 'DataPemohon',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fields,
      buktiSpdOptions,
      statusBerkasOptions,
      showModalDelete: false,
      isDeleting: false,
      isUpdating: false,
      listToasts: [],
      isLoading: false,
      keyForDelete: '',
      routeEndpoint: 'data-pemohon',
      buktiSpd: '',
      statusBerkas: '',
      positionBtnSimpanShow: [],
      indexForUpdate: '',
      formData: {
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
    };
  },
  methods: {
    async getAll() {
      this.isLoading = true;

      try {
        const data = await PemohonService.getAll();

        this.items = data.map(item => {
          return {
            key: item.Key,
            ...item.Record,
          };
        });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil didapatkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isLoading = false;
    },
    confirmDelete(key) {
      this.keyForDelete = key;
      this.showModalDelete = true;
    },
    async deleteData() {
      this.isDeleting = true;

      try {
        const result = await PemohonService.delete(this.keyForDelete);

        const toast = {
          message: result.message,
          color: 'success',
        };
        this.listToasts.push(toast);

        await this.getAll();
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil dihapus.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isDeleting = false;
      this.showModalDelete = false;
    },
    inputSpd(id) {
      return `${this.routeEndpoint}/input-spd?id=${id}`;
    },
    setValueForUpdate(type, newValue, index) {
      this[type] = newValue;
      this.positionBtnSimpanShow.push(index);
    },
    isBtnSimpanHidden(index) {
      return !this.positionBtnSimpanShow.includes(index);
    },
    showLoading(index) {
      return this.isUpdating && this.indexForUpdate === index;
    },
    async updateData(key) {
      this.isLoading = true;
      try {
        const dataPemohon = await PemohonService.get(key);
        this.formData = dataPemohon.data;
        this.formData.bukti_spd = this.buktiSpd;
        this.formData.status_berkas = this.statusBerkas;

        const result = await PemohonService.update(key, this.formData);

        const toast = {
          message: result.message,
          color: 'success',
        };
        this.listToasts.push(toast);

        await this.getAll();
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil diperbarui.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isLoading = false;
      this.positionBtnSimpanShow = [];
    },
  },
  async mounted() {
    await this.getAll();
    if (this.$store.state.toast.listToasts.length) {
      this.listToasts = this.$store.state.toast.listToasts;
      this.$store.commit('toast/RESET');
    }
  },
  beforeDestroy() {
    this.positionBtnSimpanShow = [];
  },
};
</script>

<style></style>
