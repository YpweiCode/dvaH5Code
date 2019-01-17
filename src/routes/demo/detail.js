import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { connect } from 'dva'
import {Form,Carousel} from 'antd'
import { Page } from 'components'
import styles from './index.less'


class Detail extends Component {

  constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息

    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
    }
    this.onChange = () => this._onChange()
    this.handleClick = () => this._handleClick()
  }


  componentWillMount() {

    let phone = this.props.demo.phone
    let warehouseId = this.props.demo.warehouseId
    this.props.dispatch({
      type:'demo/query',
      payload:{
        phone:phone,
        warehouseId:warehouseId
      }
    })
  }
  componentdidMount(){

  }
  _onChange(){

  }

  render() {
    const {warehouseRentVO,warehouseBasicVO,warehouseInfoVO,warehouseParkVO} = this.props.demo
    return (
      <div>
        <div className={styles.detail} style={{marginTop:0,paddingBottom:6}}>
          <div className={styles.detailBox}>
            <p className={styles.basicInfo}>出租信息</p>
            <p className={styles.detailInfro}>租金：<span>{warehouseBasicVO?warehouseBasicVO.rentPrice+warehouseBasicVO.rentType:''}</span></p>
            <p className={styles.detailInfro}>可租面积：<span>{warehouseBasicVO.rentArea}㎡</span></p>
            <p className={styles.detailInfro}>起租面积：<span>{warehouseBasicVO.miniRentArea}㎡</span></p>
            <p className={styles.detailInfro}>总面积：<span>{warehouseBasicVO.totalArea}㎡</span></p>
            <p className={styles.detailInfro}>发布时间：<span>{warehouseBasicVO?warehouseBasicVO.releaseDate:''}</span></p>
            <p className={styles.detailInfro}>入住时间：<span>{warehouseRentVO.isAnytimeCheckin?'随时入住':warehouseRentVO.checkInDate}</span></p>
            <p className={styles.detailInfro}>起租期限：<span>{warehouseRentVO.rentMinTime}</span></p>
            <p className={styles.detailInfro}>免租期限：<span>{warehouseRentVO.rentFreeTime?warehouseRentVO.rentFreeTime+"月":''}</span></p>
            <p className={styles.detailInfro}><p className={styles.detailTitle2}>开具发票：</p><p className={styles.detailNum2}>{warehouseRentVO.invoice}</p></p>
            <p className={styles.detailInfro}>税率：<span>{warehouseRentVO.tax}</span></p>
            <p className={styles.detailInfro} style={{width:'100%'}}>所在位置：<span>{warehouseBasicVO.province}-{warehouseBasicVO.city}-{warehouseBasicVO.district}</span></p>
          </div>
          <div className={styles.detailBox} style={{paddingTop: '20px'}}>
            <p className={styles.basicInfo}>仓库信息</p>
            <div style={{overflow:'hidden'}}>
              <p className={styles.basicInfoCell}>基础信息</p>
              <p className={styles.detailInfro}>库房用途：<span>{warehouseBasicVO.purpose}</span></p>
              <p className={styles.detailInfro}>仓库类型：<span>{warehouseInfoVO.style}</span></p>
              <p className={styles.detailInfro}>仓库应用：<span >{warehouseInfoVO.application}</span></p>
              <p className={styles.detailInfro}>配备货架：<span>{warehouseInfoVO.shelve}</span></p>
            </div>
            <div style={{overflow:'hidden',marginTop:4}}>
              <p className={styles.basicInfoCell}>装卸货区</p>
              <p className={styles.detailInfro}>卸货平台：<span>{warehouseInfoVO.unloadPlatform}</span></p>
              <p className={styles.detailInfro}>雨棚：<span>{warehouseInfoVO.canopy}</span></p>
              <p className={styles.detailInfro}>月台类型：<span >{warehouseInfoVO.railwayPlatform}</span></p>
              <p className={styles.detailInfro}><p className={styles.detailTitle3} style={{widht:100}}>支持最大车长：</p><p className={styles.detailNum2} style={{marginLeft:100}}> {warehouseInfoVO.maxVehicleLen}米</p></p>
            </div>
            <div style={{overflow:'hidden',marginTop:4}}>
              <p className={styles.basicInfoCell}>建筑信息</p>
              <p className={styles.detailInfro} style={{width:'100%'}}>总楼层：<span>{warehouseInfoVO.totalFloor}层</span></p>
              <div style={{float:'left',width:'100%'}}>
                <p className={styles.detailInfro}><p className={styles.detailTitle2}>底层层高：</p><p className={styles.detailNum2}>{warehouseInfoVO.heightGroundFloor?warehouseInfoVO.heightGroundFloor+"米":''}</p></p>
                <p className={styles.detailInfro}><p className={styles.detailTitle2}>底层承重：</p><p className={styles.detailNum2}>{warehouseInfoVO.weightGroundFloor?warehouseInfoVO.weightGroundFloor+"T/㎡":''}</p></p>

              </div>

              {warehouseInfoVO.heightGroundFloor>=2?<p className={styles.detailInfro}><p className={styles.detailTitle3}>二层以上层高：</p><p className={styles.detailNum3}>{warehouseInfoVO.heightSecondFloor+"米"}</p></p>:""}
              {warehouseInfoVO.heightGroundFloor>=2?<p className={styles.detailInfro}><p className={styles.detailTitle3}>二层以上承重：</p><p className={styles.detailNum3}>{warehouseInfoVO.weightSecondFloor+"T/㎡"}</p></p>:''}
              <p className={styles.detailInfro}>建筑结构：<span>{warehouseInfoVO.structure}</span></p>
              <p className={styles.detailInfro} style={{width:'100%'}}><p className={styles.detailTitle2}>地坪质地：</p><p className={styles.detailNum2}>{warehouseInfoVO.groundTexture}</p></p>
            </div>
            <div style={{overflow:'hidden',marginTop:4}}>
              <p className={styles.basicInfoCell}>消防信息</p>
              <p className={styles.detailInfro} style={{width:'100%'}}>消防资质：<span>{warehouseInfoVO.fireLevel}</span></p>
              <p className={styles.detailInfro} style={{width:'100%'}}><p className={styles.detailTitle2}>消防系统：</p><p className={styles.detailNum2}>{warehouseInfoVO.fireSystem}</p></p>
              <p className={styles.detailInfro} style={{width:'100%'}}>货物财产险：<span >{warehouseInfoVO.propertyInsurance}</span></p>
            </div>
          </div>
          <div className={styles.detailBox} style={{paddingTop: '20px',borderBottom:'none'}}>
            <p className={styles.basicInfo}>园区配套</p>
            <p className={styles.detailInfro} style={{width:'100%'}}><p className={styles.detailTitle2}>所属园区：</p><p className={styles.detailNum2}>{warehouseParkVO.parkName}</p></p>
            <p className={styles.detailInfro}>土地性质：<span>{warehouseParkVO.landNature}</span></p>
            <p className={styles.detailInfro}>土地所有权：<span >{warehouseParkVO.landOwner}</span></p>
            <p className={styles.detailInfro}>园区围墙：<span>{warehouseParkVO.wallStyle}</span></p>
            <p className={styles.detailInfro}>园区出入口：<span>{warehouseParkVO.gatewayCount}个</span></p>
            <p className={styles.detailInfro} style={{width:'100%'}}><p className={styles.detailTitle3}>基础设施设备：</p><p className={styles.detailNum3}>{warehouseParkVO.basicEquipment}</p></p>
            <p className={styles.detailInfro} style={{width:'100%'}}><p className={styles.detailTitle3} style={{width:84}}>水电暖气网：</p><p className={styles.detailNum3} style={{marginLeft:84}}>{warehouseParkVO.lifeEquipment}</p></p>
            <p className={styles.detailInfro} style={{width:'100%'}}><p className={styles.detailTitle2}>安保系统：</p><p className={styles.detailNum2}>{warehouseParkVO.securitySystem}</p></p>
          </div>
        </div>


      </div>
    );
  }
}

export default connect(({ demo, loading }) => ({ demo, loading }))(Form.create()(Detail))
