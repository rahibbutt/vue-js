<template>
  <h1>Form Page</h1>
  <Form v-slot="{ handleSubmit }" :validation-schema="schema" as="div">
    <form @submit="handleSubmit($event, onSubmit)">
      <Field name="email" type="email" />
      <ErrorMessage name="email" />
      <Field name="password" type="password" />
      <ErrorMessage name="password" />
      <button>Submit</button>
    </form>
  </Form>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Form Page",
  props: {},
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8).max(10).notOneOf(["testtest"]),
    });
    return {
      schema,
    };
  },

  async mounted() {},
  methods: {
    async onSubmit(values) {
      // Submit values to API...
      try {
        const response = await fetch("url", {
          body: JSON.stringify(values),
          method: "POST",
        });
      } catch (error) {
        console.log("Error submitting form", error);
      }
    },
  },
};
</script>

<style scoped></style>
