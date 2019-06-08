/* eslint-disable prefer-destructuring */
/*
 * 条目
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-09 02:28:48
 */
import { observable, computed } from 'mobx'
import { HOST, LIST_EMPTY, LIST_LIMIT_COMMENTS } from '@constants'
import { API_SUBJECT, API_SUBJECT_EP } from '@constants/api'
import {
  HTML_SUBJECT,
  HTML_SUBJECT_COMMENTS,
  HTML_EP,
  HTML_MONO
} from '@constants/html'
import { getTimestamp } from '@utils'
import { HTMLTrim, HTMLToTree, findTreeNode, HTMLDecode } from '@utils/html'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { analysisComments } from './rakuen'

const namespace = 'Subject'
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
  disc: [], // 曲目列表
  book: {}, // 书籍章节信息
  _loaded: false
}
const initMono = {
  name: '', // 日文名
  nameCn: '', // 中文名
  cover: '', // 封面
  info: '', // 简介
  detail: '', // 内容详情
  voice: [], // 最近演出角色
  workes: [], // 最近参与
  jobs: [] // 出演
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

    // 章节内容
    epFormHTML: {
      // [epId]: ''
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
      this.getStorage('subject', namespace),
      this.getStorage('subjectFormHTML', namespace),
      this.getStorage('subjectEp', namespace),
      this.getStorage('subjectComments', namespace),
      this.getStorage('mono', namespace),
      this.getStorage('monoComments', namespace)
    ])
    const state = await res
    this.setState({
      subject: state[0] || {},
      subjectFormHTML: state[1] || {},
      subjectEp: state[2] || {},
      subjectComments: state[3] || {},
      mono: state[4] || {},
      monoComments: state[5] || {}
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
   * 取章节内容
   * @param {*} epId
   */
  epFormHTML(epId) {
    return computed(() => this.state.epFormHTML[epId] || '').get()
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
        storage: true,
        namespace
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
    let matchHTML

    // 标签
    const tags = []
    matchHTML = HTML.match(
      /<\/h2><div class="inner">(.+?)<\/div><\/div><\/div><div id="panelInterestWrapper">/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
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
    matchHTML = HTML.match(
      /<ul class="browserCoverMedium clearit">(.+?)<\/ul><\/div><\/div><div class="subject_section">/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
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
    matchHTML = HTML.match(/<div class="frdScore">(.+?)<\/div>/)
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      friend.score = tree.children[0].text[0]
      friend.total = tree.children[2].text[0].replace(' 人评分', '')
    }

    // 观看状态人数
    let typeNum = ''
    matchHTML = HTML.match(
      /<span class="tip_i">\/(.+?)<\/span><\/div><\/div><div id="columnSubjectHomeB"/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      typeNum = findTreeNode(tree.children, 'div > a|text&class=l', [])
        .map(item => item.text[0])
        .join(' / ')
    }

    // 曲目列表(音乐)
    const disc = []
    matchHTML = HTML.match(/<ul class="line_list line_list_music">(.+?)<\/ul>/)
    if (matchHTML) {
      try {
        const tree = HTMLToTree(matchHTML[1])
        tree.children.forEach(item => {
          if (item.attrs.class === 'cat') {
            disc.push({
              title: item.text[0],
              disc: []
            })
          } else {
            const i = item.children[2].children[0]
            disc[disc.length - 1].disc.push({
              href: i.attrs.href,
              title: i.text[0]
            })
          }
        })
      } catch (e) {
        // do nothing
      }
    }

    // 书籍vol. chap.(需登录)
    const book = {}
    matchHTML = HTML.match(
      /<div class="panelProgress book clearit">(.+?)<\/div><div rel="v:rating">/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      const { children } = tree

      let node = findTreeNode(
        children,
        'div > form > div > input|name=watchedeps'
      )
      if (node) {
        book.chap = node[0].attrs.value
      }

      node = findTreeNode(
        children,
        'div > form > div > input|name=watched_vols'
      )
      if (node) {
        book.vol = node[0].attrs.value
      }
    }

    const key = 'subjectFormHTML'
    const data = {
      tags,
      relations,
      friend,
      typeNum,
      disc,
      book,
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [subjectId]: data
      }
    })
    this.setStorage(key, undefined, namespace)

    return Promise.resolve(data)
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
        storage: true,
        namespace
      }
    )
  }

  /**
   * 分析网页获取留言 (高流量, 30k左右1次)
   * @param {*} subjectId
   * @param {*} refresh 是否重新获取
   * @param {*} reverse 是否倒序
   */
  async fetchSubjectComments({ subjectId }, refresh, reverse) {
    const { list, pagination, _reverse } = this.subjectComments(subjectId)
    let page // 下一页的页码

    // @notice 倒序的实现逻辑: 默认第一次是顺序, 所以能拿到总页数
    // 点击倒序根据上次数据的总页数开始递减请求, 处理数据时再反转入库
    let isReverse = reverse
    if (!isReverse && !refresh) {
      isReverse = _reverse
    }

    if (isReverse) {
      if (refresh) {
        // @issue 官网某些条目留言不知道为什么会多出一页空白
        page = pagination.pageTotal - 1
      } else {
        page = pagination.page - 1
      }
    } else if (refresh) {
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
      let items = commentsHTML[1].split('<divclass="itemclearit">')
      items.shift()

      if (isReverse) {
        items = items.reverse()
      }
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
          userId: userId ? userId[1] : '',
          userName: userName ? HTMLDecode(userName[1]) : '',
          avatar: avatar ? avatar[1] : '',
          time: time ? time[1] : '',
          star: star ? star[1] : '',
          comment: comment ? HTMLDecode(comment[1]) : ''
        })
      })
    }

    // -------------------- 缓存 --------------------
    const key = 'subjectComments'
    this.setState({
      [key]: {
        [subjectId]: {
          list: refresh ? comments : [...list, ...comments],
          pagination: {
            page,
            pageTotal: parseInt(pageTotal)
          },
          _loaded: getTimestamp(),
          _reverse: isReverse
        }
      }
    })
    this.setStorage(key, undefined, namespace)
    return res
  }

  /**
   * 章节内容
   * @param {*} epId
   */
  async fetchEpFormHTML(epId) {
    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: `!${HTML_EP(epId)}`
    })
    const raw = await res
    const HTML = HTMLTrim(raw)

    // -------------------- 分析HTML --------------------
    const contentHTML = HTML.match(/<div class="epDesc">(.+?)<\/div>/)
    if (contentHTML) {
      this.setState({
        epFormHTML: {
          [epId]: contentHTML[0]
        }
      })
    }

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
      this.setStorage(monoKey, undefined, namespace)

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
      this.setStorage(commentsKey, undefined, namespace)
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
      this.setStorage(commentsKey, undefined, namespace)
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
  let matchHTML

  // 人物信息
  const mono = {
    ...initMono
  }
  let monoComments = [] // 人物吐槽箱

  if (HTML) {
    // 标题
    matchHTML = HTML.match(/<h1 class="nameSingle">(.+?)<\/h1>/)
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      node = findTreeNode(tree.children, 'a|text&title')
      if (node) {
        mono.name = node[0].text[0]
        mono.nameCn = node[0].attrs.title
      }
    }

    // 封面
    matchHTML = HTML.match(/<img src="(.+?)" class="cover" \/>/)
    if (matchHTML) {
      mono.cover = matchHTML[1]
    }

    // 各种详细
    matchHTML = HTML.match(/<ul id="infobox">(.+?)<\/ul>/)
    if (matchHTML) {
      mono.info = matchHTML[1]
    }

    // 详情
    matchHTML = HTML.match(/<div class="detail">(.+?)<\/div>/)
    if (matchHTML) {
      mono.detail = matchHTML[1]
    }

    // 最近演出角色
    mono.voice = []
    matchHTML = HTML.match(
      /<h2 class="subtitle">最近演出角色<\/h2><ul class="browserList">(.+?)<\/ul><a href=/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      tree.children.forEach(item => {
        const { children } = item

        node = findTreeNode(children, 'div > a|href&title')
        const href = node ? node[0].attrs.href : ''
        const name = node ? node[0].attrs.title : ''

        node = findTreeNode(children, 'div > div > h3 > p')
        const nameCn = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'div > a > img')
        const cover = node ? node[0].attrs.src : ''

        node = findTreeNode(children, 'ul > li > div > h3 > a|text&href')
        const subjectHref = node ? node[0].attrs.href : ''
        const subjectName = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > div > small')
        const subjectNameCn = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > div > span')
        const staff = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > a > img')
        const subjectCover = node ? node[0].attrs.src : ''

        mono.voice.push({
          href,
          name: HTMLDecode(name),
          nameCn: HTMLDecode(nameCn),
          cover,
          subjectHref,
          subjectName: HTMLDecode(subjectName),
          subjectNameCn: HTMLDecode(subjectNameCn),
          staff,
          subjectCover
        })
      })
    }

    // 最近参与
    mono.works = []
    matchHTML = HTML.match(
      /<h2 class="subtitle">最近参与<\/h2><ul class="browserList">(.+?)<\/ul><a href=/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      tree.children.forEach(item => {
        const { children } = item

        node = findTreeNode(children, 'div > a|href&title')
        const href = node ? node[0].attrs.href : ''
        const name = node ? node[0].attrs.title : ''

        node = findTreeNode(children, 'div > a > img')
        const cover = node ? node[0].attrs.src : ''

        node = findTreeNode(children, 'div > div > span')
        const staff = node ? node[0].text[0] : ''

        mono.works.push({
          href,
          name: HTMLDecode(name),
          cover,
          staff
        })
      })
    }

    // 出演
    mono.jobs = []
    matchHTML = HTML.match(
      /<h2 class="subtitle">出演<\/h2><ul class="browserList">(.+?)<\/ul><div class="section_line clear">/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      tree.children.forEach(item => {
        const { children } = item

        node = findTreeNode(children, 'div > div > h3 > a')
        const href = node ? node[0].attrs.href : ''
        const name = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'div > div > small')
        const nameCn = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'div > a > img')
        const cover = node ? node[0].attrs.src : ''

        node = findTreeNode(children, 'div > div > span')
        const staff = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > a')
        const cast = node ? node[0].attrs.title : ''
        const castHref = node ? node[0].attrs.href : ''

        node = findTreeNode(children, 'ul > li > div > small')
        const castTag = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > a > img')
        const castCover = node ? node[0].attrs.src : ''

        mono.jobs.push({
          href,
          name: HTMLDecode(name),
          nameCn,
          cover,
          staff,
          cast,
          castHref,
          castTag,
          castCover
        })
      })
    }

    // 吐槽箱
    matchHTML = HTML.match(
      /<div id="comment_list" class="commentList borderNeue">(.+?)<\/div><\/div><\/div><\/div><div/
    )
    monoComments = analysisComments(matchHTML)
  }

  return Promise.resolve({
    mono,
    monoComments
  })
}
