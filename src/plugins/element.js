import Vue from 'vue'
// eslint-disable-next-line import/no-duplicates
import { Button } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Form, FormItem } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Input } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
