<template>
<div v-if="!isLoading">
    <div v-show="showAddTask"> 
  <AddTask @add-task="addTask" />
  </div>
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks"/>
  </div>
  <div v-if="isLoading" class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  <p v-if="!isLoading && error">{{error}}</p>
</template>

<script>
import Tasks from '../components/Tasks.vue'
import AddTask from '../components/AddTask.vue'
export default {
    name: 'Home',
    props: {
        showAddTask: Boolean,
    },
    components: {
        Tasks, 
        AddTask,
    },
    data() {
        return {
            tasks: [],
            isLoading: false,
            error: null
        }
    },

    async mounted() {
        this.isLoading = true;
        try {
            const tasks = await this.fetchTasks();
            this.tasks = tasks;
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false
            this.error = 'Backend error occured, please try again later...'
            console.log(error)
        }
        
    },
    methods: {

    async addTask(task) {
      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        
          body: JSON.stringify(task),
      })

      const data = await res.json()

      this.tasks = [...this.tasks, data]
    },
    async deleteTask(id) {
      if(confirm('Are you sure?')){
        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE',
        })

        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error in deleting task!')
        
      }
        
    },
    async toggleReminder(id) {

      const taskToToggle = await this.fetchTask(id)
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        console.log(id)

      const res = await fetch(`api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask),
      })

      const data = await res.json()

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task)
    },

    async fetchTasks() {
      const res = await fetch('api/tasks')

      const data = await res.json()

      return data
    },
 
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`)

      const data = await res.json()

      return data
    }
  },
}
</script>

<style scoped>
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: red;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>