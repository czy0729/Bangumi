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
  'OST', '同人音乐', '动画', 'ED',
  '日本', '東方', 'OP', 'drama',
  'anime', '专辑', '同人', 'single',
  'Vocaloid', '角色歌', 'ドラマCD', '游戏',
  'CD', 'album', '乙女向', '单曲',
  'JPOP', 'Digital', 'galgame', 'BLCD',
  '电子', 'RoDa', '乙女向けドラマCD', '石田彰',
  'IN', 'OPED', 'BLドラマ', '非全0',
  '电子音乐', 'IM@S', '中国', 'CS',
  '艺人专辑', '广播剧', '全0', 'VOCAL',
  '歌い手', 'VGM', 'BLドラマCD', 'lovelive',
  'GAME', 'キャラソン', '初音ミク', '动漫主题曲',
  '动画歌曲', 'BL', '音乐专辑', 'trance',
  'R18', 'EP', 'hardcore', '8cm',
  'doujin', '居中', '東方project', 'CrSg',
  '歌曲', '印象曲', '插入歌', 'Remix',
  '电音', 'ゲーム', '原创', 'アニソン',
  'Falcom', 'pop', 'CR', '梶浦由記',
  '堀江由衣', '鳥海浩輔', '摇滚', '纯音乐',
  '偶像大师', 'ACG', 'TM', '霜月はるか',
  'Arrange', 'jazz', '平川大輔', 'シチュボ',
  '森川智之', '动画电影', '黄金時代', '塞壬唱片-MSR',
  '插入曲', '高达', 'Song', 'house',
  '櫻井孝宏', '泽野弘之', 'bemani', '黑胶',
  '遊佐浩二', '原声集', '音乐', '电视剧'
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

/** 排序, 顺序即筛选组展示顺序 */
export const MUSIC_SORT = ['排名', '评分人数', '发行时间', '随机'] as const
