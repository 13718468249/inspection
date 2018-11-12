import Vue from 'vue'

/**
 * @desc 日期过滤器
 * @author hardy
 * @argument value
 * @argument type
 */
Vue.filter('fmtTime', function (inputTime) {
  if (inputTime === undefined || inputTime =="") {
    return ''
  }
  var date = new Date(inputTime)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  // var h = date.getHours()
  // h = h < 10 ? ('0' + h) : h
  // var minute = date.getMinutes()
  // // var second = date.getSeconds()
  // minute = minute < 10 ? ('0' + minute) : minute
  // second = second < 10 ? ('0' + second) : second
  return d + ' ' + m + ' ' + y
  // + ':' + second;
})

Vue.filter('fmtDate', function (inputTime) {
  if (inputTime === undefined || inputTime == "") {
    return ''
  }
  var date = new Date(inputTime)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  // var h = date.getHours()
  // h = h < 10 ? ('0' + h) : h
  // var minute = date.getMinutes()
  // // var second = date.getSeconds()
  // minute = minute < 10 ? ('0' + minute) : minute
  // second = second < 10 ? ('0' + second) : second
  return y + '/' + m + '/' + d
  // + ':' + second;
})

Vue.filter('transDate', function (inputTime) {
  if (inputTime === undefined || inputTime == "") {
    return ''
  }
  var date = new Date(inputTime)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  // var h = date.getHours()
  // h = h < 10 ? ('0' + h) : h
  // var minute = date.getMinutes()
  // // var second = date.getSeconds()
  // minute = minute < 10 ? ('0' + minute) : minute
  // second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d
  // + ':' + second;
})

Vue.filter('formtDate', function (inputTime) {
  if (inputTime === undefined || inputTime == "") {
    return ''
  }
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  var date = new Date(inputTime);
  var year = date.getFullYear();
  var y = year.substring(year.length() - 2, year.length());
  var index = date.getMonth();
  var m = months[index];
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  // var h = date.getHours()
  // h = h < 10 ? ('0' + h) : h
  // var minute = date.getMinutes()
  // // var second = date.getSeconds()
  // minute = minute < 10 ? ('0' + minute) : minute
  // second = second < 10 ? ('0' + second) : second
  return d + '-' + m + '-' + y
  // + ':' + second;
})

