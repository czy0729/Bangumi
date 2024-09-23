/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:48:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-23 07:56:56
 */
import { pick } from '@utils'
import { gets } from '@utils/kv'
import { SubjectId } from '@types'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchAnime = async (subjectId: SubjectId) => {
    if (!subjectId) return

    const key = `age_${subjectId}`
    if (!subjectId || key in this.state.anime) return

    const datas = await gets([key])
    if (datas) {
      const key = 'anime'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  onAnimePage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.animeSubjectId(index)
      const key = `age_${subjectId}`
      if (!subjectId || key in this.state.anime) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'anime'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = pick(item, [
            'id',
            'ageId',
            'image',
            'cn',
            'jp',
            'ep',
            'type',
            'status',
            'begin',
            'tags',
            'official',
            'origin',
            'score',
            'rank',
            'total'
          ])
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  fetchGame = async (subjectId: SubjectId) => {
    if (!subjectId) return

    const key = `game_${subjectId}`
    if (!subjectId || key in this.state.game) return

    const datas = await gets([key])
    if (datas) {
      const key = 'game'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  onGamePage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.gameSubjectId(index)
      const key = `game_${subjectId}`
      if (!subjectId || key in this.state.game) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'game'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  onADVPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.advSubjectId(index)
      const key = `adv_${subjectId}`
      if (!subjectId || key in this.state.game) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'adv'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  onMangaPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.mangaSubjectId(index)
      const key = `mox_${subjectId}`
      if (!subjectId || key in this.state.manga) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'manga'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = pick(item, [
            'id',
            'mid',
            'title',
            'ep',
            'author',
            'status',
            'cates',
            'publish',
            'update',
            'hot',
            'score',
            'rank',
            'total',
            'image',
            'end'
          ])
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  onWenkuPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.wenkuSubjectId(index)
      const key = `wk8_${subjectId}`
      if (!subjectId || key in this.state.wenku) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'wenku'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  onHentaiPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.hentaiSubjectId(index)
      const key = `hentai_${subjectId}`
      if (!subjectId || key in this.state.hentai) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'hentai'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  onNSFWPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.nsfwSubjectId(index)
      const key = `nsfw_${subjectId}`
      if (!subjectId || key in this.state.nsfw) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'nsfw'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }
}
