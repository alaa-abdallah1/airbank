import Loader from '@/components/Loader.vue'

export default {
  components: { Loader },

  data() {
    return {
      loader: true,
    }
  },

  methods: {
    displayCellValue(item, key) {
      let value = null

      if (key) {
        let keys = key.split('.')
        let finalValue = item[keys.shift()]

        if (finalValue && finalValue.constructor === Object) {
          keys.forEach((key) => {
            if (finalValue && finalValue.constructor === Object) {
              finalValue = finalValue[key]
            } else {
              finalValue = null
            }
          })
        }

        value = finalValue
      }

      return value
    },
  },
}
