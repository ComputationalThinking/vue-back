import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    redirect: '/login/userlogin',
    hidden: true,
    children: [
      {
        path: '/login/userlogin',
        component: () => import('@/views/login/login/index'),
        hidden: true
      },
      {
        path: '/login/userregister',
        component: () => import('@/views/login/register/index'),
        hidden: true
      },
      {
        path: '/login/userpassword',
        component: () => import('@/views/login/password/index'),
        hidden: true
      }
    ]

  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '实验室后台管理系统', icon: 'dashboard' }
    }]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news/table',
    name: 'News',
    meta: { title: '新闻信息管理', icon: 'el-icon-document' },
    alwaysShow: true,
    children: [
      // 新闻列表
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/news/table/index'),
        meta: { title: '新闻列表', icon: 'table' }
      },
      // 新闻表单
      {
        hidden: true,
        path: 'form/:id',
        name: 'Form',
        component: () => import('@/views/news/newsForm/index'),
        meta: { title: '新闻表单', icon: 'table' }
        // hidden: true
      },
      {
        hidden: true,
        path: 'createform',
        name: 'Form',
        component: () => import('@/views/news/newsForm/index'),
        meta: { title: '新闻表单', icon: 'table' }
        // hidden: true
      }

    ]
  },

  {
    path: '/carousel',
    component: Layout,
    redirect: '/carousel/table',
    name: 'Carousel',
    meta: { title: '轮播图信息管理', icon: 'el-icon-picture' },
    alwaysShow: true,
    children: [
      // 轮播图列表
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/carousel/table/index'),
        meta: { title: '轮播图列表', icon: 'table' }
      },
      // 轮播图表单
      {
        hidden: true,
        path: 'form/:id',
        name: 'Form',
        component: () => import('@/views/carousel/form/index'),
        meta: { title: '轮播图表单', icon: 'table' }
      },

      {
        hidden: true,
        path: 'createform',
        name: 'Form',
        component: () => import('@/views/carousel/form/index'),
        meta: { title: '轮播图表单', icon: 'table' }
        // hidden: true
      }
    ]
  },

  {
    path: '/achievement',
    component: Layout,
    redirect: '/achievement/table',
    name: 'Achievenment',
    meta: { title: '成果介绍信息管理', icon: 'el-icon-star-off' },
    alwaysShow: true,
    children: [
      // 轮播图列表
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/achievement/table/index'),
        meta: { title: '成果信息列表', icon: 'table' }
      },
      // 轮播图表单
      {
        hidden: true,
        path: 'form/:id',
        name: 'Form',
        component: () => import('@/views/achievement/form/index'),
        meta: { title: '成果信息表单', icon: 'table' }
      },

      {
        hidden: true,
        path: 'createform',
        name: 'Form',
        component: () => import('@/views/achievement/form/index'),
        meta: { title: '成果信息表单', icon: 'table' }
        // hidden: true
      }
    ]
  },

  {
    path: '/lab',
    component: Layout,
    redirect: '/lab/form',
    name: 'Lab',
    meta: { title: '实验室信息管理', icon: 'el-icon-s-help' },
    alwaysShow: true,
    children: [
      // 实验室研究方向和人才需求
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/labintro/research direction/form/index'),
        meta: { title: '实验室介绍', icon: 'education' }
      },

      {
        path: 'character',
        name: 'Character',
        component: () => import('@/views/labintro/character/index'),
        meta: { title: '成员管理', icon: 'table' },
        children: [
          {
            path: 'table',
            name: 'Table',
            component: () => import('@/views/labintro/character/table/index'),
            meta: { title: '成员列表', icon: 'peoples' }
          },
          {
            hidden: true,
            path: 'form/:id',
            name: 'Form',
            component: () => import('@/views/labintro/character/form/index'),
            meta: { title: '成员表单', icon: 'table' }
          },
          {
            hidden: true,
            path: 'createform',
            name: 'CreateForm',
            component: () => import('@/views/labintro/character/form/index'),
            meta: { title: '成员表单', icon: 'table' }
          }
        ]
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index/:id',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
