/*
 * @Author: czy0729
 * @Date: 2022-09-13 21:03:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-23 05:31:27
 */
import { DATA_ALPHABET } from '@constants/constants'
import { ANIME_COLLECTED, ANIME_YEAR } from './../anime'

export const ADV_FIRST = DATA_ALPHABET

export const ADV_YEAR = ANIME_YEAR

export const ADV_COLLECTED = ANIME_COLLECTED

export const ADV_DEV = [
  '戯画',
  'あざらしそふと',
  'Key',
  'ALICESOFT',
  'SMEE',
  'minori',
  'あかべぇそふとすりぃ',
  'ensemble',
  'Campus',
  'アトリエかぐや',
  'あかべぇそふとつぅ',
  'ぱれっと',
  'CUBE',
  'Whirlpool',
  'Front Wing',
  'ASa Project',
  'HOOKSOFT',
  'Liar-soft',
  'FAVORITE',
  'Circus',
  'シルキーズプラス',
  'エウシュリー',
  'PULLTOP',
  'Innocent Grey',
  'Navel',
  'NEKO WORKs',
  'DiGination',
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
  'まどそふと',
  'CRYSTALiA',
  'プレカノ'
] as const

const ADV_DEV_MAP = {}
ADV_DEV.forEach((item, index) => {
  ADV_DEV_MAP[item] = index
})

export { ADV_DEV_MAP }

export const ADV_SORT = ['发行', '排名', '评分人数', '随机', '名称'] as const
