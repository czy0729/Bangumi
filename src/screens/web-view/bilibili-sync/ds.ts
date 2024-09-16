/*
 * @Author: czy0729
 * @Date: 2022-04-28 11:48:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 14:32:10
 */
export const COMPONENT = 'BilibiliSync'

export const HOST_API = 'https://api.bgm.tv'

/** 存放请求缓存 */
export const LOADED = {}

/** 手动纠正 */
export const MEDIA_SUBJECT = {
  28220978: 1424, // 轻音少女 第一季
  28235244: 330973, // 陰陽眼見子
  28235419: 317042, // 理科生坠入情网，故尝试证明。 第二季
  28236365: 326868, // 天才王子的赤字國家重生術
  28236374: 333158, // 戀上換裝娃娃
  28236378: 323626, // SLOW LOOP-女孩的釣魚慢活-
  28236382: 341077, // 怪人開發部的黑井津小姐
  28236394: 344422, // 秘密內幕-女警的反擊
  28236424: 321825, // 相愛相殺
  28236579: 348666, // 川尻小玉的懒散生活
  3846: 35861 // 强袭魔女 OVA
} as const
