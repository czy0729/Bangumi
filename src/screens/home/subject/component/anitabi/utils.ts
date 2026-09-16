/*
 * @Author: czy0729
 * @Date: 2026-09-16 23:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 00:11:40
 *
 * anitabi (取景地标) 图片地址纠正
 *
 * 第三方接口 https://api.anitabi.cn/bangumi/{id}/lite 的 litePoints[].image 把 query 分隔符
 * 写成了 & (如 .../points/xxx.webp&plan=h160, 而同一响应的 cover 字段却是正常的 ?plan=h160),
 * 服务端对畸形地址直接返回 520, 图片必然加载失败并按既有策略反复退避重试。
 *
 * 畸形地址已被写入本地 state 与云端快照, 故在消费侧纠正一次, 即可同时覆盖
 * 「新拉取 / 本地 state / 云端快照」三种来源, 无需做数据迁移。
 * */

/**
 * 畸形 query 判据: 已知图片扩展名后紧跟 &
 *  - 必须收紧到「无 ? 且扩展名后紧跟 &」, 不能无差别替换 &:
 *    否则会破坏路径自带的 &、合法多参数地址 (a=1&b=2) 与其它非 anitabi 地址
 *  - 只认紧跟在扩展名之后的那个 &, 故 .../x.jpg/thumb&plan=h160 这类地址不会被改写
 *  - 幂等的保证在函数内的 `?` 提前返回处 (纠正后含 ?, 再次调用不再命中)
 * */
const MANGLED_QUERY = /(\.(?:jpe?g|png|webp|gif|avif|bmp))&/i

/**
 * 纠正 anitabi 点位图片地址的畸形 query 分隔符 (& → ?)
 *  - 只替换紧跟在图片扩展名之后的那个 &, 其余参数分隔符保持原样
 *  - 非字符串 / 空值 / 已含 ? / 无扩展名 & 一律原样返回
 * */
export function fixAnitabiImageUrl<T>(url: T): T
export function fixAnitabiImageUrl(url: unknown) {
  if (typeof url !== 'string' || !url) return url

  // 已含 ? 说明 query 分隔符正常 (同时保证本函数幂等)
  if (url.includes('?')) return url

  return url.replace(MANGLED_QUERY, '$1?')
}
