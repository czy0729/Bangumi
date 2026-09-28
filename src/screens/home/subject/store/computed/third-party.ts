/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 第三方站点信息与标签 (动画 / 游戏 / 漫画 / 文库)
 */
import { computed } from 'mobx'
import { freeze } from '@utils'
import { extractDlsiteId, extractVndbId } from '@utils/thirdParty/dlsite-vndb'
import {
  getAnimeInfo,
  getAnimeTags,
  getGameInfo,
  getGameTags,
  getMangaInfo,
  getMangaTags,
  getWenkuInfo,
  getWenkuTags
} from '../utils'
import Base from './base'

import type { TagsItem } from '../../types'

/** 第三方站点派生数据 */
export default class ThirdPartyInfo extends Base {
  /** 第三方动画信息 */
  @computed get animeInfo() {
    const item = getAnimeInfo(this.type, this.subjectId)
    return item ? freeze(item) : null
  }

  /** 第三方动画标签 */
  @computed get animeTags() {
    const tags = getAnimeTags(this.subjectId, this.animeInfo)
    return tags ? freeze<TagsItem[]>(tags) : null
  }

  /** 第三方游戏信息 */
  @computed get gameInfo() {
    const item = getGameInfo(this.type, this.subjectId)
    return item ? freeze(item) : null
  }

  /** 第三方游戏标签 */
  @computed get gameTags() {
    const tags = getGameTags(this.gameInfo)
    return tags ? freeze<TagsItem[]>(tags) : null
  }

  /** ADV 类型游戏专用，VNDB ID (从 infobox 链接提取) */
  @computed get vndbId(): string | null {
    if (this.type !== '游戏') return null
    return extractVndbId(this.rawInfo)
  }

  /** ADV 类型游戏专用，DLsite ID (从 infobox 链接提取) */
  @computed get dlsiteId(): string | null {
    if (this.type !== '游戏') return null
    return extractDlsiteId(this.rawInfo)
  }

  /** ADV 类型游戏专用，是否有外部截图数据 */
  @computed get hasExternalScreenshots(): boolean {
    return !!(
      this.state.externalScreenshots.vndb.length || this.state.externalScreenshots.dlsite.length
    )
  }

  /** 第三方漫画信息 */
  @computed get mangaInfo() {
    const item = getMangaInfo(this.type, this.subjectId)
    return item ? freeze(item) : null
  }

  /** 第三方漫画标签 */
  @computed get mangaTags() {
    const tags = getMangaTags(this.mangaInfo)
    return tags ? freeze<TagsItem[]>(tags) : null
  }

  /** 第三方文库信息 */
  @computed get wenkuInfo() {
    const item = getWenkuInfo(this.type, this.subjectId)
    return item ? freeze(item) : null
  }

  /** 第三方文库标签 */
  @computed get wenkuTags() {
    const tags = getWenkuTags(this.wenkuInfo)
    return tags ? freeze<TagsItem[]>(tags) : null
  }
}
