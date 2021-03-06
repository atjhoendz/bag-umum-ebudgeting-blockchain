// Containers
const TheContainer = () => import('@/containers/TheContainer');

// Views
const Dashboard = () => import('@/views/Dashboard');
const LoginPage = () => import('@/views/auth/LoginPage');
const DataPemohon = () => import('@/views/data-pemohon/DataPemohon');
const InputSPD = () => import('@/views/data-pemohon/InputSPD');
const TambahDataPemohon = () => import('@/views/data-pemohon/TambahData');
const NotFoundPage = () => import('@/views/NotFoundPage');

export const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: TheContainer,
    meta: { isAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
  },
  {
    path: '/data-pemohon',
    name: 'Data Pemohon',
    redirect: '/data-pemohon',
    component: TheContainer,
    meta: { isAuth: true },
    children: [
      {
        path: '/',
        component: DataPemohon,
      },
      {
        path: 'input-spd',
        name: 'Input No. SPD',
        component: InputSPD,
      },
      {
        path: 'tambah',
        name: 'Tambah Data Pemohon',
        component: TambahDataPemohon,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
];
