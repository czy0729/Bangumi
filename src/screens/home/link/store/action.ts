/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:40:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 19:20:22
 */
import { updateVisibleBottom } from '@utils'
import Fetch from './fetch'

import type { STATE } from './ds'

export default class Action extends Fetch {
  toggleHide = (key: 'hideTypes' | 'hidePlatforms' | 'hideRelates', value: string | number) => {
    // hideTypes 为数字, 其余为字符串
    const current = this.state[key] as (string | number)[]
    this.setState({
      [key]: current.includes(value) ? current.filter(item => item !== value) : [...current, value]
    })
    this.save()
  }

  setOptions = (key: keyof typeof STATE, value?: boolean | string[]) => {
    if (typeof value !== 'undefined') {
      this.setState({
        [key]: value
      })
    } else {
      const prev = this.state[key]
      if (typeof prev === 'boolean') {
        this.setState({
          [key]: !prev
        })
      }
    }
    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
