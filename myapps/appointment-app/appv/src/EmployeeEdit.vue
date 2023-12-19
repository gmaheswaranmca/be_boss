<template>
    <div class="container">
        <h3>Edit Employee {{$route.params.id}}</h3>
    </div>
    
    <div class="container">
        <div><a href="/employee/list">Back</a></div>
        <div className="container">
            <form>                           
                <div class="form-floating">
                    <input type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder=""
                        v-model="employee.name"
                        />
                    <label forName="name">Name</label>
                </div>

                <div class="form-floating">
                    <input type="text" 
                        className="form-control" 
                        id="job_title" 
                        placeholder=""
                        v-model="employee.job_title"
                        />
                    <label forName="najob_titleme">Job Title</label>
                </div>
                
                <button class="w-100 btn btn-lg btn-warning"
                    type="button">Update</button>
            </form>
        </div>                
    </div> 

    
</template>

<script>


export default {
  name: 'EmployeeEdit',
  data(){
    const editableEmployee = {
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
        }
    const state = {employee: editableEmployee}
    return state 
  }
}
</script>

<style scoped>

</style>