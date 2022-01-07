<template>
  <form>
    <!-- <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="Item"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox> -->

    <!-- <v-btn class="mr-4" click="submit"> submit </v-btn> -->
    <v-btn @click="action"> action </v-btn>
  </form>
</template>

<script lang="ts">
import { Contact, CONTACT_PATH } from '@app/core'
import Vue from 'vue'

export default Vue.extend({
  methods: {
    async action() {
      console.log('あああああ%d', 1)
      const contact: Contact = new Contact({
        email: 'email@local.test.com',
        title: 'title',
        contract: 'contract',
      })
      const createdEntity = await this.$firestore.create(contact)
      console.log(`createdEntity: ${JSON.stringify(createdEntity)}`)

      const foundEntity = await this.$firestore.findById<Contact>(
        CONTACT_PATH,
        createdEntity.id!
      )
      console.log(`foundEntity: ${JSON.stringify(foundEntity)}`)
    },
  },
  data: () => ({
    name: '',
    email: '',
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false,
  }),
})
</script>
