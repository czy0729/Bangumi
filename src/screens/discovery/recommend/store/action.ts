/*
 * @Author: czy0729
 * @Date: 2024-06-22 05:15:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:25:13
 */
import { updateVisibleBottom } from '@utils'
import { WEB } from '@constants'
import Fetch from './fetch'
import { NAMESPACE } from './ds'

export default class Action extends Fetch {
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      value: text
    })
  }

  onChangeE = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      e: text
    })
  }

  onSelect = (cat: string) => {
    setTimeout(async () => {
      this.setState({
        cat
      })

      await this.doSearchV2()

      if (!WEB) await this.fetchSubjects()
      await this.fetchSubjectsFromOSS()
      this.setStorage(NAMESPACE)
    }, 16)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
