/*
 * @Author: czy0729
 * @Date: 2024-09-16 20:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 21:36:28
 */
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MONO_VOICES_INNER_ORDERBY, MONO_VOICES_OUTER_ORDERBY } from '@constants'
import Fetch from './fetch'

import type { Status } from '../types'

export default class Action extends Fetch {
  /** 职位选择 */
  onFilterSelect = async (
    label: string,
    data: {
      title: string
      value: string
    }[]
  ) => {
    const { value = '' } = data.find(item => item.title === label) || {}
    this.setState({
      position: value
    })

    this.fetchMonoVoices()
    this.save()

    t('角色.职位选择', {
      label: label.split(' ')?.[0]
    })
  }

  /** 状态选择 */
  onStatus = async (label: Status) => {
    this.setState({
      status: label
    })
  }

  /** 外层排序选择（角色排序） */
  onOuterOrderSelect = (label: string) => {
    const option = MONO_VOICES_OUTER_ORDERBY.find(item => item.label === label)
    this.setState({
      outerOrder: option?.value || ''
    })
    this.save()

    t('角色.外层排序选择', { label })
  }

  /** 内层排序选择（条目排序） */
  onInnerOrderSelect = (label: string) => {
    const option = MONO_VOICES_INNER_ORDERBY.find(item => item.label === label)
    this.setState({
      innerOrder: option?.value || ''
    })
    this.save()

    t('角色.内层排序选择', { label })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
