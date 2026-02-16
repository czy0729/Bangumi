/*
 * @Author: czy0729
 * @Date: 2022-09-13 21:03:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-22 20:31:42
 */
import { DATA_ALPHABET } from '@constants/constants'
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

export const ADV_FIRST = DATA_ALPHABET

export const ADV_YEAR = ANIME_YEAR

export const ADV_COLLECTED = ANIME_COLLECTED

export const ADV_DEV = [
  '戯画',
  'ensemble',
  'Whirlpool',
  'あざらしそふと',
  'HOOKSOFT',
  'あかべぇそふとすりぃ',
  'Lump of Sugar',
  'Campus',
  'PULLTOP',
  'BISHOP',
  'みなとそふと',
  'アストロノーツ・シリウス',
  'WAFFLE',
  'Guilty',
  'アトリエかぐや BARE＆BUNNY',
  'プレカノ',
  'Liar-soft',
  'KID',
  'あかべぇそふとつぅ',
  'Navel',
  'エスクード',
  'SMEE',
  'ASa Project',
  'クレージュエース',
  '夜のひつじ',
  'ANIM.teamMM',
  'Miel',
  'エウシュリー',
  'ALICESOFT',
  'SAGA PLANETS',
  'CUBE',
  'Front Wing',
  'ANIM Mother＆Wife',
  'qureate',
  'minori',
  'アパタイト',
  'CLOCKUP',
  'Argonauts',
  'ねこねこソフト',
  'feng',
  'CIRCUS',
  'ALcot',
  'ゆずソフト',
  'エルフ',
  'CYCLET',
  'アンモライト',
  'ZION',
  'CRYSTALiA',
  'Key',
  '工画堂スタジオ',
  'âge',
  'Purple Software',
  'FAVORITE',
  'すたじお緑茶',
  'ALcotハニカム',
  'light',
  'Frill',
  'MOONSTONE',
  'Waffle',
  'ぱじゃまエクスタシー',
  'Lusterise',
  'Lass Pixy',
  'Norn',
  'アトリエかぐや Honky-Tonk Pumpkin'
] as const

export const ADV_DEV_MAP = Object.fromEntries(
  ADV_DEV.map((item, index) => [item, index])
) as Record<(typeof ADV_DEV)[number], number>

export const ADV_SORT = ['发行', '排名', '评分人数', '随机', '名称'] as const

export const ADV_PLAYTIME = ['超长', '长', '中', '短', '超短', '不明'] as const

export const ADV_PLAYTIME_MAP = {
  超短: 1,
  短: 2,
  中: 3,
  长: 4,
  超长: 5
} as const

export const ADV_CN = ['有', '无'] as const
