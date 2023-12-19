

<template>
    <PageLoader v-if="isPageLoaded"/>
    <div  v-if="!isPageLoaded">
        <div class="container">
            <h3>New Employee</h3>
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
                    
                    <button class="w-100 btn btn-lg btn-primary"
                        type="button" @click="onEmployeeCreate">Create</button>
                </form>
            </div>                
        </div> 
    </div>
</template>

<script>
import PageLoader from './PageLoader'

export default {
  name: 'EmployeeCreate',
  components: {
    PageLoader
  },
  data(){
    const emptyEmployee = {
            "id" : 0,
            "name" : "",
            "job_title" : "",
            "dept" : "",
            "business_unit" : "",
            "gender" : "",
            "ethnicity" : "",
            "age" : 0,
            "hire_date" : "",
            "salary" : 0,
            "bonus_per" : 0,
            "country" : "",
            "city" : "",
            "exit_date" : null,
            "photo" : null
        }
    const state = {employee: emptyEmployee, isPageLoaded:true}
    return state 
  },
  methods:{
    onEmployeeCreate(){
        alert('Yet to code')
    }
  }, mounted(){
    setInterval(()=>{
        this.isPageLoaded = false
    }, 5000)
  }
}
</script>

<style scoped>

</style>