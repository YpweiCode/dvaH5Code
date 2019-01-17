import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import { query, logout } from 'services/app'
import Cookies from 'utils/cookie';
import queryString from 'query-string'
import 'antd-mobile/dist/antd-mobile.css';
const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    menu: [],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {

    * query ({
               payload,
             }, { call, put, select }) {
      let user = {};
      user.username = 'test'; //模拟登陆用户
      const { locationPathname } = yield select(_ => _.app)
      if (user.username) {
        let menu = config['menu'];
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions: true,
            menu,
          },
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push({
            pathname: menu[0].router,
          }))
        } else {
          yield put(routerRedux.push({
            pathname: location.pathname
          }))
        }
      } else {
        yield put(routerRedux.push({
            pathname: '/login',
            search: queryString.stringify({
              from: locationPathname,
            })
          })
        )
      }
    },

    * logout ({
                payload,
              }, { call, put }) {
      // const data = yield call(logout, parse(payload)) // 调用后端接口进行退出
      Cookies.remove('TOKENID');
      Cookies.remove('username');
      yield put({ type: 'query' })

    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
