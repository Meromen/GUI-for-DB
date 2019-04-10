<template>
  <div>
    <div class="row ml-4 mr-4 form-group">
      <label for="tableName"><h1>Table name</h1></label>
      <input class="form-control" id="tableName" v-model="tableName" placeholder="Table name" type="text"/>
    </div>
    <hr>
    <div v-for="(field, id) in tableFields" :key="id"  class="form-row form-group">
      <div class="col ml-4">
        <input class="form-control" :id="id" v-model="tableFields[id].name" placeholder="Field name" type="text"/>
      </div>
      <div class="col">
        <select class="form-control" v-model="tableFields[id].type">
          <option disabled value="">Type</option>
          <option>NULL</option>
          <option>INTEGER</option>
          <option>REAL</option>
          <option>TEXT</option>
          <option>BLOB</option>
        </select>
      </div>
      <div class="col mr-4">
        <input class="form-control" :id="-id" v-model="tableFields[id].option" placeholder="Oprion" type="text" />
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary btn-lg btn-block offset-1 col-10" @click="addField">Add field</button>
    </div>
    <div class="row mt-3">
      <button class="btn btn-lg btn-outline-success btn-block offset-1 col-10" @click="createTable">Create table</button>
    </div>
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
      tableName: '',
      tableFields: []
    }
  },
  methods: {
    addField: function () {
      this.tableFields.push(new TableField())
    },
    createTable: function () {
      let obj = {
        'tableName': this.tableName,
        'tableFields': this.tableFields
      }
      console.log(obj)

      let json = JSON.stringify(obj)
      const url = 'http://localhost:8000/db/tablecreate'
      console.log(json)

      this.axios.post(url, obj, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }}).then((res) => {
        if (res.status !== 200) {
          console.log('Error:', res.status)
        } else {
          console.log(res)
          this.$router.push('/tablelist')
        }
      })
    }
  }
}
</script>
