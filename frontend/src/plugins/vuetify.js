import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { ru } from 'vuetify/locale'

export default createVuetify({
  components,
  directives,
  locale: {
    locale: 'ru',
    messages: { ru }
  }
})