/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:47:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 07:09:31
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
    this.init('anime', true)

    return computed(() => {
      return (this.state.anime[`age_${subjectId}`] || {}) as AnimeItem
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
    return computed(() => {
      return (this.state.manga[`mox_${subjectId}`] || {}) as MangaItem
    }).get()
  }

  gameSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = gamePick(pickIndex)
      return item?.i || 0
    }).get()
  }

  game(subjectId: SubjectId): GameItem {
    this.init('game', true)
    return computed((): GameItem => {
      return (this.state.game[`game_${subjectId}`] || {}) as GameItem
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
    return computed(() => {
      return (this.state.adv[`adv_${subjectId}`] || {}) as ADVItem
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
    return computed(() => {
      return (this.state.wenku[`wk8_${subjectId}`] || {}) as WenkuItem
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
    return computed(() => {
      return (this.state.hentai[`hentai_${subjectId}`] || {}) as HentaiItem
    }).get()
  }

  nsfwSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = nsfwPick(pickIndex)
      return item?.i || 0
    }).get()
  }

  nsfw(subjectId: SubjectId) {
    this.init('nsfw', true)

    return computed(() => {
      return (this.state.nsfw[`nsfw_${subjectId}`] || {}) as NSFWItem
    }).get()
  }
}
