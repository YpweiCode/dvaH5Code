import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { routerRedux } from 'dva/router'
import { query } from 'services/demo/index.js'
import { pageModel } from '../common'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'demo',

  state: {
    dataSource:[],
    pictureVOS:[],//图片信息
    warehouseBasicVO:{},//基础信息
    warehouseInfoVO:{},//仓库信息
    warehouseParkVO:{},//园区信息
    warehouseRentVO:{},//出租信息
    license:[],
    operation:[],
    telphone:"",
    companyName:"",
    avatarImg:"",
    authenticator:"",
    warehouseSimpleVO:null,//仓库配置套餐信息
    warehouseVO:null,//主要信息
    phone:'',
    warehouseId:'',
    empty:false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {

        if (location.pathname.indexOf("/share/") > -1) {
          let dataarr=location.pathname.split('/');
          let str=dataarr[dataarr.length-1]
          let ary = str.split("&")
          let ary1 = ary[0].split("=")
          let ary2 = ary[1].split("=")
          dispatch({
            type: 'query',
            payload:{
              phone:ary2[1],
              warehouseId:ary1[1]
            }
          })
          dispatch({
            type:'updateState',
            payload:{
              phone:ary2[1],
              warehouseId:ary1[1]
             }
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload);
      if(data.errorCode == 2033){
        yield put({type:'updateState',payload:{empty:true}})
      }else{
        if(data && data.success){
          let ary =[]
          let ary2 = []
          if(data.result.warehouseBasicVO.license){
            ary = data.result.warehouseBasicVO.license.split("、")
          }
          if(data.result.warehouseBasicVO.operation){
            ary2 = data.result.warehouseBasicVO.operation.split("、")
          }
          yield put({
            type: 'updateState',
            payload: {
              empty:false,
              pictureVOS:data.result.pictureVOS || [],//图片信息
              warehouseBasicVO:data.result.warehouseBasicVO,//基础信息
              warehouseInfoVO:data.result.warehouseInfoVO,//仓库信息
              warehouseParkVO:data.result.warehouseParkVO,//园区信息
              warehouseRentVO:data.result.warehouseRentVO,//出租信息
              telphone:data.result.telephone,
              companyName:data.result.companyName,
              avatarImg:data.result.avatarImg,
              authenticator:data.result.authenticator,
              license:ary,
              operation:ary2,
              warehouseSimpleVO:data.result.warehouseSimpleVO?data.result.warehouseSimpleVO:[],//仓库配置套餐信息
            }
          })

        }
      }


    },

    *detail ({payload = {}}, {call, put, select }){
      yield put(routerRedux.push({pathname: '/detail'}));
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
