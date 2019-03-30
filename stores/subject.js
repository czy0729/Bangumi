/*
 * 条目
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-28 18:14:04
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
    count: {}
  },
  staff: [],
  summary: '',
  topic: [],
  type: '',
  url: ''
}
const initSubjectItemFormHTML = {
  tags: [],
  count: []
}
const initCalendar = []

class Subject extends common {
  state = observable({
    subject: {},
    subjectFormHTML: {},
    subjectEp: {},
    calendar: initCalendar
  })

  async init() {
    this.setState({
      subject: await this.getStorage('subject'),
      subjectEp: await this.getStorage('subjectEp'),
      calendar: (await this.getStorage('calendar')) || initCalendar
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
  getSubjectFormHTML(subjectId) {
    return computed(
      () => this.state.subjectFormHTML[subjectId] || initSubjectItemFormHTML
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
   * 分析HTML获取条目信息
   * @param {*} subjectId
   */
  async fetchSubjectFormHTML(subjectId) {
    const html = await fetchHTML({
      url: API_HTML_SUBJECT(subjectId)
    })
    const tagsHtml = html
      .replace(/\s+/g, '')
      .match(
        /<divclass="subject_tag_section">(.+?)<\/div><divid="panelInterestWrapper">/g
      )[0]

    if (tagsHtml) {
      const tags = tagsHtml
        .match(/<span>(.+?)<\/span>/g)
        .map(tag => tag.replace(/<span>|<\/span>/g, ''))
      const counts = tagsHtml
        .match(/<smallclass="grey">(.+?)<\/small>/g)
        .map(tag => tag.replace(/<smallclass="grey">|<\/small>/g, ''))
      this.setState({
        subjectFormHTML: {
          [subjectId]: {
            tags,
            counts
          }
        }
      })
    }
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
