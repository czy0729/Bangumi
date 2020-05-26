/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-25 21:20:26
 */
import { observable, computed } from 'mobx'
import { tagStore, userStore } from '@stores'
import store from '@utils/store'
import { x18 } from '@utils/app'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { HTML_RANK } from '@constants/html'

const namespace = 'ScreenRank'
const defaultType = MODEL_SUBJECT_TYPE.getLabel('动画')
const excludeState = {
  show: true // 是否显示列表, 制造切页效果
}

export default class ScreenRank extends store {
  state = observable({
    page: 0, // tab的page

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

    type: defaultType,
    filter: '',
    airtime: '',
    month: '',
    list: true, // list | grid
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    return this.fetchRank()
  }

  // -------------------- get --------------------
  @computed get rank() {
    const { type, currentPage } = this.state
    const rank = tagStore.rank(type, currentPage[type])
    if (userStore.isLimit) {
      let _filter = 0
      const list = rank.list.filter(item => {
        const filter = x18(item.id)
        if (filter) _filter += 1
        return !filter
      })
      return {
        ...rank,
        list,
        _filter
      }
    }
    return rank
  }

  @computed get url() {
    const { currentPage, type, filter, airtime } = this.state
    return HTML_RANK(type, 'rank', currentPage[type], filter, airtime)
  }

  // -------------------- fetch --------------------
  fetchRank = refresh => {
    const { currentPage, type, filter, airtime, month } = this.state
    return tagStore.fetchRank(
      {
        type,
        filter,
        airtime: month ? `${airtime}-${month}` : airtime,
        page: currentPage[type]
      },
      refresh
    )
  }

  // -------------------- page --------------------
  onTypeSelect = type => {
    t('排行榜.类型选择', {
      type
    })

    this.setState({
      show: false,
      type: MODEL_SUBJECT_TYPE.getLabel(type),
      filter: ''
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 40)

    this.fetchRank()
  }

  onFilterSelect = (filter, filterData) => {
    t('排行榜.筛选选择', {
      filter
    })

    this.setState({
      show: false,
      filter: filter === '全部' ? '' : filterData.getValue(filter)
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 40)

    this.fetchRank()
  }

  onAirdateSelect = airtime => {
    t('排行榜.年选择', {
      airtime
    })

    this.setState({
      show: false,
      airtime: airtime === '全部' ? '' : airtime,
      month: ''
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 40)

    this.fetchRank()
  }

  onMonthSelect = month => {
    const { airtime } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    t('排行榜.月选择', {
      month
    })

    this.setState({
      show: false,
      month: month === '全部' ? '' : month
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 40)

    this.fetchRank()
  }

  toggleList = () => {
    const { list } = this.state
    t('排行榜.切换布局', {
      list: !list
    })

    this.setState({
      show: false,
      list: !list
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 40)
  }

  prev = () => {
    const { currentPage, type, ipt } = this.state
    const page = currentPage[type]
    if (currentPage[type] === 1) {
      return
    }

    t('排行榜.上一页', {
      type,
      page: page - 1
    })

    this.setState({
      show: false,
      currentPage: {
        ...currentPage,
        [type]: page - 1
      },
      ipt: {
        ...ipt,
        [type]: String(page - 1)
      }
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 40)

    this.fetchRank()
  }

  next = () => {
    const { currentPage, type, ipt } = this.state
    const page = currentPage[type]
    t('排行榜.下一页', {
      type,
      page: page + 1
    })

    this.setState({
      show: false,
      currentPage: {
        ...currentPage,
        [type]: page + 1
      },
      ipt: {
        ...ipt,
        [type]: String(page + 1)
      }
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 40)

    this.fetchRank()
  }

  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    const { type, ipt } = this.state
    this.setState({
      ipt: {
        ...ipt,
        [type]: text
      }
    })
  }

  doSearch = () => {
    const { type, currentPage, ipt } = this.state
    const _ipt = ipt[type] === '' ? 1 : parseInt(ipt[type])
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    t('排行榜.页码跳转', {
      type,
      page: _ipt
    })

    this.setState({
      currentPage: {
        ...currentPage,
        [type]: _ipt
      },
      show: false,
      ipt: {
        ...ipt,
        [type]: String(_ipt)
      }
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 40)

    this.fetchRank()
  }
}
