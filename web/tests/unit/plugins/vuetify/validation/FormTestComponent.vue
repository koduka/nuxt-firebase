<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="alpha"
      :rules="[this.$rules.alpha]"
      label="alpha"
    ></v-text-field>

    <v-text-field
      v-model="alphaNum"
      :rules="[this.$rules.alphaNum]"
      label="alphaNum"
    ></v-text-field>

    <v-text-field
      v-model="between"
      :rules="[this.$rules.between({ min: 0, max: 10 })]"
      label="between"
    ></v-text-field>

    <v-text-field
      v-model="decimal"
      :rules="[this.$rules.decimal]"
      label="decimal"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="[this.$rules.email]"
      label="email"
    ></v-text-field>

    <v-text-field
      v-model="integer"
      :rules="[this.$rules.integer]"
      label="integer"
    ></v-text-field>

    <v-text-field
      v-model="maxLength"
      :rules="[this.$rules.maxLength(10)]"
      label="maxLength"
    ></v-text-field>

    <v-text-field
      v-model="maxValue"
      :rules="[this.$rules.maxValue(10)]"
      label="maxValue"
    ></v-text-field>

    <v-text-field
      v-model="minLength"
      :rules="[this.$rules.minLength(10)]"
      label="minLength"
    ></v-text-field>

    <v-text-field
      v-model="minValue"
      :rules="[this.$rules.minValue(10)]"
      label="minValue"
    ></v-text-field>

    <v-text-field
      v-model="numeric"
      :rules="[this.$rules.numeric]"
      label="numeric"
    ></v-text-field>

    <v-text-field
      v-model="required"
      :rules="[this.$rules.required]"
      label="required"
      required
    ></v-text-field>

    <v-text-field v-model="equalsOther" label="equalsOther"></v-text-field>

    <v-text-field
      v-model="equals"
      :rules="[
        this.$rules.equals({
          otherName: 'equals',
          otherValue: this.equalsOther,
        }),
      ]"
      label="equals"
    ></v-text-field>

    <v-text-field
      v-model="url"
      :rules="[this.$rules.url]"
      label="url"
    ></v-text-field>

    <v-btn ref="validate-btn" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      valid: true,
      alpha: 'a',
      alphaNum: 'a1',
      between: '10',
      decimal: '1',
      email: 'email@local.test.com',
      integer: '1',
      maxLength: 'a'.repeat(10),
      maxValue: '10',
      minLength: 'a'.repeat(10),
      minValue: '10',
      numeric: '10',
      required: 'a',
      equalsOther: 'same',
      equals: 'same',
      url: 'https://com.jp.example/',
    }
  },
  methods: {
    validate() {
      // this.$refs.form.validate()
    },
  },
})
</script>
