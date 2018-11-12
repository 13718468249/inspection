import host from './host'
const HOST = host[0]
const ACCHOST = host[1]

// const HOST = "http://10.26.8.142:8080/i"
export default {
  loginComf: HOST + '/getLoginUser', // 登录信息
  TASK: HOST + '/inspector/task/get.json',
  TASK_DET: HOST + '/inspector/transaction/get.json',
  REP_DET: HOST + '/inspector/report/getinfo.json',
  TEM_STORE: HOST + '/inspector/report/save.json',
  DET_SUBMIT: HOST + '/inspector/report/submit.json',
  REP_LIST: HOST + '/inspector/report/getlist.json',
  UPLOAD: HOST + '/inspector/BillsFile/insert.json',
  LOOK_UP: HOST + '/inspector/BillsFile/list.json',
  FJ_DEL: HOST + '/inspector/BillsFile/delete.json',
  QUERY_BILL: HOST + 'inspector/report/getBillno.json',
  USER_INFO: HOST + '/getLoginDataByUrl.json',
  ACC_INFO: ACCHOST + '/secure/center/safety.htm',
  ACC_SAFETY: ACCHOST + '/secure/center/setting.htm',
  MOD_CODE: ACCHOST + '/secure/center/reset/password.htm',
  SON_ACC: ACCHOST + '/secure/center/role/role_permission.htm',
  LOGIN_PAGE: HOST + '/login.html'
}
