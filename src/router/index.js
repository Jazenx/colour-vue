import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router)

import Layout from '../views/layout/layout'

export const constantRouterMap = [
  {
    path: '/404',
    component: _import('error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: _import('error/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'zujian',
    children: [
      { path: 'index', component: _import('components/index'), name: '介绍 ' },
      { path: 'tinymce', component: _import('components/tinymce'), name: '富文本编辑器' },
      { path: 'markdown', component: _import('components/markdown'), name: 'Markdown' },
      { path: 'jsoneditor', component: _import('components/jsoneditor'), name: 'JSON编辑器' },
      { path: 'dndlist', component: _import('components/dndlist'), name: '列表拖拽' },
      { path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane' },
      { path: 'avatarupload', component: _import('components/avatarUpload'), name: '头像上传' },
      { path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone' },
      { path: 'sticky', component: _import('components/sticky'), name: 'Sticky' },
      { path: 'countto', component: _import('components/countTo'), name: 'CountTo' },
      { path: 'mixin', component: _import('components/mixin'), name: '小组件' },
      { path: 'backtotop', component: _import('components/backToTop'), name: '返回顶部' }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    icon: 'zonghe',
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/table',
        name: 'Table',
        icon: 'table',
        children: [
          { path: 'dynamictable', component: _import('example/table/dynamictable'), name: '动态table' },
          { path: 'dragtable', component: _import('example/table/dragTable'), name: '拖拽table' },
          { path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: 'table内编辑' },
          { path: 'table', component: _import('example/table/table'), name: '综合table' }
        ]
      },
      { path: 'form/edit', icon: 'ziliaoshouce', component: _import('example/form'), name: '编辑Form', meta: { isEdit: true } },
      { path: 'form/create', icon: 'yinhangqia', component: _import('example/form'), name: '创建Form' },

      { path: 'tab/index', icon: 'mobankuangjia', component: _import('example/tab/index'), name: 'Tab' }
    ]
  },
  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    children: [
      { path: '401', component: _import('error/401'), name: '401' },
      { path: '404', component: _import('error/404'), name: '404' }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
