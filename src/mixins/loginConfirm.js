/* When mixed into the page, you can directly call the page aspect.
 The underlying layer uses data for management and unified execution.
  Mixins prioritize data execution,
  while data in the array is overwritten from the back and prioritized execution
*/
export default {
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: 'Tips:',
          message: 'please Login',
          confirmButtonText: 'Login in',
          cancelButtonText: 'view orther'
        })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
