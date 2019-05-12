/* eslint-disable prefer-destructuring */
/*
 * 条目
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-13 04:38:07
 */
import { observable, computed } from 'mobx'
import { HOST, LIST_EMPTY, LIST_LIMIT_COMMENTS } from '@constants'
import { API_SUBJECT, API_SUBJECT_EP } from '@constants/api'
import { HTML_SUBJECT, HTML_SUBJECT_COMMENTS, HTML_MONO } from '@constants/html'
import { getTimestamp } from '@utils'
import { HTMLTrim, HTMLToTree, findTreeNode, HTMLDecode } from '@utils/html'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { analysisComments } from './rakuen'

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
  friend: {
    score: 0, // 好友评分
    total: 0
  },
  typeNum: '', // eg. 291人想看 / 21人看过 / 744人在看 / 49人搁置 / 83人抛弃
  _loaded: false
}
const initMono = {
  name: '',
  nameCn: '',
  cover: '', // 封面
  info: '', // 简介
  detail: ''
}

class Subject extends store {
  state = observable({
    // 条目
    subject: {
      // [subjectId]: initSubjectItem
    },

    // 条目HTML
    subjectFormHTML: {
      // [subjectId]: initSubjectFormHTMLItem
    },

    // 条目章节
    subjectEp: {
      // [subjectId]: {}
    },

    // 条目吐槽箱
    subjectComments: {
      // [subjectId]: LIST_EMPTY
    },

    // 人物
    mono: {
      // [monoId]: initMono
    },

    // 人物吐槽箱
    monoComments: {
      // [monoId]: LIST_EMPTY | initMonoCommentsItem
    }
  })

  async init() {
    const res = Promise.all([
      this.getStorage('subject'),
      this.getStorage('subjectFormHTML'),
      this.getStorage('subjectEp'),
      this.getStorage('subjectComments'),
      this.getStorage('mono'),
      this.getStorage('monoComments')
    ])
    const state = await res
    this.setState({
      subject: state[0],
      subjectFormHTML: state[1],
      subjectEp: state[2],
      subjectComments: state[3],
      mono: state[4],
      monoComments: state[5]
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
  subjectComments(subjectId) {
    return computed(
      () => this.state.subjectComments[subjectId] || LIST_EMPTY
    ).get()
  }

  /**
   * 取人物信息
   * @param {*} monoId
   */
  mono(monoId) {
    return computed(() => this.state.mono[monoId] || initMono).get()
  }

  /**
   * 取人物信息吐槽
   * @param {*} monoId
   */
  monoComments(monoId) {
    return computed(() => this.state.monoComments[monoId] || LIST_EMPTY).get()
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
      findTreeNode(tree.children, 'a > span', []).forEach(item => {
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

    // 好友评分
    const friend = {
      ...initSubjectFormHTMLItem.friend
    }
    const friendHTML = HTML.match(/<div class="frdScore">(.+?)<\/div>/)
    if (friendHTML) {
      const tree = HTMLToTree(friendHTML[1])
      friend.score = tree.children[0].text[0]
      friend.total = tree.children[2].text[0].replace(' 人评分', '')
    }

    // 观看状态人数
    let typeNum = ''
    const typeNumHTML = HTML.match(
      /<span class="tip_i">\/(.+?)<\/span><\/div><\/div><div id="columnSubjectHomeB"/
    )
    if (typeNumHTML) {
      const tree = HTMLToTree(typeNumHTML[1])
      typeNum = findTreeNode(tree.children, 'div > a|text&class=l', [])
        .map(item => item.text[0])
        .join(' / ')
    }

    const key = 'subjectFormHTML'
    this.setState({
      [key]: {
        [subjectId]: {
          tags,
          relations,
          friend,
          typeNum,
          _loaded: getTimestamp()
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
   * @param {*} reverse 是否倒序
   */
  async fetchSubjectComments({ subjectId }, refresh, reverse = false) {
    const { list, pagination } = this.subjectComments(subjectId)

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
    const key = 'subjectComments'
    this.setState({
      [key]: {
        [subjectId]: {
          list: page === 1 ? comments : [...list, ...comments],
          pagination: {
            page,
            pageTotal: parseInt(pageTotal)
          },
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key)

    return res
  }

  /**
   * 人物信息和吐槽箱
   * 为了提高体验, 吐槽箱做模拟分页加载效果, 逻辑与超展开回复一致
   * @param {*} monoId
   */
  async fetchMono({ monoId }, refresh) {
    let res
    const monoKey = 'mono'
    const commentsKey = 'monoComments'
    const stateKey = monoId

    if (refresh) {
      // 重新请求
      res = _fetchMono({ monoId })
      const { mono, monoComments } = await res
      const _loaded = getTimestamp()

      // 缓存人物信息
      this.setState({
        [monoKey]: {
          [stateKey]: {
            ...mono,
            _loaded
          }
        }
      })
      this.setStorage(monoKey)

      // 缓存吐槽箱
      this.setState({
        [commentsKey]: {
          [stateKey]: {
            list: monoComments.slice(0, LIST_LIMIT_COMMENTS),
            pagination: {
              page: 1,
              pageTotal: Math.ceil(monoComments.length / LIST_LIMIT_COMMENTS)
            },
            _list: monoComments,
            _loaded
          }
        }
      })
      this.setStorage(commentsKey)
    } else {
      // 加载下一页留言
      const monoComments = this.monoComments(monoId)
      const page = monoComments.pagination.page + 1
      this.setState({
        [commentsKey]: {
          [stateKey]: {
            ...monoComments,
            list: monoComments._list.slice(0, LIST_LIMIT_COMMENTS * page),
            pagination: {
              ...monoComments.pagination,
              page
            }
          }
        }
      })
      this.setStorage(commentsKey)
    }

    return res
  }
}

export default new Subject()

async function _fetchMono({ monoId = 0 }) {
  // -------------------- 请求HTML --------------------
  const raw = await fetchHTML({
    url: `!${HTML_MONO(monoId)}`
  })
  const HTML = HTMLTrim(raw)

  // -------------------- 分析内容 --------------------
  let node

  // 人物信息
  const mono = {
    ...initMono
  }
  let monoComments = [] // 人物吐槽箱

  if (HTML) {
    const titleHTML = HTML.match(/<h1 class="nameSingle">(.+?)<\/h1>/)
    if (titleHTML) {
      const tree = HTMLToTree(titleHTML[1])
      node = findTreeNode(tree.children, 'a|text&title')
      if (node) {
        mono.name = node[0].text[0]
        mono.nameCn = node[0].attrs.title
      }
    }

    const coverHTML = HTML.match(/<img src="(.+?)" class="cover" \/>/)
    if (coverHTML) {
      mono.cover = coverHTML[1]
    }

    const infoHTML = HTML.match(/<ul id="infobox">(.+?)<\/ul>/)
    if (infoHTML) {
      mono.info = infoHTML[1]
    }

    const detailHTML = HTML.match(/<div class="detail">(.+?)<\/div>/)
    if (detailHTML) {
      mono.detail = detailHTML[1]
    }

    // 吐槽箱
    const commentHTML = HTML.match(
      /<div id="comment_list" class="commentList borderNeue">(.+?)<\/div><\/div><\/div><\/div><div/
    )
    monoComments = analysisComments(commentHTML)
  }

  return Promise.resolve({
    mono,
    monoComments
  })
}
