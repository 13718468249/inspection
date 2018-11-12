const protocol = location.protocol
const urlStr = location.hostname
const urlMain = 'inspector.myoilbank.com'
const urlist = urlStr.split('.')
const testhost = 'http://user.test.myoilbank.com'
const uathost = 'https://user9.myoilbank.com'
// 区分开发和生产环境
function checkEvn () {
  if (urlist.includes('localhost')) {
    return [setUrl('test'), '']
  }
  if (urlist.includes('test')) {
    return [setUrl('test'), testhost]
  }
  if (urlist.includes('uat')) {
    return [setUrl('uat'), uathost]
  }
  return [setUrl(), '']
}
// 拼接API地址
function setUrl (env = '') {
  let str = env ? env + '.' + urlMain : urlMain
  let net = [protocol, '//', str].join('')
  return net
}

// const siteUrl = checkEvn();
export default checkEvn()