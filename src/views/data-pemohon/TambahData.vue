<template>
  <div>
    <card-form title="Form Input Data Pemohon">
      <CRow>
        <CCol col="12">
          <CSelect
            label="Golongan"
            placeholder="Pilih golongan"
            :options="golonganOptions"
            :value="pemohonFormData.golongan"
            @update:value="setValue('golongan', $event)"
            :is-valid="validate('pemohonFormData', 'golongan')"
            invalid-feedback="Golongan harus dipilih"
            :disabled="readOnly"
          ></CSelect>
        </CCol>
        <CCol col="12">
          <CInput
            label="Jabatan"
            placeholder="Masukkan jabatan"
            v-model.trim="$v.pemohonFormData.jabatan.$model"
            :is-valid="validate('pemohonFormData', 'jabatan')"
            invalid-feedback="Jabatan harus diisi."
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="NIP"
            placeholder="Masukkan NIP"
            v-model.trim="$v.userFormData.nip.$model"
            type="number"
            :is-valid="validate('userFormData', 'nip')"
            :invalid-feedback="nipMsg"
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Nama Pemohon"
            placeholder="Masukkan nama pemohon"
            v-model.trim="$v.pemohonFormData.nama.$model"
            :is-valid="validate('pemohonFormData', 'nama')"
            invalid-feedback="Nama pemohon harus diisi."
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CSelect
            label="Lembaga"
            placeholder="Pilih lembaga"
            :options="lembagaOptions"
            :value="pemohonFormData.nama_lembaga"
            @update:value="setValue('nama_lembaga', $event)"
            :is-valid="validate('pemohonFormData', 'nama_lembaga')"
            invalid-feedback="Nama lembaga harus dipilih."
            :disabled="readOnly"
          ></CSelect>
        </CCol>
        <CCol col="12">
          <CInput
            label="Maksud Perjalanan Dinas"
            placeholder="Masukkan maksud perjalanan dinas"
            v-model.trim="$v.pemohonFormData.maksud_perjalanan.$model"
            :is-valid="validate('pemohonFormData', 'maksud_perjalanan')"
            invalid-feedback="Maksud perjalanan dinas harus diisi."
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Asal Keberangkatan"
            placeholder="Masukkan asal keberangkatan"
            v-model.trim="$v.pemohonFormData.asal.$model"
            :is-valid="validate('pemohonFormData', 'asal')"
            invalid-feedback="Asal keberangkatan harus diisi."
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Tujuan Perjalanan"
            placeholder="Masukkan tujuan perjalanan"
            v-model.trim="$v.pemohonFormData.tujuan.$model"
            :is-valid="validate('pemohonFormData', 'tujuan')"
            invalid-feedback="Tujuan perjalanan harus diisi."
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Lama Perjalanan"
            placeholder="Masukkan lama perjalanan"
            description="Contoh: 2 hari."
            v-model.trim="$v.pemohonFormData.lama.$model"
            :is-valid="validate('pemohonFormData', 'lama')"
            invalid-feedback="Lama perjalanan harus diisi."
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Username"
            placeholder="Masukkan username"
            description="Digunakan untuk login oleh pemohon."
            v-model.trim="$v.userFormData.username.$model"
            :is-valid="validate('userFormData', 'username')"
            :invalid-feedback="usernameMsg"
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Password"
            placeholder="Masukkan password"
            :type="typePassword"
            description="Digunakan untuk login oleh pemohon."
            v-model.trim="$v.userFormData.password.$model"
            :is-valid="validate('userFormData', 'password')"
            :invalid-feedback="passwordMsg"
            :readonly="readOnly"
            @keyup.enter="addData"
          >
            <template #append-content>
              <div @click="isPasswordShow = !isPasswordShow" class="inputPwd">
                {{ isPasswordShow ? 'hide' : 'show' }}
              </div>
            </template>
          </CInput>
        </CCol>
      </CRow>
      <CSpinner color="info" v-if="isLoading" />
      <CButton color="primary" @click="addData()" v-else> Simpan </CButton>
    </card-form>
    <toast-msg :listToasts="listToasts" />
  </div>
</template>

<script>
import CardForm from '../../components/CardForm.vue';
import ToastMsg from '../../components/ToastMsg';
import { PemohonService } from '../../services/pemohon.service';
import { UserService } from '../../services/user.service';
import { LembagaService } from '../../services/lembaga.service';
import { ValidationMessage } from '../../validations/message';
import { pemohonValidations } from '../../validations/validationRules';
import { golonganOptions } from './options';

export default {
  name: 'TambahDataPemohon',
  components: { CardForm, ToastMsg },
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
      userFormData: {
        docType: 'user',
        username: '',
        nama_lengkap: '',
        password: '',
        nip: '',
        jabatan: 'Pemohon',
      },
      isLoading: false,
      listToasts: [],
      readOnly: true,
      golonganOptions,
      lembagaOptions: [],
      isPasswordShow: false,
    };
  },
  validations: pemohonValidations,
  computed: {
    usernameMsg() {
      if (!this.$v.userFormData.username.required) {
        return ValidationMessage.required('Username');
      } else if (!this.$v.userFormData.username.minLength) {
        return ValidationMessage.minLength(4);
      }
      return null;
    },
    nipMsg() {
      if (!this.$v.userFormData.nip.required) {
        return ValidationMessage.required('NIP');
      } else if (!this.$v.userFormData.nip.numeric) {
        return ValidationMessage.numeric('NIP');
      } else if (
        !this.$v.userFormData.nip.minLength ||
        !this.$v.userFormData.nip.maxLength
      ) {
        return ValidationMessage.lengthNumeric('NIP', 18);
      }
      return null;
    },
    passwordMsg() {
      if (!this.$v.userFormData.password.required) {
        return ValidationMessage.required('Password');
      } else if (!this.$v.userFormData.password.minLength) {
        return ValidationMessage.minLength(6);
      } else if (!this.$v.userFormData.password.goodPassword) {
        return ValidationMessage.password('huruf', 'angka');
      }
      return null;
    },
    typePassword() {
      if (this.isPasswordShow) return 'text';
      return 'password';
    },
  },
  methods: {
    validate(form, type) {
      if (this.$v[form][type].$error) {
        return !this.$v[form][type].$invalid;
      }
      return null;
    },
    setValue(type, value) {
      this.pemohonFormData[type] = value;
      this.$v.pemohonFormData[type].$touch();
    },
    async getDataLembaga() {
      try {
        const data = await LembagaService.getAll();

        this.lembagaOptions = data.map(item => {
          return {
            label: item.Record.nama,
            value: item.Record.nama,
          };
        });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data lembaga tidak berhasil didapatkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
    },
    async getDataOptions() {
      this.isLoading = true;
      await this.getDataLembaga();
      this.isLoading = false;
      this.readOnly = false;
    },
    async addData() {
      this.$v.pemohonFormData.$touch();
      this.$v.userFormData.$touch();

      if (this.$v.pemohonFormData.$invalid || this.$v.userFormData.$invalid)
        return;

      this.isLoading = true;

      try {
        this.userFormData.nama_lengkap = this.pemohonFormData.nama;
        this.pemohonFormData.nip = this.userFormData.nip;

        await UserService.addData(this.userFormData);

        const response = await PemohonService.addData(this.pemohonFormData);

        const toast = {
          message: response.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-pemohon' });
      } catch (err) {
        const toast = {
          message:
            err?.response?.data?.message ||
            'Terjadi masalah. Data tidak berhasil ditambahkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }

      this.isLoading = false;
    },
  },
  async mounted() {
    await this.getDataOptions();
  },
};
</script>

<style scoped>
.inputPwd:hover {
  cursor: pointer;
}
</style>
