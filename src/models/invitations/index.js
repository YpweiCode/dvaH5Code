import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { routerRedux } from 'dva/router'
import { joinus ,queryStatus} from 'services/invitations/index.js'
import { pageModel } from '../common'
import {message} from 'antd'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'Invitation',

  state: {
    usrParm:{},
    isSelect:null
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        function b64DecodeUnicode(str) {
          return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
        }

        if (location.pathname.indexOf("/invitation") > -1) {
          var href=window.location.href;
          let data=href.substring(href.indexOf(/invitations/)+13)
          let parme=b64DecodeUnicode(data).split(';');
          console.log(b64DecodeUnicode(data))
          dispatch({
            type:'updateState',
            payload:{
              usrParm:JSON.parse(JSON.stringify(parme))
            }
          })
          dispatch({
            type:'query',
            payload:{
              "companyId":Number(parme[2]),
              "departmentIdList":JSON.parse(parme[3]),
              "invitationTime": Number(parme[5]),
              "staffName": parme[6],
              "staffTel": Number(parme[1]),
            }
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(queryStatus, payload);
      if(data && data.success){
        yield put({
          type: 'updateState',
          payload: {
            isSelect:data.result
          }
        })
      }

    },

    *detail ({payload = {}}, {call, put, select }){
      yield put(routerRedux.push({pathname: '/detail'}));
    },
    *joinus ({payload = {}}, {call, put, select }){
      const data = yield call(joinus, payload);
      return data
    },

  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

  },
})
