import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { connect } from 'dva'
import {Form,Carousel,message} from 'antd'
import { Page } from 'components'
import styles from './index.less'
import { Toast} from 'antd-mobile';

class Invitation extends Component {

  constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息

    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
      style:1,
      usrParm:{}
    }
    this.onChange = () => this._onChange()
    this.handleClick = () => this._handleClick()
    this.bd_encrypt = () => this._bd_encrypt()
  }


  _bd_encrypt(gg_lng, gg_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = gg_lng, y = gg_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return {
      bd_lat: bd_lat,
      bd_lng: bd_lng
    };
  }
  componentWillReceiveProps(nextProps){


  }
  componentDidMount() {

  }

  _onChange(){

  }
  reject(){
    if(this.props.Invitation.isSelect){
      message.info('您已加入此公司')
      return
    }
    this.setState({
      style:4
    })

  }

  accept (){
    if(this.props.Invitation.isSelect){
      message.info('您已加入此公司！')
      return
    }
    let that=this;
    let res=this.props.dispatch({
      type:'Invitation/joinus',
      payload:{
        "companyId":Number(that.state.usrParm[2]),
        "departmentIdList":JSON.parse(that.state.usrParm[3]),
        "invitationTime": Number(that.state.usrParm[5]),
        "staffName": that.state.usrParm[6],
        "staffTel": Number(that.state.usrParm[1]),
        "companyName":that.state.usrParm[4]
      }
    })
    console.log(res)
    res.then(function(res){
      if(res&&res.success) {

        if (res.result) {
          that.setState({
            style: 2
          })
        }

      }
      else{
        if(res.errorCode==4001){
          that.setState({
            style:3
          })
        }else{
          Toast.info(res.errorMsg,3)
        }
      }
    })




  }


  _handleClick(){
    this.props.dispatch({
      type:'invitation/detail'
    })
  }




  render() {
    const {
      usrParm
    } = this.props.Invitation;



    this.state.usrParm=usrParm  ;
    if(this.props.Invitation.isSelect){
      this.state.style=3
    }
    return (
      <div className={styles.wrap}>
        <img  className={styles.smallogo}  style={{width: '1.4rem',height: '0.51rem'}} src='http://work-portal.oss-cn-hangzhou.aliyuncs.com/cangmenglogo.png' />
        {/*首页 111 */}
        {this.state.style==1&&<div>
          <img  className={styles.biglogo}  style={{width: '1.08rem',height: '1.08rem'}} src='http://work-portal.oss-cn-hangzhou.aliyuncs.com/cangmengbiglogo.png' />
          <p className={styles.titletop}><span  style={{color:'#FF324A'}}>{usrParm[0]}</span>邀请你加入</p>
          <p className={styles.titleBottom}>{usrParm[4]}</p>
          <p className={styles.accetp} onClick={()=>{this.accept()}}>接受邀请</p>
          <p className={styles.reject} onClick={()=>{this.reject()}}>拒绝加入</p>
        </div>}

        {/*同意邀请 2*/}
        {
          this.state.style==2&&<div>
            <img className={styles.successImg} src='http://work-portal.oss-cn-hangzhou.aliyuncs.com/success.png' />
            <p className={styles.successJoin}>加入成功</p>
            <p className={styles.weixinsearch}>请在微信中搜索“仓盟中介服务系统”</p>
            <p className={styles.open}>打开小程序协同办公吧~</p>
          </div>
        }
        {/*重复加入  3*/}

        {
          this.state.style==3&&<div>
            <img  className={styles.biglogo}  style={{width: '1.08rem',height: '1.08rem'}} src='http://work-portal.oss-cn-hangzhou.aliyuncs.com/cangmengbiglogo.png' />
            <p className={styles.titletop}><span  style={{color:'#FF324A'}}>{usrParm[0]}</span>邀请你加入</p>
            <p className={styles.titleBottom}>{usrParm[4]}</p>
            <p className={styles.joinus}>您已加入此公司，无需重复加入</p>
            <p className={styles.rejectus}>如有疑问，请联系管理员</p>
          </div>
        }
        {/*拒绝*/}

        {
          this.state.style==4&&<div>
            <img  className={styles.biglogo}  style={{width: '1.08rem',height: '1.08rem'}} src='http://work-portal.oss-cn-hangzhou.aliyuncs.com/cangmengbiglogo.png' />
            <p className={styles.titletop}><span  style={{color:'#FF324A'}}>{usrParm[0]}</span>邀请你加入</p>
            <p className={styles.titleBottom}>{usrParm[4]}</p>
            <p className={styles.joinus}>您已拒绝邀请，若需要加入仓盟协同办公</p>
            <p className={styles.rejectus}>请联系管理员</p>
          </div>
        }

      </div>
    );
  }
}


export default connect(({ Invitation, loading }) => ({ Invitation, loading }))(Form.create()(Invitation))
