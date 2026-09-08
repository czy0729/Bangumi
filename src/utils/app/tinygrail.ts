/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 小圣杯工具（ICO 等级计算、OSS 图片修正、时间格式化, 拆分自 app.ts）
 */

/** 小圣杯时间格式化 */
export function formatTime(time: string | number | Date) {
  let times = (+new Date(time) - +new Date()) / 1000
  let day = 0
  let hour = 0
  if (times > 0) {
    day = Math.floor(times / (60 * 60 * 24))
    hour = Math.floor(times / (60 * 60)) - day * 24
    if (day > 0) return `${day}天${hour}小时`
    if (hour >= 1) return `剩余${hour}小时`
    return '即将结束'
  }

  times = Math.abs(times)
  day = Math.floor(times / (60 * 60 * 24))
  hour = Math.floor(times / (60 * 60))
  const miniute = Math.floor(times / 60)
  const second = Math.floor(times)
  if (miniute < 1) return `${second}s ago`
  if (miniute < 60) return `${miniute}m ago`
  if (hour < 24) return `${hour}h ago`
  return `${day}d ago`
}

/**
 * 计算小圣杯 ICO 等级及相关数据
 * @param ico - ICO 数据对象
 * @param ico.users - 当前用户数
 * @param ico.total - 当前总资金
 * @param ico.Users - 备用用户数字段(兼容不同命名)
 * @returns ICO 等级信息对象
 */
export function calculateICO(ico: { users?: number; total?: number; Users?: number }) {
  // 初始化基础值
  let level = 0

  const initialPrice = 10
  let price = initialPrice

  const baseAmount = 10000
  let amount = 0

  const initialThreshold = 600000
  let nextThreshold = initialThreshold

  const baseUserCount = 15
  let nextUser = baseUserCount

  // 计算基于用户数的等级
  const currentUserCount = ico.users ?? 0
  const userLevel = Math.max(0, Math.floor((currentUserCount - 10) / 5))

  // 计算基于资金的等级
  const currentTotal = ico.total ?? 0
  while (currentTotal >= nextThreshold && level < userLevel) {
    level += 1
    nextThreshold += Math.pow(level + 1, 2) * 100000
  }

  // 计算最终值
  amount = baseAmount + (level - 1) * 7500
  price = Math.max(0, (currentTotal - 500000) / amount)
  nextUser = (level + 1) * 5 + 10

  return {
    level,
    next: nextThreshold,
    price,
    amount,
    nextUser,
    users: nextUser - (ico.Users ?? ico.users ?? 0)
  }
}

/**
 * 计算当前 ICO 数据在 step 步后的等级数据
 * @param ico 当前 ICO 数据
 * @param step 要计算的步数 (1=下一级，2=下两级，默认1)
 */
export function calculateFutureICO(
  ico: { users?: number; total?: number; Users?: number },
  step: number = 1
) {
  // 计算当前等级
  const current = calculateICO(ico)

  // 模拟升级到目标等级
  const targetLevel = current.level + step
  let targetNext = current.next
  const targetAmount = 10000 + (targetLevel - 1) * 7500

  // 计算中间所有等级的next阈值
  for (let l = current.level + 1; l <= targetLevel; l++) {
    targetNext += Math.pow(l + 1, 2) * 100000
  }

  // 计算目标等级的数据
  return {
    level: targetLevel,
    next: targetNext,
    price: (ico.total - 500000) / targetAmount,
    amount: targetAmount,
    nextUser: (targetLevel + 1) * 5 + 10,
    users: (targetLevel + 1) * 5 + 10 - (ico.Users ?? ico.users ?? 0)
  }
}

/** 计算当前角色距离升级的数据 */
export function calculateFutureLevel(level: number = 1, total: number = 0) {
  return Math.floor(!level || level <= 1 ? 7500 : Math.pow(1.3, level) * 7500) - total
}

/**
 * 小圣杯 OSS 修正
 *  - {HOST_BGM_STATIC}/pic/crt/g/b7/fe/88670_crt_Zv4H2.jpg -> {HOST_BGM_STATIC}/{r/200|400/}pic/crt/l/b7/fe/88670_crt_Zv4H2.jpg
 *  - https://tinygrail.oss-cn-hangzhou.aliyuncs.com -> https://tinygrail.mange.cn/cover/1e5f9be0dfe62372a69e9a4f04acd0e1.jpg!w150
 * */
export function tinygrailOSS(str: string, w: 120 | 150 | 480 = 120) {
  if (typeof str !== 'string') return str

  if (str.includes('lain.bgm.tv')) {
    let cover = str
      .replace(/lain.bgm.tv\/pic\/crt\/(g|s|c|m)\//, `lain.bgm.tv/pic/crt/l/`)
      .replace(/r\/\d+\//, '')
    cover = cover.includes('/user/')
      ? cover
      : w === 120
      ? cover.replace('/l/', '/g/')
      : cover.replace('pic/crt/', `r/200/pic/crt/`)
    if (cover.startsWith('//')) cover = `https:${cover}`
    return cover
  }

  if (str.includes('aliyuncs.com') || str.includes('tinygrail.mange.cn')) {
    return `${str
      .replace('tinygrail.oss-cn-hangzhou.aliyuncs.com', 'tinygrail.mange.cn')
      .replace(/!w\d+/g, '')}!w${w}`
  }

  return str
}

/** 修复时间 (2019-10-04T13:34:03.4243768+08:00 => 2019-10-04 13:34:03) */
export function tinygrailFixedTime(time?: string | null) {
  return (time || '').replace('T', ' ').split('+')[0].split('.')[0]
}
