<template>
  <div>
    <h3 @click="viewTable(table.name)" v-for="(table, id) in tableList" :key="id">{{ table.name }} + {{ id }}</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableList: []
    }
  },
  methods: {
    viewTable: function (tableName) {
      this.$router.push(`/tableview/${tableName}`)
    }
  },
  created () {
    this.axios.get('http://localhost:8000/db/tablelist/', {headers: {
      'Access-Control-Allow-Origin': '*'
    }}).then((res) => {
      this.tableList = res.data
    })
  }
}
</script>
