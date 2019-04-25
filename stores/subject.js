/*
 * 条目
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-23 17:16:58
 */
import { observable, computed } from 'mobx'
import { HOST, LIST_EMPTY } from '@constants'
import { API_SUBJECT, API_SUBJECT_EP } from '@constants/api'
import { HTML_SUBJECT, HTML_SUBJECT_COMMENTS } from '@constants/html'
import { date } from '@utils'
import { HTMLTrim, HTMLToTree, findTreeNode, HTMLDecode } from '@utils/html'
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
  url: '',
  _loaded: false
}
const initSubjectFormHTMLItem = {
  tags: [], // 标签
  relations: [], // 关联条目
  _loaded: false
}

class Subject extends store {
  state = observable({
    subject: {
      // [subjectId]: initSubjectItem
    },
    subjectFormHTML: {
      // [subjectId]: initSubjectFormHTMLItem
    },
    subjectEp: {
      // [subjectId]: {}
    },
    subjectCommentsFormHTML: {
      // [subjectId]: LIST_EMPTY
    }
  })

  async init() {
    const res = Promise.all([
      this.getStorage('subject'),
      this.getStorage('subjectFormHTML'),
      this.getStorage('subjectEp'),
      this.getStorage('subjectCommentsFormHTML')
    ])
    const state = await res
    this.setState({
      subject: state[0],
      subjectFormHTML: state[1],
      subjectEp: state[2],
      subjectCommentsFormHTML: state[3]
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 取条目信息
   * @param {*} subjectId
   */
  subject(subjectId) {
    return computed(
      () => this.state.subject[subjectId] || initSubjectItem
    ).get()
  }

  /**
   * 取条目信息
   * @param {*} subjectId
   */
  subjectFormHTML(subjectId) {
    return computed(
      () => this.state.subjectFormHTML[subjectId] || initSubjectFormHTMLItem
    ).get()
  }

  /**
   * 取章节数据
   * @param {*} subjectId
   */
  subjectEp(subjectId) {
    return computed(() => this.state.subjectEp[subjectId] || {}).get()
  }

  /**
   * 取条目吐槽
   * @param {*} subjectId
   */
  subjectCommentsFormHTML(subjectId) {
    return computed(
      () => this.state.subjectCommentsFormHTML[subjectId] || LIST_EMPTY
    ).get()
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
    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: HTML_SUBJECT(subjectId)
    })
    const raw = await res
    const HTML = HTMLTrim(raw)

    // -------------------- 分析HTML --------------------
    // 标签
    const tags = []
    const tagsHTML = HTML.match(
      /<\/h2><div class="inner">(.+?)<\/div><\/div><\/div><div id="panelInterestWrapper">/
    )
    if (tagsHTML) {
      const tree = HTMLToTree(tagsHTML[1])
      findTreeNode(tree.children, 'a > span|text', []).forEach(item => {
        tags.push({
          name: item.text[0]
        })
      })
      findTreeNode(tree.children, 'a > small|text&class=grey', []).forEach(
        (item, index) => {
          // eslint-disable-next-line prefer-destructuring
          tags[index].count = item.text[0]
        }
      )
    }

    // 关联条目
    const relations = []
    const relationsHTML = HTML.match(
      /<ul class="browserCoverMedium clearit">(.+?)<\/ul><\/div><\/div><div class="subject_section">/
    )
    if (relationsHTML) {
      const tree = HTMLToTree(relationsHTML[1])
      let typeIndex
      tree.children.forEach((item, index) => {
        // HTML项目是平铺的, 取前一个class=sub的type
        if (item.attrs.class === 'sep') {
          typeIndex = index
        }
        const type = tree.children[typeIndex].children[0].text[0]
        const id = item.children[2].attrs.href.replace('/subject/', '')
        const image = item.children[1].children[0].attrs.style.replace(
          /background-image:url\('|'\)/g,
          ''
        )
        relations.push({
          type,
          id,
          title: item.children[2].text[0],

          // 排除空白占位图片
          image: image === '/img/no_icon_subject.png' ? '' : image,
          url: `${HOST}/subject/${id}`
        })
      })
    }

    const key = 'subjectFormHTML'
    this.setState({
      [key]: {
        [subjectId]: {
          tags,
          relations,
          _loaded: date()
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
    const { list, pagination } = this.subjectCommentsFormHTML(subjectId)

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
    const raw = await res
    const html = raw.replace(/\s+/g, '')
    const commentsHTML = html.match(
      /<divid="comment_box">(.+?)<\/div><\/div><divclass="section_lineclear">/
    )

    // -------------------- 分析HTML --------------------
    // @todo 使用新的HTML解释函数重写
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
      items.forEach((item, index) => {
        const userId = item.match(
          /<divclass="text"><ahref="\/user\/(.+?)"class="l">/
        )
        const userName = item.match(/"class="l">(.+?)<\/a><smallclass="grey"/)
        const avatar = item.match(/background-image:url\('(.+?)'\)"><\/span>/)
        const time = item.match(/<smallclass="grey">@(.+?)<\/small>/)
        const star = item.match(/sstars(.+?)starsinfo/)
        const comment = item.match(/<p>(.+?)<\/p>/)
        comments.push({
          id: `${page}|${index}`,
          userId: userId[1],
          userName: HTMLDecode(userName[1]),
          avatar: avatar[1],
          time: time[1],
          star: star ? star[1] : '',
          comment: HTMLDecode(comment[1])
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
          _loaded: date()
        }
      }
    })
    this.setStorage(key)

    return res
  }
}

export default new Subject()
