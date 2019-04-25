/* eslint-disable prefer-destructuring */
/* eslint-disable indent */
/*
 * 时空胶囊
 * @Author: czy0729
 * @Date: 2019-04-12 23:23:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-23 16:50:49
 */
import { observable, computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { HTML_TIMELINE } from '@constants/html'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants/model'
import { trim } from '@utils'
import { HTMLTrim, HTMLToTree, findTreeNode, HTMLDecode } from '@utils/html'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import userStore from './user'

const initScope = MODEL_TIMELINE_SCOPE.getValue('好友')
const initType = MODEL_TIMELINE_TYPE.getValue('全部')

class Timeline extends store {
  state = observable({
    timeline: {
      // `${scope}|${type}`: LIST_EMPTY
    }
  })

  async init() {
    const res = Promise.all([this.getStorage('timeline')])
    const state = await res
    this.setState({
      timeline: state[0]
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 时空胶囊
   * @param {*} scope 范围
   * @param {*} type 类型
   */
  timeline(scope = initScope, type = initType) {
    return computed(
      () => this.state.timeline[`${scope}|${type}`] || LIST_EMPTY
    ).get()
  }

  // -------------------- fetch --------------------
  /**
   * 获取时空胶囊
   * @todo 10个种类, 每个种类都有差别, 甚至出现分不清种类的情况, 影响较大时再优化
   */
  async fetchTimeline({ scope, type } = {}, refresh) {
    const { list, pagination } = this.timeline(scope, type)

    // 计算下一页的页码
    let page
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: HTML_TIMELINE(scope, type, userStore.myUserId, page)
    })
    const raw = await res
    const HTML = HTMLTrim(raw).match(
      /<div id="timeline">(.+?)<div id="tmlPager">/
    )

    // -------------------- 分析HTML --------------------
    const timeline = []
    if (HTML) {
      const isSelf = MODEL_TIMELINE_SCOPE.getLabel(scope) === '自己'
      const tree = HTMLToTree(HTML[1])
      let node

      // ---------- 日期分组
      const dates = findTreeNode(tree.children, 'h4', []).map(
        item => item.text[0]
      )

      // ---------- 项
      findTreeNode(tree.children, 'ul', []).forEach((item, index) => {
        findTreeNode(item.children, 'li', []).forEach((i, idx) => {
          const { children } = i

          /**
           * @issue 所有人的场景下, 数据变化非常快, 而且又没有任何手段去保证数据唯一
           * 所以每次获取id时, 先跟历史比较, 假如发现存在, 直接return
           */
          // ---------- id
          const id = `${page}|${i.attrs.id.replace('tml_', '')}`
          // if (list.findIndex(item => item.id === id) !== -1) {
          //   // 因为ListView对没分页列表判断的机制, 所以第1页不能return
          //   if (page !== 1) {
          //     return true
          //   }
          // }

          // 位置1, 通常是用户信息
          const p1 = {
            text: '',
            url: ''
          }
          // 位置2, 通常是动作
          const p2 = {
            text: ''
          }
          // 位置3, 通常是条目
          const p3 = {
            text: [],
            url: []
          }
          // 位置4, 通常是动作补充
          const p4 = {
            text: ''
          }

          // ---------- 头像
          const avatar = {
            src: '',
            url: ''
          }
          if (isSelf) {
            if (idx === 0) {
              // 一分组只有第一个才显示头像
              const {
                id,
                avatar: { small }
              } = userStore.userInfo
              avatar.src = small
              avatar.url = `https://bangumi.tv/user/${id}`
            }
          } else {
            node = findTreeNode(children, 'a > span|style~background')
            avatar.src = node
              ? node[0].attrs.style.replace(/background-image:url\('|'\)/g, '')
              : ''
            node = findTreeNode(children, 'a|class=avatar&href')
            avatar.url = node ? node[0].attrs.href : ''
          }

          // ---------- 位置1
          if (!isSelf) {
            node = findTreeNode(
              children,
              'a|text&class=l&href~://bangumi.tv/user/'
            )
            if (node) {
              p1.text = node[0].text[0]
              p1.url = node[0].attrs.href
            }
          }

          // ---------- 位置2, 位置4
          node = findTreeNode(children, 'span|text&class=info_full clearit')
          if (node) {
            p2.text = trim(node[0].text[0])
          }
          if (!p2.text) {
            const text = i.text.filter(item => item !== '、')
            p2.text = trim(text[0])
            p4.text = trim(text[1])
          }

          // ---------- 位置3: case 1 (条目, 角色, 人物, 小组, 目录, 天窗)
          node =
            findTreeNode(
              children,
              'a|text&class=l&href~://bangumi.tv/subject/'
            ) ||
            findTreeNode(
              children,
              'a|text&class=l&href~://bangumi.tv/character/'
            ) ||
            findTreeNode(
              children,
              'a|text&class=l&href~://bangumi.tv/person/'
            ) ||
            findTreeNode(
              children,
              'a|text&class=l&href~://bangumi.tv/group/'
            ) ||
            findTreeNode(
              children,
              'a|text&class=l&href~://bangumi.tv/index/'
            ) ||
            findTreeNode(
              children,
              'a|text&class=l&href~://doujin.bangumi.tv/subject/'
            ) ||
            []
          node.forEach(item => {
            if (item.text[0]) {
              p3.text.push(HTMLDecode(item.text[0]))
              p3.url.push(item.attrs.href)
            }
          })

          // 位置3: case 2 添加为好友
          // @issue 因为有2个一样结构的a造成混淆
          // 因部分吐槽只有p1用户名, 所以重复则跳过
          if (!node.length) {
            node = findTreeNode(
              children.reverse(),
              'a|text&class=l&href~://bangumi.tv/user/'
            )
            if (node && node[0].attrs.href !== p1.url) {
              p3.text.push(HTMLDecode(node[0].text[0]))
              p3.url.push(node[0].attrs.href)
            }
          }

          // ---------- 条目
          node = findTreeNode(
            children,
            'div > a|text&class=tip&href~://bangumi.tv/subject/'
          )
          const subject = node ? HTMLDecode(node[0].text[0]) : ''
          const subjectId = node
            ? node[0].attrs.href.replace('https://bangumi.tv/subject/', '')
            : 0

          // ---------- 时间
          node = findTreeNode(children, 'p|text&class=date')
          const time = node ? node[0].text[0] : ''

          // ---------- 评分
          node = findTreeNode(children, 'div > span|class~sstars')
          const star = node
            ? node[0].attrs.class.replace(/sstars| starsinfo/g, '')
            : ''

          // ---------- 评论 | 小组描述
          node =
            findTreeNode(children, 'div > div > q|text') ||
            findTreeNode(children, 'div > span|text&class=tip_j')
          const comment = node ? HTMLDecode(node[0].text[0]) : ''

          // ---------- 留言
          const reply = {
            content: '',
            count: '',
            url: ''
          }
          node = findTreeNode(children, 'p|text&class=status')
          if (node) {
            reply.content = HTMLDecode(node[0].text[0])

            // 把改名信息也纳入留言
            if (trim(node[0].text[1]) === '改名为') {
              node = findTreeNode(children, 'p > strong|text')
              if (node) {
                const name1 = node[0] ? HTMLDecode(node[0].text[0]) : ''
                const name2 = node[1] ? HTMLDecode(node[1].text[0]) : ''
                reply.content = `从 ${name1} 改名为 ${name2}`
              }
            }
          }
          node = findTreeNode(children, 'p > a|text&class=tml_comment l')
          if (node) {
            // 回复数
            reply.count = node[0].text[0]
            reply.url = node[0].attrs.href
          }

          // ---------- 图片
          const image = (
            findTreeNode(children, 'a > img|class=rr') ||
            findTreeNode(children, 'div > a > img|class=grid') ||
            []
          ).map(item => item.attrs.src)

          const data = {
            date: dates[index],
            id,
            avatar,
            p1,
            p2,
            p3,
            p4,
            subject,
            subjectId,
            time,
            star,
            comment,
            reply,
            image
          }
          timeline.push(data)
        })
      })
    }

    // -------------------- 缓存 --------------------
    const key = `${scope}|${type}`
    this.setState({
      timeline: {
        [key]: {
          list: page === 1 ? timeline : [...list, ...timeline],
          pagination: {
            page,
            pageTotal: timeline.length ? 100 : page // 页面没有分页信息
          },
          _loaded: true
        }
      }
    })
    this.setStorage('timeline')

    return res
  }

  // -------------------- action --------------------
}

export default new Timeline()
