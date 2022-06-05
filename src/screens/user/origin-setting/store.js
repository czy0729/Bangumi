/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:56:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 05:07:09
 */
import { observable, computed, toJS } from 'mobx'
import { subjectStore } from '@stores'
import { getTimestamp, open, copy } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { getOriginConfig, replaceOriginUrl } from './utils'

export const types = [
  {
    type: 'anime',
    name: '动画',
    test: {
      CN: '擅长捉弄的高木同学 第三季',
      JP: 'からかい上手の高木さん③',
      ID: 347887
    }
  },
  {
    type: 'hanime',
    name: 'H',
    test: {
      CN: '缘之空',
      JP: 'ヨスガノソラ',
      ID: 7157
    }
  },
  {
    type: 'manga',
    name: '漫画',
    test: {
      CN: '蓦然回首',
      JP: 'ルックバック',
      ID: 342254
    }
  },
  {
    type: 'wenku',
    name: '小说',
    test: {
      CN: '来自新世界',
      JP: '新世界より',
      ID: 37782
    }
  },
  {
    type: 'music',
    name: '音乐',
    test: {
      CN: 'One Last Kiss',
      JP: 'One Last Kiss',
      ID: 321924
    }
  },
  {
    type: 'game',
    name: '游戏',
    test: {
      CN: '艾尔登法环',
      JP: 'ELDEN RING',
      ID: 284100
    }
  },
  {
    type: 'real',
    name: '三次元',
    test: {
      CN: '半泽直树 2',
      JP: '半沢直樹 2',
      ID: 108596
    }
  }
]

const namespace = 'ScreenOriginSetting'

export default class ScreenOriginSetting extends store {
  state = observable({
    data: {
      base: {},
      custom: {
        anime: [],
        hanime: [],
        manga: [],
        wenku: [],
        music: [],
        game: [],
        real: []
      }
    },
    edit: {
      type: '',
      item: {
        id: '',
        uuid: '',
        name: '',
        url: '',
        sort: 0,
        active: 1
      }
    },
    active: true,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      data: toJS(subjectStore.origin),
      active: state?.active || false,
      _loaded: getTimestamp()
    })
  }

  // -------------------- get --------------------
  @computed get data() {
    const { data } = this.state
    return getOriginConfig(data)
  }

  // -------------------- action --------------------
  onToggle = () => {
    const { active } = this.state
    this.setState({
      active: !active
    })
    this.setStorage(undefined, undefined, namespace)
  }

  updateOrigin = () => {
    setTimeout(() => {
      const { data } = this.state
      subjectStore.updateOrigin(data)
    }, 0)
  }

  /**
   * 展开编辑表单
   */
  openEdit = (type, item) => {
    this.setState({
      edit: {
        type,
        item
      }
    })

    t('自定义源头.编辑表单', {
      type
    })
  }

  /**
   * 关闭并清空编辑表单
   */
  closeEdit = () => {
    this.setState({
      edit: {
        type: '',
        item: {
          id: '',
          uuid: '',
          name: '',
          url: '',
          sort: 0,
          active: 1
        }
      }
    })

    t('自定义源头.关闭表单')
  }

  /**
   * 输入框变化
   */
  onChangeText = (key, val) => {
    const { edit } = this.state
    let _val = val.trim()
    if (key === 'sort') _val = isNaN(Number(_val)) ? 0 : Number(_val)

    this.setState({
      edit: {
        ...edit,
        item: {
          ...edit.item,
          [key]: _val
        }
      }
    })
  }

  /**
   * 保存源头
   */
  submitEdit = () => {
    const { edit, data } = this.state
    const { type, item } = edit
    const { id, uuid } = item
    const isCreate = id === '' && uuid === ''

    let _data
    if (isCreate) {
      // 新增
      if (!item.name) {
        info('名字不能为空')
        return
      }

      if (!item.url) {
        info('网址不能为空')
        return
      }

      _data = toJS(data)
      _data.custom[type].push({
        uuid: getTimestamp(),
        name: item.name || '',
        url: item.url || '',
        sort: item.sort || 0,
        active: 1
      })
    } else {
      // 修改
      if (id) {
        _data = toJS(data)
        if (_data.base[id]) {
          _data.base[id] = {
            ..._data.base[id],
            sort: item.sort
          }
        } else {
          _data.base[id] = {
            sort: item.sort
          }
        }
      } else {
        if (!item.name) {
          info('名字不能为空')
          return
        }

        if (!item.url) {
          info('网址不能为空')
          return
        }

        _data = toJS(data)
        const findIndex = _data.custom[type].findIndex(i => i.uuid === uuid)
        if (_data.custom[type][findIndex]) {
          _data.custom[type][findIndex] = {
            ..._data.custom[type][findIndex],
            ...item
          }
        }
      }
    }

    this.setState({
      data: _data
    })

    this.closeEdit()
    this.updateOrigin()

    t('自定义源头.保存源头', {
      type
    })
  }

  /**
   * 停用源头
   */
  disableItem = ({ id, uuid, type }) => {
    if (!type) return

    const { data } = this.state
    const _data = toJS(data)

    if (id) {
      if (_data.base[id]) {
        _data.base[id] = {
          ..._data.base[id],
          active: 0
        }
      } else {
        _data.base[id] = {
          active: 0
        }
      }
    } else {
      const find = _data.custom[type].find(i => i.uuid === uuid)
      if (find) find.active = 0
    }

    this.setState({
      data: _data
    })
    this.updateOrigin()

    t('自定义源头.停用源头', {
      type
    })
  }

  /**
   * 启用源头
   */
  activeItem = ({ id, uuid, type }) => {
    if (!type) return

    const { data } = this.state
    const _data = toJS(data)

    if (id) {
      if (_data.base[id]) {
        _data.base[id] = {
          ..._data.base[id],
          active: 1
        }
      } else {
        _data.base[id] = {
          active: 1
        }
      }
    } else {
      const find = _data.custom[type].find(i => i.uuid === uuid)
      if (find) find.active = 1
    }

    this.setState({
      data: _data
    })
    this.updateOrigin()

    t('自定义源头.启用源头', {
      type
    })
  }

  /**
   * 删除自定义源头
   */
  deleteItem = ({ uuid, type }) => {
    if (!uuid || !type) return

    const { data } = this.state
    const _data = toJS(data)
    _data.custom[type] = _data.custom[type].filter(item => item.uuid !== uuid)

    this.setState({
      data: _data
    })
    this.updateOrigin()
  }

  /**
   * 测试
   */
  go = ({ type, url }) => {
    if (!type || !url) return

    try {
      const { test } = types.find(item => item.type === type)
      const _url = replaceOriginUrl(url, test)

      copy(_url)
      info('已复制地址', 1)
      setTimeout(() => {
        open(_url)
      }, 1600)
    } catch (error) {
      info('网址解析出错, 请检查')
    }
  }
}
