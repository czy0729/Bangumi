/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:31:34
 */
import Fetch from './fetch'

export default class Action extends Fetch {
  onLevelSelect = (level: string) => {
    this.setState({
      level
    })
  }
}
