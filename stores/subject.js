/*
 * 条目
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-09 19:38:43
 */
import { observable, computed } from 'mobx'
import {
  API_SUBJECT,
  API_HTML_SUBJECT,
  API_SUBJECT_EP,
  API_CALENDAR
} from '@constants/api'
import { fetchHTML } from '@utils/fetch'
import common from './common'

const initSubjectItem = {
  air_date: '',
  air_weekday: '',
  blog: null,
  collection: {},
  crt: [],
  eps: [],
  eps_count: '',
  id: '',
  images: {},
  name: '',
  name_cn: '',
  rank: '',
  rating: {
    count: {},
    score: '',
    total: ''
  },
  staff: [],
  summary: '',
  topic: [],
  type: '',
  url: ''
}
const initSubjectFormHTMLItem = {
  tags: [], // 标签
  counts: [], // 标签的数目
  relations: [] // 关联条目
}

class Subject extends common {
  state = observable({
    subject: {},
    subjectFormHTML: {},
    subjectEp: {},
    calendar: []
  })

  async init() {
    this.setState({
      subject: await this.getStorage('subject'),
      subjectFormHTML: await this.getStorage('subjectFormHTML'),
      subjectEp: await this.getStorage('subjectEp'),
      calendar: (await this.getStorage('calendar')) || []
    })
  }

  // -------------------- get --------------------
  /**
   * 取条目信息
   * @param {*} subjectId
   */
  getSubject(subjectId) {
    return computed(
      () => this.state.subject[subjectId] || initSubjectItem
    ).get()
  }

  /**
   * 取爬取网页的条目信息
   * @param {*} subjectId
   */
  getSubjectFormHTML(subjectId) {
    return computed(
      () => this.state.subjectFormHTML[subjectId] || initSubjectFormHTMLItem
    ).get()
  }

  /**
   * 取章节数据
   * @param {*} subjectId
   */
  getSubjectEp(subjectId) {
    return computed(() => this.state.subjectEp[subjectId] || {}).get()
  }

  /**
   * 取每日放送
   */
  @computed get calendar() {
    return this.state.calendar
  }

  // -------------------- fetch --------------------
  /**
   * 条目信息
   * @param {*} subjectId
   */
  fetchSubject(subjectId) {
    return this.fetch(
      {
        url: API_SUBJECT(subjectId),
        data: {
          responseGroup: 'large'
        },
        info: '条目信息'
      },
      ['subject', subjectId],
      {
        storage: true
      }
    )
  }

  /**
   * 爬取网页获取条目信息 (高流量, 80k左右1次)
   * @param {*} subjectId
   */
  async fetchSubjectFormHTML(subjectId) {
    const htmlRaw = await fetchHTML({
      url: API_HTML_SUBJECT(subjectId)
    })
    const html = htmlRaw.replace(/\s+/g, '')

    // 标签
    let tags = []
    let counts = []
    const tagsHtml = html.match(
      /<divclass="subject_tag_section">(.+?)<\/div><divid="panelInterestWrapper">/g
    )[0]
    if (tagsHtml) {
      tags = tagsHtml
        .match(/<span>(.+?)<\/span>/g)
        .map(tag => tag.replace(/<span>|<\/span>/g, ''))
      counts = tagsHtml
        .match(/<smallclass="grey">(.+?)<\/small>/g)
        .map(tag => tag.replace(/<smallclass="grey">|<\/small>/g, ''))
    }

    // 关联条目
    const relations = []
    const relationsHtml = html.match(
      /<h2class="subtitle">关联条目<\/h2><\/div><divclass="content_inner"><ulclass="browserCoverMediumclearit">(.+?)<\/ul>/
    )
    if (relationsHtml) {
      const _relations = []
      relationsHtml[1]
        .split('<liclass="sep">')
        .filter(item => !!item)
        .forEach(item =>
          _relations.push({
            type: item.match(/<spanclass="sub">(.+?)<\/span>/)[1],
            title: item
              .match(/"class="title">(.+?)<\/a><\/li>/g)
              .map(item => item.replace(/"class="title">|<\/a><\/li>/g, '')),
            image: item
              .match(/background-image:url\('(.+?)'\)"><\/span>/g)
              .map(item =>
                item.replace(/background-image:url\('|'\)"><\/span>/g, '')
              ),
            url: item
              .match(/<\/a><ahref="(.+?)"class="title">/g)
              .map(item => item.replace(/<\/a><ahref="|"class="title">/g, ''))
          })
        )

      _relations.forEach(item => {
        item.title.forEach((i, idx) => {
          relations.push({
            type: item.type,
            id: item.url[idx].replace('/subject/', ''),
            title: i,

            // 排除空白图片
            image:
              item.image[idx] === '/img/no_icon_subject.png'
                ? ''
                : `https:${item.image[idx]}`,
            url: item.url[idx]
          })
        })
      })
    }

    const key = 'subjectFormHTML'
    this.setState({
      [key]: {
        [subjectId]: {
          tags,
          counts,
          relations
        }
      }
    })
    this.setStorage(key)
  }

  /**
   * 章节数据
   * @param {*} subjectId
   */
  fetchSubjectEp(subjectId) {
    return this.fetch(
      {
        url: API_SUBJECT_EP(subjectId),
        info: '章节数据'
      },
      ['subjectEp', subjectId],
      {
        storage: true
      }
    )
  }

  /**
   * 每日放送
   */
  fetchCalendar() {
    return this.fetch(
      {
        url: API_CALENDAR(),
        info: '每日放送'
      },
      'calendar',
      {
        storage: true
      }
    )
  }
}

const Store = new Subject()
Store.init()

export default Store
