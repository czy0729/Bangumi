/*
 * @Author: czy0729
 * @Date: 2019-02-21 20:36:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-10 14:23:48
 */
import { AsyncStorage } from 'react-native'

/**
 * 保存数据
 * @version 190321 1.0
 * @param {*} key
 */
export async function setStorage(key, data) {
  if (!key) {
    return false
  }
  return AsyncStorage.setItem(key, JSON.stringify(data))
}

/**
 * 读取数据
 * @version 190321 1.0
 * @param {*} key
 */
export async function getStorage(key) {
  if (!key) {
    return null
  }
  const data = await AsyncStorage.getItem(key)
  return Promise.resolve(JSON.parse(data))
}

/**
 * url字符串化
 * @version 190221 1.0
 * @param {*} data
 * @param {*} encode
 */
export function urlStringify(data, encode = true) {
  if (!data) return ''

  const arr = Object.keys(data).map(
    key => `${key}=${encode ? encodeURIComponent(data[key]) : data[key]}`
  )
  return arr.join('&')
}

/**
 * 补零
 * @version 190301 1.0
 * @param {*} n
 * @param {*} c
 */
export function pad(n) {
  return Number(n) < 10 ? `0${n}` : n
}

/**
 * 睡眠
 * @version 180417 1.0
 * @return {Promise}
 */
export function sleep(ms = 1600) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 和PHP一样的时间戳格式化函数
 * @version 160421 1.0
 * @version 170104 1.1 变得可以省略format
 * @param  {String} format    格式化格式
 * @param  {Int}    timestamp 时间戳
 * @return {String}
 */
/* eslint-disable */
export function date(format, timestamp) {
  // 假如第二个参数不存在，第一个参数作为timestamp
  if (!timestamp) {
    timestamp = format
    format = 'Y-m-d H:i:s'
  }

  let jsdate = timestamp ? new Date(timestamp * 1000) : new Date()
  let txt_weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  let txt_ordin = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    21: 'st',
    22: 'nd',
    23: 'rd',
    31: 'st'
  }
  let txt_months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  let f = {
    d: function() {
      return pad(f.j(), 2)
    },
    D: function() {
      t = f.l()
      return t.substr(0, 3)
    },
    j: function() {
      return jsdate.getDate()
    },
    l: function() {
      return txt_weekdays[f.w()]
    },
    N: function() {
      return f.w() + 1
    },
    S: function() {
      return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
    },
    w: function() {
      return jsdate.getDay()
    },
    z: function() {
      return (
        ((jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 86400000) >> 0
      )
    },
    W: function() {
      let a = f.z(),
        b = 364 + f.L() - a
      let nd2,
        nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1
      if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
        return 1
      } else {
        if (a <= 2 && nd >= 4 && a >= 6 - nd) {
          nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31')
          return date('W', Math.round(nd2.getTime() / 1000))
        } else {
          return (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0
        }
      }
    },
    F: function() {
      return txt_months[f.n()]
    },
    m: function() {
      return pad(f.n(), 2)
    },
    M: function() {
      t = f.F()
      return t.substr(0, 3)
    },
    n: function() {
      return jsdate.getMonth() + 1
    },
    t: function() {
      let n
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L()
      } else {
        if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
          return 31
        } else {
          return 30
        }
      }
    },
    L: function() {
      let y = f.Y()
      return !(y & 3) && (y % 100 || !(y % 400)) ? 1 : 0
    },
    Y: function() {
      return jsdate.getFullYear()
    },
    y: function() {
      return (jsdate.getFullYear() + '').slice(2)
    },
    a: function() {
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function() {
      return f.a().toUpperCase()
    },
    B: function() {
      let off = (jsdate.getTimezoneOffset() + 60) * 60
      let theSeconds =
        jsdate.getHours() * 3600 +
        jsdate.getMinutes() * 60 +
        jsdate.getSeconds() +
        off
      let beat = Math.floor(theSeconds / 86.4)
      if (beat > 1000) {
        beat -= 1000
      }
      if (beat < 0) {
        beat += 1000
      }
      if (String(beat).length == 1) {
        beat = '00' + beat
      }
      if (String(beat).length == 2) {
        beat = '0' + beat
      }
      return beat
    },
    g: function() {
      return jsdate.getHours() % 12 || 12
    },
    G: function() {
      return jsdate.getHours()
    },
    h: function() {
      return pad(f.g(), 2)
    },
    H: function() {
      return pad(jsdate.getHours(), 2)
    },
    i: function() {
      return pad(jsdate.getMinutes(), 2)
    },
    s: function() {
      return pad(jsdate.getSeconds(), 2)
    },
    O: function() {
      let t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4)
      if (jsdate.getTimezoneOffset() > 0) {
        t = '-' + t
      } else {
        t = '+' + t
      }
      return t
    },
    P: function() {
      let O = f.O()
      return O.substr(0, 3) + ':' + O.substr(3, 2)
    },
    c: function() {
      return (
        f.Y() +
        '-' +
        f.m() +
        '-' +
        f.d() +
        'T' +
        f.h() +
        ':' +
        f.i() +
        ':' +
        f.s() +
        f.P()
      )
    },
    U: function() {
      return Math.round(jsdate.getTime() / 1000)
    }
  }
  return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
    let ret = ''
    if (t != s) {
      ret = s
    } else {
      if (f[s]) {
        ret = f[s]()
      } else {
        ret = s
      }
    }
    return ret
  })
}
/* eslint-enable */

/**
 * IOS8601时间转换
 * @param {*} isostr
 */
export function parseIOS8601(isostr, format = 'Y-m-d') {
  if (!isostr) return ''

  const parts = isostr.match(/\d+/g)
  const timestamp =
    new Date(
      `${parts[0]}-${parts[1]}-${parts[2]} ${parts[3]}:${parts[4]}:${parts[5]}`
    ).getTime() / 1000
  return date(format, timestamp)
}

/**
 * 返回timestamp
 * @version 170814 1.0
 * @version 181107 1.1
 * @param  {String} date  指定时间，例2018/11/11 00:00:00
 * @return {Int}    时间戳
 */
export function getTimestamp(date) {
  if (date) {
    return Math.floor(new Date(date).valueOf() / 1000)
  }
  return Math.floor(new Date().valueOf() / 1000)
}

/**
 * 数组分组
 * @param {*} arr
 * @param {*} num
 */
export function arrGroup(arr, num = 40) {
  const allData = []
  let currData = []

  for (let i = 0; i < arr.length; i += 1) {
    currData.push(arr[i])
    if ((i != 0 && (i + 1) % num == 0) || i == arr.length - 1) {
      allData.push(currData)
      currData = []
    }
  }

  return allData
}

/**
 * 首字母大写
 * @param {*} str
 */
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

/**
 * 颜色过渡
 * @param {*} startColor
 * @param {*} endColor
 * @param {*} step
 */
export function gradientColor(startRGB, endRGB, step) {
  const startR = startRGB[0]
  const startG = startRGB[1]
  const startB = startRGB[2]
  const endR = endRGB[0]
  const endG = endRGB[1]
  const endB = endRGB[2]
  const sR = (endR - startR) / step // 总差值
  const sG = (endG - startG) / step
  const sB = (endB - startB) / step

  const colorArr = []
  for (let i = 0; i < step; i += 1) {
    // 计算每一步的hex值
    const rgb = `rgb(${parseInt(sR * i + startR)}, ${parseInt(
      sG * i + startG
    )}, ${parseInt(sB * i + startB)})`
    colorArr.push(rgb)
  }
  return colorArr
}

/**
 * HTML反转义
 * @param {*} str
 */
export function HTMLDecode(str = '') {
  if (str.length === 0) {
    return ''
  }
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    // eslint-disable-next-line quotes
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
}
