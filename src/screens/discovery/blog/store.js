/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:04:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-24 17:45:44
 */
import { observable, computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import store from '@utils/store'
import { x18s } from '@utils/app'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

export const tabs = [
  {
    title: '全部',
    key: 'all'
  },
  ...MODEL_SUBJECT_TYPE.data.map(item => ({
    title: item.title,
    key: item.label
  }))
]
const namespace = 'ScreenDiscoveryBlog'

export default class ScreenDiscoveryBlog extends store {
  state = observable({
    page: 0, // tab的page
    show: true, // 是否显示列表, 制造切页效果

    // 当前页数
    currentPage: {
      all: 1,
      anime: 1,
      book: 1,
      game: 1,
      music: 1,
      real: 1
    },

    // 输入框值
    ipt: {
      all: '1',
      anime: '1',
      book: '1',
      game: '1',
      music: '1',
      real: '1'
    },
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      show: true,
      _loaded: true
    })

    return this.fetchBlog()
  }

  // -------------------- fetch --------------------
  fetchBlog = () => {
    const { currentPage } = this.state
    return discoveryStore.fetchBlog({
      type: this.type,
      page: currentPage[this.type]
    })
  }

  // -------------------- get --------------------
  get type() {
    const { page } = this.state
    return tabs[page].key
  }

  blog(type) {
    const { currentPage } = this.state
    return computed(() => {
      const blog = discoveryStore.blog(type, currentPage[type])
      if (userStore.isLimit) {
        return {
          ...blog,
          list: blog.list.filter(item => !x18s(item.title))
        }
      }
      return blog
    }).get()
  }

  // -------------------- page --------------------
  onTabChange = page => {
    if (page === this.state.page) {
      return
    }

    t('全站日志.标签页切换')
    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { key } = tabs[page]
    const { _loaded } = this.blog(key)
    if (!_loaded) {
      this.fetchBlog()
    }
  }

  prev = () => {
    const { currentPage, ipt } = this.state
    const page = currentPage[this.type]
    if (currentPage[this.type] === 1) {
      return
    }

    t('全站日志.上一页', {
      type: this.type,
      page: page - 1
    })

    this.setState({
      show: false,
      currentPage: {
        ...currentPage,
        [this.type]: page - 1
      },
      ipt: {
        ...ipt,
        [this.type]: String(page - 1)
      }
    })
    this.fetchBlog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }

  next = () => {
    const { currentPage, ipt } = this.state
    const page = currentPage[this.type]
    t('全站日志.下一页', {
      type: this.type,
      page: page + 1
    })

    this.setState({
      show: false,
      currentPage: {
        ...currentPage,
        [this.type]: page + 1
      },
      ipt: {
        ...ipt,
        [this.type]: String(page + 1)
      }
    })
    this.fetchBlog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }

  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    const { ipt } = this.state
    this.setState({
      ipt: {
        ...ipt,
        [this.type]: text
      }
    })
  }

  doSearch = () => {
    const { currentPage, ipt } = this.state
    const _ipt = ipt[this.type] === '' ? 1 : parseInt(ipt[this.type])
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    t('全站日志.页码跳转', {
      type: this.type,
      page: _ipt
    })

    this.setState({
      currentPage: {
        ...currentPage,
        [this.type]: _ipt
      },
      show: false,
      ipt: {
        ...ipt,
        [this.type]: String(_ipt)
      }
    })
    this.fetchBlog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }
}
