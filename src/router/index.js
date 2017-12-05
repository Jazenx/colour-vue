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
export const constantRouterMap = [{
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
    redirect: '/review',
    name: '审核',
    hidden: true,
    children: [{
      path: 'review',
      component: _import('review/content')
    }]
  },
  {
    path: '/userinfo',
    name: '用户详情',
    component: _import('review/userinfo'),
    hidden: true
  },
  {
    path: '/ipinfo',
    name: 'IP详情',
    component: _import('review/ipinfo'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [{
    path: '/review',
    component: Layout,
    redirect: '/review/content',
    name: '审核',
    icon: 'semantics',
    children: [{
        path: 'content',
        component: _import('review/content'),
        icon: 'fenxi',
        name: '内容'
      },
      {
        path: 'ipcontent',
        component: _import('review/ipcontent'),
        icon: 'fenxi',
        name: '用户IP'
      },
      {
        path: 'idcontent',
        component: _import('review/idcontent'),
        icon: 'fenxi',
        name: '用户ID'
      }
      // ,
      // {
      //   path: 'waterarmy',
      //   component: _import('review/waterarmy'),
      //   icon: 'fenxi',
      //   name: '水军'
      // }
      // ,
      // {
      //   path: 'swiper',
      //   component: _import('review/swiper'),
      //   icon: 'fenxi',
      //   name: '轮播图测试'
      // }
      // ,
      // {
      //   path: 'demo',
      //   component: _import('review/demo'),
      //   icon: 'fenxi',
      //   name: 'Demo'
      // }
    ]
  },
  {
    path: '/usercenter',
    component: Layout,
    redirect: '/usercenter/index',
    name: '客户中心',
    icon: 'shuju',
    children: [{
        path: 'blacklist',
        component: _import('banned/index'),
        icon: 'jiankong',
        name: '黑名单'
      },
      {
        path: 'whitelist',
        component: _import('whitelist/index'),
        icon: 'jiankong',
        name: '白名单'
      },
      {
        path: 'graylist',
        component: _import('graylist/index'),
        icon: 'jiankong',
        name: '灰名单'
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }, {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  }
];
