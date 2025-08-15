/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 10:54:49
 */
/** 命名空间 */
export const NAMESPACE = 'OTA'

export const STATE = {
  /** 找番剧 */
  anime: {
    age_0: {}
  },

  /** 找漫画 */
  manga: {
    mox_0: {}
  },

  /** 找游戏  */
  game: {
    game_0: {}
  },

  /** 找 ADV */
  adv: {
    adv_0: {}
  },

  /** 找文库 */
  wenku: {
    wk8_0: {}
  },

  /** @deprecated 找 Hentai */
  hentai: {
    hentai_0: {}
  },

  /** 找 NSFW */
  nsfw: {
    nsfw_0: {}
  }
}

export const LOADED = {
  anime: false,
  manga: false,
  game: false,
  adv: false,
  wenku: false,
  hentai: false,
  nsfw: false
}
