import Vue from 'vue'
import Router from 'vue-router'

import Task from '@/components/task'
import RepEdit from '@/components/rep_edit'
import RepDisplay from '@/components/rep_display'
import MagDoc from '@/components/mag_doc'
import Upload from '@/components/upload'

Vue.use(Router)

const vueRouter = new Router({
  routes: [ {
    path: '/',
    name: 'entrusts',
    component: Task
  }, {
    path: '/rep-edit',
    name: 'doc-edit',
    component: RepEdit
  }, {
    path: '/rep-display',
    name: 'doc-display',
    component: RepDisplay
  }, {
    path: '/mag-doc',
    name: 'documents',
    component: MagDoc
  }, {
    path: '/upload',
    name: 'doc-upload',
    component: Upload
  }]
})
export default vueRouter