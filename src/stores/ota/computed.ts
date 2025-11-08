/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:47:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-06 06:20:56
 */
import { computed } from 'mobx'
import { pick as advPick } from '@utils/subject/adv'
import { pick as animePick } from '@utils/subject/anime'
import { pick as gamePick } from '@utils/subject/game'
import { pick as hentaiPick } from '@utils/subject/hentai'
import { pick as mangaPick } from '@utils/subject/manga'
import { pick as nsfwPick } from '@utils/subject/nsfw'
import { pick as wenkuPick } from '@utils/subject/wenku'
import State from './state'

import type { UnzipItem as NSFWItem } from '@utils/subject/nsfw/types'
import type { StoreConstructor, SubjectId } from '@types'
import type { STATE } from './init'
import type { ADVItem, AnimeItem, GameItem, HentaiItem, MangaItem, WenkuItem } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  animeSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = animePick(pickIndex)
      return item?.i || 0
    }).get()
  }

  anime(subjectId: SubjectId) {
    const STATE_KEY = 'anime'
    this.init(STATE_KEY, true)

    return computed(() => {
      return (this.state[STATE_KEY][`age_${subjectId}`] || {}) as AnimeItem
    }).get()
  }

  mangaSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = mangaPick(pickIndex)
      return item?.i || 0
    }).get()
  }

  manga(subjectId: SubjectId) {
    this.init('manga', true)
    return computed<MangaItem>(() => {
      return this.state.manga[`mox_${subjectId}`] || {}
    }).get()
  }

  gameSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = gamePick(pickIndex)
      return item?.i || 0
    }).get()
  }

  game(subjectId: SubjectId) {
    this.init('game', true)
    return computed<GameItem>(() => {
      return this.state.game[`game_${subjectId}`] || {}
    }).get()
  }

  advSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = advPick(pickIndex)
      return item?.i || 0
    }).get()
  }

  adv(subjectId: SubjectId) {
    this.init('adv', true)
    return computed<ADVItem>(() => {
      return this.state.adv[`adv_${subjectId}`] || {}
    }).get()
  }

  wenkuSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = wenkuPick(pickIndex)
      return item?.i || 0
    }).get()
  }

  wenku(subjectId: SubjectId) {
    this.init('wenku', true)
    return computed<WenkuItem>(() => {
      return this.state.wenku[`wk8_${subjectId}`] || {}
    }).get()
  }

  hentaiSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = hentaiPick(pickIndex)
      return item?.id || 0
    }).get()
  }

  hentai(subjectId: SubjectId) {
    this.init('hentai', true)
    return computed<HentaiItem>(() => {
      return this.state.hentai[`hentai_${subjectId}`] || {}
    }).get()
  }

  nsfwSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = nsfwPick(pickIndex)
      return item?.i || 0
    }).get()
  }

  nsfw(subjectId: SubjectId) {
    const STATE_KEY = 'nsfw'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = `nsfw_${subjectId}`
      return (this.state[STATE_KEY][ITEM_KEY] || {}) as NSFWItem
    }).get()
  }
}
