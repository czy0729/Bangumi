/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 */
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

/**
 * 标签筛选 (全量音乐条目出现次数 top100, 下标即 bin 的 t)
 *  - 与 web/standalone/music 的 rule.loadTags 同步维护, 重建后如有变化需同步此表
 */
export const MUSIC_TAGS = [
  'OST',
  '动画',
  'ED',
  '日本',
  '同人音乐',
  'OP',
  '专辑',
  '同人',
  'single',
  '東方',
  'Vocaloid',
  'anime',
  '角色歌',
  '游戏',
  'album',
  'CD',
  '乙女向',
  'drama',
  '单曲',
  'Drama',
  '2025',
  '2024',
  'ドラマCD',
  '2015',
  'Digital',
  '2016',
  '2014',
  '2017',
  '2013',
  'JPOP',
  '2018',
  '2023',
  'galgame',
  '东方',
  'dramaCD',
  'アニメ',
  'BLCD',
  '2012',
  '同人音樂',
  '2019',
  '2022',
  '电子',
  '2026',
  '2021',
  '2020',
  '2011',
  'RoDa',
  '乙女向けドラマCD',
  '石田彰',
  'IN',
  'OPED',
  '2010',
  'BLドラマ',
  '非全0',
  '电子音乐',
  'IM@S',
  '中国',
  'CS',
  '2009',
  '艺人专辑',
  '广播剧',
  '全0',
  'VOCAL',
  'VGM',
  'BLドラマCD',
  '2008',
  'GAME',
  'キャラソン',
  '初音ミク',
  '动漫主题曲',
  '动画歌曲',
  '2007',
  'BL',
  '音乐专辑',
  'trance',
  'EP',
  'R18',
  'hardcore',
  '歌い手',
  '8cm',
  'doujin',
  '居中',
  '2006',
  'CrSg',
  '歌曲',
  '東方project',
  '印象曲',
  '插入歌',
  '同人音楽',
  'Remix',
  '电音',
  'ゲーム',
  '原创',
  '2005',
  'lovelive',
  'アニソン',
  'ドラマ',
  'Falcom',
  'pop',
  'CR'
] as const

/**
 * 同一标签的不同写法 (中英日 / 大小写 / 近义), 筛选时同组成员互相命中
 *  - 与 GAME_DEV_ALIAS / ADV_DEV_ALIAS 同构
 *  - 只影响命中范围, 不影响展示与 bin 下标: MUSIC_TAGS 的顺序即 bin 的 t 下标, 不可增删或重排
 */
export const MUSIC_TAG_ALIAS = [
  ['同人音乐', '同人', 'doujin', '同人音楽', '同人音樂'],
  ['动画歌曲', '动漫主题曲', 'アニソン'],
  ['专辑', 'album', '音乐专辑'],
  ['电子', '电子音乐', '电音'],
  ['东方', '東方'],
  ['游戏', 'GAME', 'ゲーム'],
  ['drama', 'Drama', 'ドラマ'],
  ['single', '单曲'],
  ['印象曲', '插入歌']
] as const

/** 年份筛选, 复用动画年份列表 */
export const MUSIC_YEAR = ANIME_YEAR

/** 收藏筛选, 复用动画 */
export const MUSIC_COLLECTED = ANIME_COLLECTED

/** 排序, 顺序即筛选组展示顺序 */
export const MUSIC_SORT = ['排名', '评分人数', '发行时间', '随机'] as const
