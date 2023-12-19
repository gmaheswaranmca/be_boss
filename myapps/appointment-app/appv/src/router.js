import { createWebHistory, createRouter } from "vue-router";
import EmployeeList from "./EmployeeList"
import EmployeeEdit from "./EmployeeEdit"
import EmployeeCreate from "./EmployeeCreate"
const routes =  [
  {
    path: "/",
    alias: "/employee/list",
    name: "employee-list",
    component: EmployeeList
  },
  {
    path: "/employee/edit/:id",
    name: "employee-edit",
    component: EmployeeEdit
  },
  {
    path: "/employee/create",
    name: "emloyee-create",
    component: EmployeeCreate
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;