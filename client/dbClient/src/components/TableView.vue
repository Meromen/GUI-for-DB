<template>
  <div>
    <vue-good-table :rows="tableData" :columns="columns"/>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'

export default {
  components: {
    VueGoodTable
  },
  props: {
    tableName: {
      requier: true
    }
  },
  data () {
    return {
      columns: [],
      tableData: [],
      actions: []
    }
  },
  created () {
    this.axios.get(`http://localhost:8000/db/viewtable/${this.tableName}`, {headers: {
      'Access-Control-Allow-Origin': '*'
    }}).then((res) => {
      this.tableData = res.data
      console.log(res.data)
      this.axios.get(`http://localhost:8000/db/tablescema/${this.tableName}`, {headers: {
        'Access-Control-Allow-Origin': '*'
      }}).then((res) => {
        for (let item of res.data) {
          this.columns.push({
            'field': item.name,
            'label': item.name
          })
        }
      })
    })
  }
}
</script>
