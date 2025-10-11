/*
 * @Author: czy0729
 * @Date: 2024-09-16 20:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:52:26
 */
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import Fetch from './fetch'

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

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
