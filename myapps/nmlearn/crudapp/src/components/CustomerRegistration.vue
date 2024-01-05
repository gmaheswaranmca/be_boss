<template>
  <div className="container">
    <form>    
        <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
        <div class="form-floating">
            <input type="text" 
                  className="form-control" 
                    id="customer_name" 
                    placeholder="Your Name"
                    v-model="name"
                    />
            <label for="customer_name">Name</label>
        </div>
        <div class="form-floating">
            <input type="text" 
                class="form-control" 
                id="mobile" 
                placeholder="Mobile Number"
                v-model="mobile"/>
            <label for="mobile">Mobile Number</label>
        </div>
        <div class="form-floating">
            <input type="password" 
                class="form-control" 
                id="password" 
                placeholder="Password"
                v-model="password"/>
            <label for="password">Password</label>
        </div>
        <div class="form-floating">
            <input type="text" 
                class="form-control" 
                id="location" 
                placeholder="Location"  
                v-model="location"/>
            <label for="name">Location</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary"
            type="button"
            @click="onRegister">Sign up</button>

        
    </form>
</div>                
</template>

<script>
import CustomerDao from '../CustomerDao'

export default {
  name: 'CustomerRegistration',
  data() {
    return{
        name: '',
        mobile: '',
        password: '',
        location: ''
      
    };
  },
  methods: {
    async onRegister(){
      const dao = new CustomerDao();
      const newCustomer = {
        name: this.name,
        mobile: this.mobile,
        password: this.password,
        location: this.location
      };
      try{
        const savedCustomer = await dao.register(newCustomer);
        console.log(savedCustomer)
        alert('You are registered successfylly')
      }catch(error){
        alert('Server Error')
      }   
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
