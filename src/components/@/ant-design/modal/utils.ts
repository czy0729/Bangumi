/*
 * @Author: czy0729
 * @Date: 2026-01-24 06:42:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-01-24 06:42:03
 */

/** 若有后续样式返回数组否则返回第一参数 (用于防止组件重渲染) */
export function stl(...styles: any[]): any | any[] {
  const filteredStyles = styles.filter(Boolean)
  return filteredStyles.length === 1 ? filteredStyles[0] : filteredStyles
}
