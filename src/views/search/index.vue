<template>
  <div class="search">
    <van-nav-bar title="Product Search" left-arrow @click-left="$router.go(-2)" />

    <van-search v-model="search" show-action placeholder="please input here" clearable>
      <template #action>
        <div @click="goSearch(search)">Search</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>Recent Search</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '', // 输入框的内容
      history: getHistoryList() // 历史记录
    }
  },
  methods: {
    goSearch (key) {
      // index搜索原来key里面有没有相同的key如果没有返回-1
      const index = this.history.indexOf(key)
      if (index !== -1) {
        // 将原有关键字移除
        // splice(删除1个key中相同的key, 项1, 项2)
        this.history.splice(index, 1)
      }
      // 向最前面追加
      this.history.unshift(key)
      setHistoryList(this.history)

      // 跳转到搜索列表页
      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
