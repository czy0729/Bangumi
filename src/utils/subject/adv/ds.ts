/*
 * @Author: czy0729
 * @Date: 2022-09-13 21:03:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 19:50:45
 */
import { DATA_ALPHABET } from '@constants/data'
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

/** 名称首字, 复用动画字母表 */
export const ADV_FIRST = DATA_ALPHABET

/** 年份筛选, 复用动画年份列表 */
export const ADV_YEAR = ANIME_YEAR

/** 收藏筛选, 复用动画 */
export const ADV_COLLECTED = ANIME_COLLECTED

export const ADV_DEV = [
  'アパタイト',
  'Miel',
  'オトメイト',
  '戯画',
  'WAFFLE',
  'Norn',
  'ディーゼルマイン',
  'アトリエさくら',
  'TinkerBell',
  'CIRCUS',
  'ALICESOFT',
  'わるきゅ～れ',
  'CLOCKUP',
  'Black Lilith',
  'softhouse-seal',
  'でぼの巣製作所',
  'Design Factory',
  'Liar-soft',
  'ルネ',
  'HOOKSOFT',
  'ensemble',
  'Devil-seal',
  'Front Wing',
  'Triangle',
  'Guilty',
  'BISHOP',
  'フェアリーテール',
  'light',
  'エレクトリップ',
  'アンモライト',
  'エスクード',
  'Whirlpool',
  'ANIM',
  'BABEL',
  'MAGES.',
  'アイル【チーム・Riva】',
  'Studio e.go!',
  'アトリエさくら Team.NTR',
  'Liquid',
  'Purple Software',
  'ZION',
  'Navel',
  'Black Cyc',
  'カクテル・ソフト',
  'Dual Tail',
  'クレージュエース',
  'あざらしそふと',
  'エウシュリー',
  'シルキーズ',
  'Lilith',
  'Leaf',
  'Pin-Point',
  '工画堂スタジオ',
  'KID',
  '極フェロ',
  'ミンク',
  'U･Me SOFT',
  'エルフ',
  'FlyingShine',
  'Lusterise',
  'CYCLET',
  '07th Expansion',
  'PULLTOP',
  'SAGA PLANETS',
  'SMEE',
  'Rejet',
  'ソフトハウスキャラ',
  'BaseSon',
  '夜のひつじ',
  'アパダッシュ',
  'Key',
  '私立さくらんぼ小学校',
  'bootUP!',
  'ASa Project',
  'あかべぇそふとすりぃ',
  'スピンドル',
  '平安亭',
  'minori',
  'アリスソフト',
  'ねこねこソフト',
  'Lump of Sugar',
  'つるみく',
  'マリン',
  'HEAT-SOFT',
  'WendyBell',
  'Parthenon（パルテノン）',
  'CHAOS-R',
  'F&C・FC01',
  'ANIM.teamMM',
  'MAIKA',
  '桃源郷',
  'ソフトさ～くるクレージュ',
  'Casket',
  'あかべぇそふとつぅ',
  'FAVORITE',
  'D.O.',
  'ILLUSION(Dreams)',
  'TRYSET',
  'プレカノ',
  'âge',
  'ぱれっと',
  'MOONSTONE',
  'QuinRose',
  'ザウス',
  'ブルーゲイル',
  'エロイット',
  'Winged Cloud',
  'TRYSET Break',
  'qureate',
  '株式会社ブリッジ',
  'みなとそふと',
  'げーせん18',
  'ZyX',
  'RUNE',
  'May-Be SOFT',
  'アトリエかぐや Honky-Tonk Pumpkin',
  'コンプリーツ',
  '裸足少女',
  'Campus',
  'スタジオ奪',
  'CRYSTALiA',
  'PIL',
  'ALcot',
  'honeybee',
  'ヒューネックス株式会社',
  'LiLiM',
  'ivory',
  'POISON',
  'ZERO',
  'M no VIOLET',
  'インターハート',
  'RED-ZONE',
  'アトリエかぐや BARE＆BUNNY',
  'BLACK PACKAGE',
  'ニトロプラス',
  'Nitro+',
  'TYPE-MOON',
  '5pb.',
  'KONAMI',
  'AXL',
  'ALcotハニカム',
  'ういんどみる',
  'はむはむソフト',
  'PeasSoft',
  'シーズウェア',
  'アトリエかぐや TEAM HEARTBEAT',
  'ALL-TiME',
  '黒雛',
  'MBS TRUTH',
  'アストロノーツ・シリウス',
  '桃色劇場',
  'デジタルGパワー',
  'アンダーリップ',
  '4H',
  'エンターグラム',
  'ぱじゃまソフト',
  '日本一ソフトウェア',
  'LiLiM DARKNESS',
  'sprite',
  'ま〜まれぇど'
] as const

/** 名 → 序号 (1-based: bin 的 d 存 index + 1, 0/缺席 = 无开发商, 规避 proto3 默认值 0 不可编码的问题) */
export const ADV_DEV_MAP = Object.fromEntries(
  ADV_DEV.map((item, index) => [item, index + 1])
) as Record<(typeof ADV_DEV)[number], number>

/** 同一开发商的不同写法, 筛选时同组成员互相命中 */
export const ADV_DEV_ALIAS = [
  ['ALICESOFT', 'アリスソフト'],
  ['Nitro+', 'ニトロプラス'],
  ['RUNE', 'ルネ']
] as const

export const ADV_SORT = ['发行', '排名', '评分人数', '随机', '名称'] as const

/** 时长档位 */
export const ADV_PLAYTIME = ['超长', '长', '中', '短', '超短', '不明'] as const

/** 时长档位 → Item.t; 「不明」无对应值, 由 Item.t 缺席表示 */
export const ADV_PLAYTIME_MAP = {
  超短: 1,
  短: 2,
  中: 3,
  长: 4,
  超长: 5
} as const

/** 是否有汉化 */
export const ADV_CN = ['有', '无'] as const
