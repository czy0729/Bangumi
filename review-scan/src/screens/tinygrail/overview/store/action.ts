/*
 * @Author: czy0729
 * @Date: 2024-12-16 20:18:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 20:22:37
 */
import { t } from '@utils/fetch'
import { TABS } from '../ds'
import { Direction } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('热门榜单.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.save()

    const { key } = TABS[page]
    const { _loaded } = this.list(key)
    if (!_loaded) this.fetchList(key)
  }

  /** 设置前往 */
  onSelectGo = (title: string) => {
    t('热门榜单.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.save()
  }

  /** 列表等级筛选排序 */
  onLevelSelect = (level: number) => {
    t('热门榜单.筛选', {
      level
    })

    this.setState({
      level
    })
    this.save()
  }

  /** 列表排序 */
  onSortPress = (item: string) => {
    const { sort, direction } = this.state
    if (item === sort) {
      let nextSort = item
      let nextDirection: Direction = 'down'
      if (direction === 'down') {
        nextDirection = 'up'
      } else if (direction === 'up') {
        nextSort = ''
        nextDirection = ''
      }

      t('热门榜单.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('热门榜单.排序', {
        sort: item,
        direction: 'down'
      })

      this.setState({
        sort: item,
        direction: 'down'
      })
    }

    this.save()
  }

  onSortLongPress = () => {
    this.setState({
      sort: '',
      direction: ''
    })
    this.save()

    t('热门榜单.排序', {
      sort: '',
      direction: ''
    })
  }
}
