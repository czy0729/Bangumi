/*
 * @Author: czy0729
 * @Date: 2022-09-13 21:03:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-23 05:26:45
 */
import { DATA_ALPHABET } from '@constants/constants'
import { ANIME_COLLECTED, ANIME_YEAR } from './../anime'

export const GAME_FIRST = DATA_ALPHABET

export const GAME_YEAR = ANIME_YEAR

export const GAME_COLLECTED = ANIME_COLLECTED

export const GAME_PLATFORM = [
  'PC',
  'NS',
  'PS5',
  'PS4',
  'XSX|S',
  'XB1',
  'PS3',
  'PS2',
  'PSV',
  'PSP',
  '3DS',
  'NDS',
  'X360',
  'iOS',
  'Android',
  'GBA',
  'Wii',
  'WiiU',
  'PS',
  'Xbox',
  'Stadia',
  'SFC',
  'FC',
  'GBC',
  'GB',
  'DC',
  'NGC',
  'Saturn',
  'N64',
  'MD',
  'Arcade'
] as const

const GAME_PLATFORM_MAP = {}
GAME_PLATFORM.forEach((item, index) => {
  GAME_PLATFORM_MAP[item] = index
})

export { GAME_PLATFORM_MAP }

export const GAME_CATE = [
  '动作',
  '角色扮演',
  '冒险',
  '射击',
  '策略',
  '第三人称',
  '独立',
  '文字',
  '模拟',
  '主视角',
  '剧情',
  '平台',
  '解谜',
  '多人',
  '恐怖',
  '格斗',
  '回合制',
  '科幻',
  '音乐',
  '育成',
  '益智',
  '体育',
  '生存',
  '沙箱',
  '开放世界',
  '竞速',
  '竞技',
  '俯视角',
  '即时战略',
  '卡牌',
  'MMO',
  '派对',
  '3D',
  '潜入',
  'Roguelike',
  'VR',
  '体感',
  '健身',
  '塔防',
  'MOBA',
  '建造',
  '弹幕',
  'AR',
  '桌面',
  '2D',
  '横版',
  '养成'
] as const

const GAME_CATE_MAP = {}
GAME_CATE.forEach((item, index) => {
  GAME_CATE_MAP[item] = index
})

export { GAME_CATE_MAP }

export const GAME_DEV = [
  'Nintendo',
  'Bandai Namco',
  'CAPCOM',
  'Square Enix',
  'Ubisoft',
  'Koei Tecmo',
  'SEGA',
  'Konami',
  'Atlus',
  '日本一',
  'Nihon Falcom',
  'Game Freak',
  'EA',
  'Gust Co. Ltd.',
  'Omega Force',
  'Marvelous',
  'Intelligent Systems',
  'LEVEL-5',
  'Arc System Works',
  'Blizzard',
  'Sony Interactive Entertainment',
  '5pb.',
  'Team Ninja',
  'Spike Chunsoft',
  'Compile Heart',
  'Valve',
  'tri-Ace',
  'CyberConnect2',
  'KID',
  'FromSoftware',
  'PlatinumGames',
  'SNK',
  'Kojima Productions',
  'Square',
  'Monolith Soft',
  'DICE',
  'Bethesda',
  'AQUAPLUS',
  'DOMO Studio',
  'Kadokawa Games',
  'Acquire',
  'Otomate',
  'Tamsoft'
] as const

const GAME_DEV_MAP = {}
GAME_DEV.forEach((item, index) => {
  GAME_DEV_MAP[item] = index
})

export { GAME_DEV_MAP }

export const GAME_PUB = [
  'Nintendo',
  'Bandai Namco',
  'Square Enix',
  'Sony Interactive Entertainment',
  'CAPCOM',
  'SEGA',
  'Koei Tecmo',
  'EA',
  'Ubisoft',
  'Konami',
  'Marvelous',
  'Atlus',
  '日本一',
  '5pb.',
  'Kadokawa Games',
  'Nihon Falcom',
  'Bethesda',
  'Arc System Works',
  'Compile Heart',
  'LEVEL-5',
  'Spike Chunsoft',
  'Valve',
  'Blizzard',
  'SNK',
  'AQUAPLUS',
  'Square',
  'KID',
  'Gust Co. Ltd.',
  'FromSoftware',
  'Acquire',
  'Game Freak',
  'Otomate',
  'CyberConnect2'
] as const

const GAME_PUB_MAP = {}
GAME_PUB.forEach((item, index) => {
  GAME_PUB_MAP[item] = index
})

export { GAME_PUB_MAP }

export const GAME_SORT = [
  '发行',
  '排名',
  '评分人数',
  '外网评分',
  '外网热度',
  '随机',
  '名称'
] as const
