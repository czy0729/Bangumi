/*
 * @Author: czy0729
 * @Date: 2022-09-14 16:50:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-22 20:34:41
 */
import { DATA_ALPHABET } from '@constants/constants'
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

export const HENTAI_FIRST = DATA_ALPHABET

export const HENTAI_YEAR = ANIME_YEAR

export const HENTAI_COLLECTED = ANIME_COLLECTED

export const HENTAI_SORT = ['排名', '评分人数', '上映时间', '随机', '名称'] as const

/** 人物 */
export const HENTAI_CHARA = ['姐', '妹', '母', '人妻', '青梅竹马', '处女', '御姐', '熟女'] as const

/** 职业 */
export const HENTAI_JOB = [
  'JK',
  '运动少女',
  '大小姐',
  '老师',
  '女医护士',
  '女僕',
  '巫女',
  '修女',
  '偶像',
  'OL',
  '风俗娘',
  '公主',
  '女骑士',
  '魔法少女',
  '妖精',
  '魔物娘',
  '兽娘'
] as const

/** 外貌 */
export const HENTAI_BODY = [
  '巨乳',
  '贫乳',
  '黑皮肤',
  '眼镜娘',
  '泳装',
  '围裙',
  '黑丝袜',
  '和服',
  '兽耳',
  '碧池',
  '不良少女',
  '傲娇',
  '病娇',
  '伪娘',
  '扶他'
] as const

/** 剧情 */
export const HENTAI_CONTENT = [
  '自慰',
  '口交',
  '乳交',
  '肛交',
  '脚交',
  '腋下',
  '玩具',
  '触手',
  '内射',
  '颜射',
  '3P',
  '群交',
  '肉便器',
  '后宫',
  '公众场合',
  '近亲',
  '师生',
  'NTR',
  '怀孕',
  '喷奶',
  '放尿',
  '精神控制',
  '药物',
  '痴汉',
  '阿嘿颜',
  '精神崩溃',
  '鬼畜',
  'BDSM',
  '调教',
  '强制',
  '逆强制',
  '痴女',
  '女王样',
  '百合',
  '耽美',
  '性转换',
  '异世界',
  '异种族',
  '纯爱',
  '恋爱喜剧',
  '世界末日'
] as const

export const HENTAI_TAGS = [
  ...HENTAI_CHARA, // 0-7
  ...HENTAI_JOB, // 8-24
  ...HENTAI_BODY, // 25-39
  ...HENTAI_CONTENT // 40-80+
] as const

export const HENTAI_TAGS_MAP = Object.fromEntries(
  HENTAI_TAGS.map((item, index) => [item, index])
) as Record<(typeof HENTAI_TAGS)[number], number>
