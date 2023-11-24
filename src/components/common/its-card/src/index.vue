<template>
  <div class="container">
    <header>
      <div id="left">
        <slot name="header-left">{{ !position || position === 'left' ? title : '' }}</slot>
      </div>
      <div id="center">
        <slot name="header-center">{{ position === 'center' ? title : '' }}</slot>
      </div>
      <div id="right">
        <slot name="header-right">{{ position === 'right' ? title : '' }}</slot>
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'ItsCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    title: String,
    // eslint-disable-next-line vue/require-default-prop
    position: String
  }
}
</script>
<style scoped>
.container {
  border: 1px solid #ddd;
}
header {
  display: flex;
  padding: 10px;
  font-size: 14px;
  background-color: #f9f9f9;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
