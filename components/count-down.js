/*
 * @Author: czy0729
 * @Date: 2019-12-11 14:50:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-11 20:12:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import Text from './text'

export default
@observer
class CountDown extends React.Component {
  static defaultProps = {
    end: 0
  }

  interval

  state = {
    now: getTimestamp()
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        now: getTimestamp()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { end, ...other } = this.props
    const { now } = this.state
    const distance = end - now
    if (!distance) {
      return null
    }

    const d = Math.floor(distance / 86400)
    const h = Math.floor((distance - d * 86400) / 3600)
    const m = Math.floor((distance - d * 86400 - h * 3600) / 60)
    const s = Math.floor(distance - d * 86400 - h * 3600 - m * 60)
    return (
      <Text {...other}>
        {!!d && `${d}天`}
        {!!h && `${h}时`}
        {!!m && `${m}分`}
        {!!s && `${s}秒`}
      </Text>
    )
  }
}
