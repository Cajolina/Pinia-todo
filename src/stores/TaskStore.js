import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false
        // name: 'Carro'. Can use multiple properties
    }),
    getters: {
        favs() {
            return this.tasks.filter((task) => task.isFav)
        },
        favCount() {
            return this.favs.length
        },
        totalCount: (state) => {
            return state.tasks.length
        } // Can do this with arrow function * 
    },
    actions: {
        async getTasks() {
            this.loading = true
            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()

            this.tasks = data
            this.loading = false
        },
        async addTask(task) {
            this.tasks.push(task)

            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.error) {
                console.log(res.error);
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })


            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE',
            })

            if (res.error) {
                console.log(res.error);
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: { 'Content-Type': 'application/json' }
            })
            console.log(res);
            if (res.error) {
                console.log(res.error);
            }
        }
    }
})

// * Arrow function - can´t use this inside this function. Because of the way the arrow func handles the keyword. This in the previous ones refer to the state but this in the arrow func does not refer to the state.
//Instead we need to do is take the state as an argument inside this function and then we can use that. So - return 