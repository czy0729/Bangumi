/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:52:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 16:39:10
 */
import Fetch from './fetch'
import { STATE } from './ds'

export default class Action extends Fetch {
  onToggleForm = () => {
    this.setState({
      show: !this.state.show
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
}
