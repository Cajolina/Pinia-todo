<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask" />
    <button>Add</button>
  </form>
</template>

<script>
import { useTaskStore } from "../stores/TaskStore";
import { ref } from "vue";
export default {
  setup() {
    const taskStore = useTaskStore();

    const newTask = ref("");

    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title: newTask.value,
          isFav: false,
          id: Math.random().toString(36).substring(2, 9),
        });

        newTask.value = "";
      }
    };
    return { handleSubmit, newTask };
  },
};
</script>
