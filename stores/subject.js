/*
 * 条目
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-15 15:19:19
 */
import { observable, computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { API_SUBJECT, API_SUBJECT_EP, API_CALENDAR } from '@constants/api'
import { HTML_SUBJECT, HTML_SUBJECT_COMMENTS } from '@constants/html'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'

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

class Subject extends store {
  state = observable({
    subject: {},
    subjectFormHTML: {},
    subjectEp: {},
    subjectCommentsFormHTML: LIST_EMPTY,
    calendar: []
  })

  async init() {
    const res = Promise.all([
      this.getStorage('subject'),
      this.getStorage('subjectFormHTML'),
      this.getStorage('subjectEp'),
      this.getStorage('calendar')
    ])
    const state = await res
    this.setState({
      subject: state[0],
      subjectFormHTML: state[1],
      subjectEp: state[2],
      calendar: state[3] || []
    })

    return res
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
   * 取条目信息
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
   * 取条目吐槽
   * @param {*} subjectId
   */
  getSubjectCommentsFormHTML(subjectId) {
    return computed(
      () => this.state.subjectCommentsFormHTML[subjectId] || LIST_EMPTY
    ).get()
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
   * 分析网页获取条目信息 (高流量, 80k左右1次)
   * @param {*} subjectId
   */
  async fetchSubjectFormHTML(subjectId) {
    const res = fetchHTML({
      url: HTML_SUBJECT(subjectId)
    })
    const htmlRaw = await res
    const html = htmlRaw.replace(/\s+/g, '')

    // 标签
    const tags = []
    const tagsHTML = html.match(
      /<divclass="subject_tag_section">(.+?)<\/div><divid="panelInterestWrapper">/
    )
    if (tagsHTML) {
      const _tags = tagsHTML[1]
        .match(/class="l"><span>(.+?)<\/span>/g)
        .map(item => item.replace(/class="l"><span>|<\/span>/g, ''))
      const _counts = tagsHTML[1]
        .match(/<smallclass="grey">(.+?)<\/small>/g)
        .map(item => item.replace(/<smallclass="grey">|<\/small>/g, ''))
      _tags.forEach((item, index) => {
        tags.push({
          name: item,
          count: _counts[index]
        })
      })
    }

    // 关联条目
    const relations = []
    const relationsHTML = html.match(
      /<h2class="subtitle">关联条目<\/h2><\/div><divclass="content_inner"><ulclass="browserCoverMediumclearit">(.+?)<\/ul>/
    )
    if (relationsHTML) {
      const _relations = []
      relationsHTML[1]
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
          relations
        }
      }
    })
    this.setStorage(key)
    return res
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
   * 分析网页获取留言 (高流量, 30k左右1次)
   * @param {*} subjectId
   * @param {*} refresh 是否重新获取
   */
  async fetchSubjectCommentsFormHTML({ subjectId }, refresh) {
    const { list, pagination } = this.getSubjectCommentsFormHTML(subjectId)

    // 计算下一页的页码
    let page
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: HTML_SUBJECT_COMMENTS(subjectId, page)
    })
    const rawHTML = await res
    const html = rawHTML.replace(/\s+/g, '')
    const commentsHTML = html.match(
      /<divid="comment_box">(.+?)<\/div><\/div><divclass="section_lineclear">/
    )

    // -------------------- 分析HTML --------------------
    const comments = []
    let { pageTotal = 0 } = pagination
    if (commentsHTML) {
      /**
       * 总页数
       * @tucao 晕了, 至少有三种情况, 其实在第一页的时候获取就足够了
       * [1] 超过10页的, 有总页数
       * [2] 少于10页的, 需要读取最后一个分页按钮获取页数
       * [3] 只有1页, 没有分页按钮
       */
      if (page === 1) {
        const pageHTML =
          html.match(
            /<spanclass="p_edge">\(&nbsp;\d+&nbsp;\/&nbsp;(\d+)&nbsp;\)<\/span>/
          ) ||
          html.match(
            /<ahref="\?page=\d+"class="p">(\d+)<\/a><ahref="\?page=2"class="p">&rsaquo;&rsaquo;<\/a>/
          )
        if (pageHTML) {
          // eslint-disable-next-line prefer-destructuring
          pageTotal = pageHTML[1]
        } else {
          pageTotal = 1
        }
      }

      // 留言
      const items = commentsHTML[1].split('<divclass="itemclearit">')
      items.shift()
      items.forEach(item => {
        const userid = item.match(
          /<divclass="text"><ahref="\/user\/(.+?)"class="l">/
        )
        const username = item.match(/"class="l">(.+?)<\/a><smallclass="grey"/)
        const avatar = item.match(/background-image:url\('(.+?)'\)"><\/span>/)
        const time = item.match(/<smallclass="grey">@(.+?)<\/small>/)
        const star = item.match(/sstars(.+?)starsinfo/)
        const comment = item.match(/<p>(.+?)<\/p>/)
        comments.push({
          userid: userid[1],
          username: username[1],
          avatar: avatar[1],
          time: time[1],
          star: star ? star[1] : '',
          comment: comment[1]
        })
      })
    }

    // -------------------- 缓存 --------------------
    const key = 'subjectCommentsFormHTML'
    this.setState({
      [key]: {
        [subjectId]: {
          list: page === 1 ? comments : [...list, ...comments],
          pagination: {
            page,
            pageTotal: parseInt(pageTotal)
          },
          _loaded: true
        }
      }
    })
    this.setStorage(key)
    return res
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

export default new Subject()
