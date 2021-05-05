/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-05 16:43:19
 */
let game = []

/**
 * 初始化文库数据
 */
export async function init() {
  if (!game.length) {
    game = require('@constants/json/thirdParty/game.min.json')
  }
  return true
}

export function find(id) {
  init()
  return unzip(game.find(item => item.id == id))
}

/**
 * 转换压缩数据的key名
 * @param {*} item
 *
 * {
 *   t: '碧蓝幻想Versus',
 *   l: 13,
 *   s: 'グランブルーファンタジー ヴァーサス',
 *   vs: 8.1,
 *   vc: 102,
 *   ta: ['格斗', '角色扮演'],
 *   la: ['简中'],
 *   d: ['Arc System Works'],
 *   p: ['Cygames', 'SEGA'],
 *   pl: ['PS4', 'PC'],
 *   cn: '2020-02-06',
 *   en: '2020-02-06',
 *   id: 269406,
 *
 *   // 可能没有的键值, 使用默认值
 *   sc: 6.5,
 *   r: 4023
 * }
 */
export function unzip(item = {}) {
  return {
    id: item.id || 0,
    length: item.l || 0,
    title: item.t || '',
    sub: item.s || '',
    tag: item.ta || [],
    lang: item.lg || [],
    dev: item.d || [],
    publish: item.p || [],
    platform: item.pl || [],
    time: item.en || '',
    timeCn: item.cn || '',
    score: item.sc || 0,
    rank: item.r || 0,
    vid: item.v || 0,
    vgScore: item.vs || 0,
    vgCount: item.vc || 0
  }
}
