<template>
    <div class="container">
        <h3>Employee List</h3>
    </div>
    
    <div class="container">
        <div><a href="/employee/create">New Employee</a></div>
        <table class="table table-bordered">
            <tr>
                <th>Name</th>
                <th>Job Title</th>
                <th>Department</th>
                <th></th>
            </tr>

            <template v-for="employee in employees" v-bind:key="employee.id">
                <tr>
                    <td>{{employee.name}}</td>
                    <td>{{employee.job_title}}</td>
                    <td>{{employee.dept}}</td>
                    <td>
                        <a v-bind:href="'/employee/edit/' + employee.id">Edit</a>
                    </td>
                </tr>
            </template>

        </table>
    </div>
</template>

<script>


export default {
  name: 'EmployeeList',
  data(){
    const initEmployeeList =[
        {
            "id" : 2002,
            "name" : "Kai Le",
            "job_title" : "Controls Engineer",
            "dept" : "Engineering",
            "business_unit" : "Manufacturing",
            "gender" : "Male",
            "ethnicity" : "Asian",
            "age" : 47,
            "hire_date" : "2022-02-05 00:00:00",
            "salary" : 92368,
            "bonus_per" : 0,
            "country" : "United States",
            "city" : "Columbus",
            "exit_date" : null,
            "photo" : null
        },
        {
            "id" : 2003,
            "name" : "Robert Patel",
            "job_title" : "Analyst",
            "dept" : "Sales",
            "business_unit" : "Corporate",
            "gender" : "Male",
            "ethnicity" : "Asian",
            "age" : 58,
            "hire_date" : "2013-10-23 00:00:00",
            "salary" : 45703,
            "bonus_per" : 0,
            "country" : "United States",
            "city" : "Chicago",
            "exit_date" : null,
            "photo" : null
        },
        {
            "id" : 2004,
            "name" : "Cameron Lo",
            "job_title" : "Network Administrator",
            "dept" : "IT",
            "business_unit" : "Research & Development",
            "gender" : "Male",
            "ethnicity" : "Asian",
            "age" : 34,
            "hire_date" : "2019-03-24 00:00:00",
            "salary" : 83576,
            "bonus_per" : 0,
            "country" : "China",
            "city" : "Shanghai",
            "exit_date" : null,
            "photo" : null
        }   
    ];

    const state = {employees: initEmployeeList}
    return state;
  }
}
</script>

<style scoped>

</style>
