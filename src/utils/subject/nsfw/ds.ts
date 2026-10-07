/*
 * @Author: czy0729
 * @Date: 2024-07-19 21:21:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-22 05:16:16
 */
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

/** 类型, 经 MODEL_SUBJECT_TYPE 映射为 Item.t */
export const NSFW_TYPE = ['动画', '书籍', '游戏'] as const

/**
 * 标签筛选 (三类型合并计数 top100, 下标即 bin 的 tg)
 *  - 类型词 (里番 / Galgame / 成年コミック…) / 平台词 / R18 已剔除, 同义标签归并
 *  - 与 web/standalone/nsfw/scan.js 同步维护, 重建后如有变化需同步此表
 */
export const NSFW_TAGS = [
  'ADV',
  '拔作',
  'BL',
  'RPG',
  '黄油',
  '同人',
  '纯爱',
  '巨乳',
  '已完结',
  'NTR',
  '萝莉',
  '3D',
  '合集',
  '后宫',
  '無修正',
  '原创',
  'TL',
  'SLG',
  '韩漫',
  '人妻',
  '调教',
  '工口',
  '恋爱',
  '凌辱',
  '动态CG',
  '妹',
  'HRPG',
  '百合',
  '游戏性',
  '乙女',
  '连载中',
  '小说改',
  'JK',
  '漫画改',
  '触手',
  '扶她',
  '幼驯染',
  '熟女',
  'ERO-RPG',
  '校园',
  'ACT',
  '废萌',
  'FD',
  '姐',
  '2.5D',
  '母系',
  'ERO-ADV',
  '猎奇',
  '催眠',
  '伪娘',
  '游戏改',
  '搞笑',
  '年上',
  'GAL改',
  '悬疑',
  '妊娠',
  '恶堕',
  '乱交',
  '女仆',
  'ERO-GAL',
  '日漫',
  '官能',
  '重口',
  'ERO-SLG',
  '奇幻',
  '黑丝',
  '巫女',
  '兄妹',
  '幼女',
  '妹控',
  '露出',
  '条漫',
  '休闲',
  '三角恋',
  '鬼畜',
  '黑长直',
  '像素',
  '母女丼',
  '实妹',
  '人外',
  '肛交',
  '痴女',
  '女性向',
  '战斗',
  '魔法少女',
  'milky',
  '性转',
  '纸质书',
  'webtoon',
  '漫画系列',
  '双飞',
  'SM',
  '女性视角',
  '女装',
  '抖m',
  '狂气',
  '贫乳',
  '治愈',
  '竹子社',
  'alicesoft'
] as const

/** 年份筛选, 复用动画年份列表 */
export const NSFW_YEAR = ANIME_YEAR

/** 收藏筛选, 复用动画 */
export const NSFW_COLLECTED = ANIME_COLLECTED

/** 排序, 顺序即筛选组展示顺序 */
export const NSFW_SORT = ['排名', '评分人数', '上映时间', '随机'] as const
