<template>
  <div>
    <router-view></router-view>
    <van-tabbar active-color="#ee0a24" inactive="#000" route>
      <van-tabbar-item icon="wap-home-o" to="/home">Home</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">Category</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">Shopping list</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">My</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>

</style>
