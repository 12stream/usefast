// 请求api地址 =
var hostRelease = "https://debug.locksuiyi.com/smartLock/"; 
var host = hostRelease;
var api = {
  getMessageUrl: `${host}/api/qrlock/qrUserLogin.do`,//获取短信
  checkMessageUrl: `${host}/api/qrlock/qrUsercheckVerify.do`,//验证短信
  scanCodeUrl: `${host}/api/qrlock/smallRoutineScanCode.do`,//二维码扫码
  roomMessageUrl:`${host}/house/getHouseInfoAndRoom.do`,//获取房源
  openLockApplyUrl: `${host}/api/apply/openLockApply.do`,//申请权限
  applyDetailUrl:`${host}/api/apply/applyDetail.do`,//申请详情
  lockApplyListUrl: `${host}/api/apply/lockApplyList.do` //申请列表
}
module.exports = api;
