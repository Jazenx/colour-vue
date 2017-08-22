import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
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
});

export const asyncRouterMap = [
  {
    path: '/automatic',
    component: Layout,
    redirect: '/automatic/index',
    name: '自动数据抓取',
    icon: 'shuju',
    children: [
      {
        path: 'index',
        component: _import('automatic/index'),
        icon: 'jiankong',
        name: '介绍 '
      },
      {
        path: 'grapMonitor',
        component: _import('automatic/grapMonitor'),
        icon: 'jiankong',
        name: '爬虫监控'
      }
    ]
  },
  {
    path: '/semantic',
    component: Layout,
    redirect: '/semantic/index',
    name: '语义分析工具',
    icon: 'semantics',
    children: [
      {
        path: 'index',
        component: _import('semantic/index'),
        icon: 'fenxi',
        name: '语义分析'
      },
      {
        path: 'grapMonitor',
        component: _import('semantic/w2v'),
        icon: 'zhinengsuanfa',
        name: 'w2v'
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];
