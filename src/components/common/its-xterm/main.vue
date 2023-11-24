<template>
  <div id="xterm" class="xterm" style="height: 100%"></div>
</template>
<script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

export default {
  name: 'Xterm',
  props: {
    socketURI: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log(111)
    this.initSocket()
  },
  beforeDestroy() {
    this.socket.close()
    this.term.dispose()
  },
  methods: {
    initTerm() {
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true
      })
      const attachAddon = new AttachAddon(this.socket)
      const fitAddon = new FitAddon()
      term.loadAddon(attachAddon)
      term.loadAddon(fitAddon)
      term.open(document.getElementById('xterm'))
      fitAddon.fit()
      term.focus()
      this.term = term
    },
    initSocket() {
      console.log(this.socketURI)
      try {
        const proto = document.location.protocol === 'http:' ? 'ws:' : 'wss:'
        const address = document.location.port
          ? document.location.hostname + ':' + document.location.port
          : document.location.hostname
        const wsuri = proto + '//' + address + this.socketURI
        this.socket = new WebSocket(wsuri)
      } catch (error) {
        console.log(error)
      }
      this.socketOnClose()
      this.socketOnOpen()
      this.socketOnError()
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        // 链接成功后
        this.initTerm()
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        // console.log('close socket')
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
        // console.log('socket 链接失败')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .xterm {
  height: 100%;
}
</style>
