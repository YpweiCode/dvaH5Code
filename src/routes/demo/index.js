import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { connect } from 'dva'
import {Form,Carousel} from 'antd'
import { Page } from 'components'
import styles from './index.less'


class App extends Component {

  constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息

    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
    }
    this.onChange = () => this._onChange()
    this.handleClick = () => this._handleClick()
    this.bd_encrypt = () => this._bd_encrypt()
  }


  _bd_encrypt(gg_lng, gg_lat) {
    let X_PI = Math.PI * 3000.0 / 180.0;
    let x = gg_lng, y = gg_lat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    let bd_lng = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    return {
      bd_lat: bd_lat,
      bd_lng: bd_lng
    };
  }
  componentWillReceiveProps(nextProps){

    // if(this.props.demo.warehouseBasicVO && this.props.demo.warehouseBasicVO != nextProps.warehouseBasicVO){
    //   let obj = this._bd_encrypt(this.props.demo.warehouseBasicVO.longitude,this.props.demo.warehouseBasicVO.latitude)
    //   let map = new BMap.Map("allmap");
    //   map.centerAndZoom(new BMap.Point(116.404, 39.915), 16);
    //   map.clearOverlays()
    //   let new_point1 = new BMap.Point(obj.bd_lng,obj.bd_lat)
    //   // 将标注添加到地图中
    //   map.panTo(new_point1);
    //   map.enableScrollWheelZoom(true)
    //   map.disablePinchToZoom(true)
    //   map.disableDoubleClickZoom(true)
    //   map.disableDragging(true);
    // }

  }
  componentDidMount() {

  }

  _onChange(){

  }

  _handleClick(){
    this.props.dispatch({
      type:'demo/detail'
    })
  }

  render() {
    const {
        pictureVOS,//图片信息
        warehouseBasicVO,//基础信息
        warehouseInfoVO,//仓库信息
        warehouseParkVO,//园区信息
        warehouseRentVO,//出租信息
        warehouseSimpleVO,//仓库配置套餐信息
        warehouseVO,//主要信息
        license,
        operation,
        telphone,
        companyName,
        avatarImg,
        authenticator,
        empty
      } = this.props.demo

    return (
      <div>

        {empty?<div className={styles.emptyBox}>
            <div className={styles.emptyImg}></div>
            <p className={styles.emptyTitle}>该仓库已下线</p>
          </div>:
          <div>
          <div className={styles.container}>
            {pictureVOS.length>0?<Carousel afterChange={this.onChange} autoplay={pictureVOS.length>1?true:false}>
                {pictureVOS.map((item,index) => <div style={{background: `url(${item.uri}) center center / cover no-repeat`}}></div>)}
            </Carousel>:''}
            <div className={styles.title}>
              <div className={styles.titleTop}>
                <div className={styles.name}>
                  <p>{warehouseBasicVO.title}</p>
                </div>
              </div>
              <div className={styles.wareNum}>
                  <div className={styles.wareCell}>
                    <p className={styles.wareCellTip}>租金</p>
                    <p className={styles.wareCellNum}>{warehouseBasicVO?warehouseBasicVO.rentPrice+warehouseBasicVO.rentType:''}</p>
                  </div>
                  <div className={styles.wareCell}>
                    <p className={styles.wareCellTip}>可租面积</p>
                    <p className={styles.wareCellNum}>{warehouseBasicVO.rentArea}米</p>
                  </div>
                  <div className={styles.wareCell}>
                    <p className={styles.wareCellTip}>起租面积</p>
                    <p className={styles.wareCellNum}>{warehouseBasicVO.miniRentArea}米</p>
                  </div>
              </div>
              <div>
                {warehouseInfoVO.application && <span className={`${styles.tags} ${styles.tagsColor1}`}>普通仓</span>}
                {warehouseInfoVO.style && <span className={`${styles.tags} ${styles.tagsColor1}`}>高台库</span>}
                {license.length>0?license.map((item,index) => <span key={index} className={`${styles.tags} ${styles.tagsColor2}`}>{item}</span>):''}
                {operation.length>0?operation.map((item,index) => <span key={index} className={`${styles.tags} ${styles.tagsColor3}`}>{item}</span>):''}
              </div>
            </div>
          </div>
          <div className={styles.detail}>
            <p className={styles.basicInfo}>主要信息</p>

            <p className={styles.detailInfro}><p className={styles.detailTitle1}>总面积：</p><p className={styles.detailNum1}>{warehouseBasicVO.totalArea}㎡</p></p>
            <p className={styles.detailInfro}>仓库类型：<span>{warehouseInfoVO.style}</span></p>
            <p className={styles.detailInfro}>起租期限：<span >{warehouseRentVO.rentMinTime}</span></p>
            <p className={styles.detailInfro}>免租期限：<span>{warehouseRentVO.rentFreeTime?warehouseRentVO.rentFreeTime+"月":''}</span></p>
            <div style={{float:'left',width:'100%'}}>
              <p className={styles.detailInfro}><p className={styles.detailTitle2}>底层层高：</p><p className={styles.detailNum2}>{warehouseInfoVO.heightGroundFloor?warehouseInfoVO.heightGroundFloor+"米":''}</p></p>
              <p className={styles.detailInfro}><p className={styles.detailTitle2}>底层承重：</p><p className={styles.detailNum2}>{warehouseInfoVO.weightGroundFloor?warehouseInfoVO.weightGroundFloor+"T/㎡":''}</p></p>

            </div>

            {warehouseInfoVO.heightGroundFloor>=2?<p className={styles.detailInfro}><p className={styles.detailTitle3}>二层以上层高：</p><p className={styles.detailNum3}>{warehouseInfoVO.heightSecondFloor+"米"}</p></p>:""}
            {warehouseInfoVO.heightGroundFloor>=2?<p className={styles.detailInfro}><p className={styles.detailTitle3}>二层以上承重：</p><p className={styles.detailNum3}>{warehouseInfoVO.weightSecondFloor+"T/㎡"}</p></p>:''}
            <p className={styles.detailInfro} style={{width:'100%'}}>消防资质：<span>{warehouseInfoVO.fireLevel}</span></p>
            <p className={styles.detailInfro} style={{width:'100%'}}>所属位置：<span>{warehouseBasicVO.province}-{warehouseBasicVO.city}-{warehouseBasicVO.district}</span></p>
            <div className={styles.moreInfor} onClick={this.handleClick}>
              查看更多仓库信息
            </div>
          </div>


          {(warehouseSimpleVO && warehouseSimpleVO.length>0)?<div className={styles.detail} style={{paddingBottom:0}}>
            <p className={styles.basicInfo} >配套设施</p>
            <div className={styles.facilities}>
              {warehouseSimpleVO.map((item,index) =><div key={index} className={styles.facilitiesBox}>
                <img style={{width:24,height:24}} src={item.warehouseEquipmentUrl} alt=""/>
                <p>{item.warehouseEquipment}</p>
              </div>)}
            </div>
          </div>:''}


          <div className={styles.detail}>
            <p className={styles.basicInfo}>仓库介绍</p>
            <p>{warehouseBasicVO.discription}</p>
          </div>

          <div className={styles.detail} style={{marginBottom:80,position:'relative'}}>
            <p className={styles.basicInfo}>地理位置</p>
            <p id="allmap" className={styles.allmap}></p>
            <div className={styles.icon}></div>
          </div>
          <div style={{height:1}}></div>
          <div className={styles.bottom}>
            <p className={styles.basicInfo}></p>
            <div>
              <div className={styles.bottomLeft}>
                <img style={{width:45,height:45,float:'left',borderRadius:'90px'}} src={avatarImg} alt=""/>
                <div className={styles.bottomName}>
                  <p>{authenticator?authenticator:'未认证用户'}</p>
                  {authenticator && <p style={{width:"90%",whiteSpace: 'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{companyName}</p>}
                </div>
              </div>
              <div className={styles.bottomRight}>
                <a href={'tel'+':'+telphone}><img style={{width:80,height:45}} src="/Group 2.png" alt=""/></a>
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}


export default connect(({ demo, loading }) => ({ demo, loading }))(Form.create()(App))
