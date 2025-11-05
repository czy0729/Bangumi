/*
 * @Author: czy0729
 * @Date: 2024-01-13 23:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 11:55:21
 */
export function getBgmHtml(html = '') {
  let _html = html
  const matchs = _html.match(/\(bgm\d+\)/g) || []
  if (matchs.length) {
    matchs.forEach(item => {
      const index = parseInt(item.match(/\d+/g)[0])

      // 防止 2 连同一个 bgm 表情, 替换不了后面的
      _html = _html.replace(item, `<img smileid alt="(bgm~~~${index})" />`)
    })
  }

  return _html.replace(/~~~/g, '')
}
