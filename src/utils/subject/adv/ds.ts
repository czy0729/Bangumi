/*
 * @Author: czy0729
 * @Date: 2022-09-13 21:03:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 03:34:02
 */
import { DATA_ALPHABET } from '@constants/constants'
import { ANIME_YEAR } from './../anime'

export const ADV_FIRST = DATA_ALPHABET

export const ADV_YEAR = ANIME_YEAR

export const ADV_DEV = [
  '戯画',
  'あざらしそふと',
  'ALICESOFT',
  'SMEE',
  'Key',
  'minori',
  'あかべぇそふとすりぃ',
  'Campus',
  'アトリエかぐや',
  'ぱれっと',
  'Front Wing',
  'Liar-soft',
  'あかべぇそふとつぅ',
  'FAVORITE',
  'Circus',
  'CUBE',
  'シルキーズプラス',
  'ensemble',
  'Whirlpool',
  'エウシュリー',
  'PULLTOP',
  'Innocent Grey',
  'Navel',
  'NEKO WORKs',
  'ASa Project',
  'HOOKSOFT',
  'SAGA PLANETS',
  'Purple Software',
  'Sekai Project',
  'hibiki works',
  'きゃべつそふと',
  'Nitro+',
  'ねこねこソフト',
  'OVERDRIVE',
  'あっぷりけ',
  'ゆずソフト',
  'Lump of Sugar',
  'light',
  'ALcotハニカム',
  'ALcot',
  'DiGination',
  'プレカノ'
] as const

const ADV_DEV_MAP = {}
ADV_DEV.forEach((item, index) => {
  ADV_DEV_MAP[item] = index
})

export { ADV_DEV_MAP }

export const ADV_SORT = ['发行', '排名', '评分人数', '随机', '名称'] as const
