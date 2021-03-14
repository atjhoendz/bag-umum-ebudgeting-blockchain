import {
  required,
  minLength,
  maxLength,
  numeric,
} from 'vuelidate/lib/validators';

export const loginValidations = {
  username: {
    required,
  },
  password: {
    required,
  },
};

export const pemohonValidations = {
  pemohonFormData: {
    golongan: {
      required,
    },
    jabatan: {
      required,
    },
    nama: {
      required,
    },
    maksud_perjalanan: {
      required,
    },
    asal: {
      required,
    },
    tujuan: {
      required,
    },
    lama: {
      required,
    },
    nama_lembaga: {
      required,
    },
    nomor_spd: {
      required,
    },
  },
  userFormData: {
    nip: {
      required,
      numeric,
      minLength: minLength(18),
      maxLength: maxLength(18),
    },
    username: {
      required,
      minLength: minLength(4),
    },
    password: {
      required,
      minLength: minLength(6),
      goodPassword: password => {
        return /[a-z]/.test(password) && /[0-9]/.test(password);
      },
    },
  },
};
