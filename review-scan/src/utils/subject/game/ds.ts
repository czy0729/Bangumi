/*
 * @Author: czy0729
 * @Date: 2022-09-13 21:03:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-22 20:20:05
 */
import { DATA_ALPHABET } from '@constants/constants'
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

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
  '生存',
  '体育',
  '沙箱',
  '开放世界',
  '竞速',
  '竞技',
  '即时战略',
  '俯视角',
  '卡牌',
  'MMO',
  '3D',
  '派对',
  '潜入',
  'Roguelike',
  'VR',
  '体感',
  '健身',
  '塔防',
  '建造',
  'MOBA',
  '弹幕',
  'AR',
  '桌面',
  '2D',
  '横版',
  '养成'
] as const

export const GAME_CATE_MAP = Object.fromEntries(
  GAME_CATE.map((item, index) => [item, index])
) as Record<(typeof GAME_CATE)[number], number>

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
  'Gust Co. Ltd.',
  'EA',
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
  'FromSoftware',
  'tri-Ace',
  'CyberConnect2',
  'Kojima Productions',
  'KID',
  'PlatinumGames',
  'SNK',
  'Square',
  'Monolith Soft',
  'DICE',
  'Bethesda',
  'AQUAPLUS',
  'DOMO Studio',
  'Kadokawa Games',
  'JAPAN Studio',
  'Acquire',
  'Otomate',
  'Tamsoft'
] as const

export const GAME_DEV_MAP = Object.fromEntries(
  GAME_DEV.map((item, index) => [item, index])
) as Record<(typeof GAME_DEV)[number], number>

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
  'Atlus',
  'Marvelous',
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

export const GAME_PUB_MAP = Object.fromEntries(
  GAME_PUB.map((item, index) => [item, index])
) as Record<(typeof GAME_PUB)[number], number>

export const GAME_SORT = [
  '发行',
  '排名',
  '评分人数',
  '外网评分',
  '外网热度',
  '随机',
  '名称'
] as const
