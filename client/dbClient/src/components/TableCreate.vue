<template>
  <div>
    <input id="tableName" v-model="tablename" type="text"/>
    <label for="tableName">Table name</label>
    <div v-for="(field, id) in tableFields" :key="id"  class="row">
      <input class="col-2 offset-1" :id="id" v-model="tableFields[id].name" type="text"/>
      <label :for="id">Field name</label>
      <select class="col-2 offset-1" v-model="tableFields[id].type">
        <option disabled value="">Type</option>
        <option>NULL</option>
        <option>INTEGER</option>
        <option>REAL</option>
        <option>TEXT</option>
        <option>BLOB</option>
      </select>
      <input class="col-2 offset-1" :id="-id" v-model="tableFields[id].option" type="text" />
      <label :for="-id">Option</label>
    </div>
    <button class="btn btn-primary" @click="addField">Add field</button>
  </div>
</template>

<script>
class TableField {
  constructor () {
    this.name = ''
    this.type = ''
    this.option = ''
  }
}

export default {
  data () {
    return {
      tablename: '',
      tableFields: []
    }
  },
  methods: {
    addField: function () {
      this.tableFields.push(new TableField())
    }
  }
}
</script>
