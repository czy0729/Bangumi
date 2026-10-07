/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 */
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

/**
 * 标签筛选 (全量音乐条目出现次数 top100, 下标即 bin 的 t)
 *  - 已剔除年份标签, 同义标签 (大小写 / 繁简 / 日文新字体) 自动合并
 *  - 与 web/standalone/music 的 rule.loadTags 同步维护, 重建后如有变化需同步此表
 */
export const MUSIC_TAGS = [
  '同人音乐',
  '动画',
  'OST',
  'drama',
  '专辑',
  'single',
  '東方',
  'ED',
  'OP',
  '角色歌',
  'Vocaloid',
  'BLCD',
  '乙女向',
  '电子',
  '游戏',
  'JPOP',
  'IN',
  '动漫主题曲',
  'galgame',
  'IM@S',
  'OPED',
  'lovelive',
  '歌い手',
  '初音ミク',
  'trance',
  'R18',
  'EP',
  'hardcore',
  '摇滚',
  '印象曲',
  'Remix',
  '原创',
  'pop',
  '纯音乐',
  'Arrange',
  'jazz',
  'シチュボ',
  '高达',
  'house',
  '名探偵コナン',
  '治愈',
  'EDM',
  '偶像活动',
  '裏シチュ',
  'vtuber',
  '神曲',
  'バンドリ',
  'ラジオ',
  'DnB',
  '翻唱',
  'Techno',
  'ambient',
  '偶像大师百万现场',
  '秘封组',
  '手游',
  'ASMR',
  '燃',
  'プリキュア',
  '伊苏',
  'VOCAROCK',
  'Type-Moon',
  '古典',
  'FATE',
  '火影忍者',
  '萌え',
  '英雄传说',
  'FUNK',
  'Fusion',
  'テニスの王子様',
  'Shoegaze',
  '和风',
  '钢琴',
  'J-rock',
  '主题歌',
  'デジモン',
  'Aqours',
  '特摄',
  '漫画改',
  'Band',
  '艦これ',
  'Pop_rock',
  '声優ソング',
  'dubstep',
  'HipHop',
  '欧美',
  'power',
  '中井和哉',
  '大川透',
  '鏡音リン',
  '阿澄佳奈',
  'TV',
  '女声',
  '明日方舟',
  '民族调',
  'アキシブ系',
  '水瀬いのり',
  '海贼王',
  'DM',
  'μ’s',
  '中恵光城'
] as const

/** 年份筛选, 复用动画年份列表 */
export const MUSIC_YEAR = ANIME_YEAR

/**
 * 同义标签别名组 (组内任一标签命中即整组命中)
 *  - 大小写 / 繁简 / 日文新字体等同义已在数据侧归并, 此处仅留给无法自动归并的手动补充
 */
export const MUSIC_TAG_ALIAS: readonly (readonly string[])[] = []

/** 收藏筛选, 复用动画 */
export const MUSIC_COLLECTED = ANIME_COLLECTED

/** 分级筛选 (「全部」由通用筛选组提供, 点击时写入空串) */
export const MUSIC_NSFW = ['限制', '未知'] as const

/** 排序, 顺序即筛选组展示顺序 */
export const MUSIC_SORT = ['排名', '评分人数', '发行时间', '随机'] as const
