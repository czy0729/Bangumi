/*
 * @Author: czy0729
 * @Date: 2026-11-18 05:25:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 14:55:01
 *
 * 真值包类型桥: mobx/dist/index.js 无自带声明, 转接到官方 mobx.d.ts
 * (声明体内的 'mobx' 走常规 node 解析到真包类型; tsconfig 未映射 'mobx', 无自环)
 */
declare module 'mobx/dist/index.js' {
  export * from 'mobx'
}
