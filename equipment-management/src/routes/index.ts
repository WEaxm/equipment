import EquipmentCreator from '@/pages/equipment/Create';
import EquipmentDetail from '@/pages/equipment/Detail';
import EquipmentList from '@/pages/equipment/List';
import PageLayout from '@/pages/layout';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: PageLayout,
    children: [
      {
        path: '/',
        Component: EquipmentList,
      },
      {
        path: '/detail/:id',
        Component: EquipmentDetail,
      },
      {
        path: '/create',
        Component: EquipmentCreator,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
