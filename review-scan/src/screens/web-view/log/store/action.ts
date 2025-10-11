/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:52:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-10 06:20:33
 */
import { Clipboard } from 'react-native'
import { copy, info, pick } from '@utils'
import Fetch from './fetch'
import { STATE } from './ds'

export default class Action extends Fetch {
  onToggleForm = () => {
    this.setState({
      show: !this.state.show
    })
  }

  onToggleStats = () => {
    this.setState({
      showStats: !this.state.showStats
    })
  }

  onChange = (key: keyof typeof STATE, value: string) => {
    this.setState({
      [key]: value
    })
    this.save()
  }

  onToggleDetail = (value: string) => {
    this.setState({
      detail: this.state.detail === value ? '' : value
    })
  }

  onToggleName = () => {
    this.setState({
      showName: !this.state.showName
    })
    this.save()
  }

  onToggleTour = () => {
    this.setState({
      showTour: !this.state.showTour
    })
    this.save()
  }

  onToggleDefault = () => {
    this.setState({
      showDefault: !this.state.showDefault
    })
    this.save()
  }

  onCopy = () => {
    copy(
      JSON.stringify(
        pick(this.state, [
          'url',
          'url2',
          'navigate',
          'referer',
          'event',
          'authorization',
          'usersPrefixed',
          'infosPrefixed',
          'distance',
          'unitDay',
          'showName'
        ])
      ),
      '已复制'
    )
  }

  onPaste = async () => {
    try {
      const content = await Clipboard.getString()
      if (content) {
        const state = JSON.parse(content)
        this.setState({
          ...state
        })
        this.save()
        info('应用成功')

        return
      }
    } catch (error) {}

    info('应用失败')
  }
}
