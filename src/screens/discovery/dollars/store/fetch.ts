/*
 * @Author: czy0729
 * @Date: 2024-12-03 13:43:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 13:47:15
 */
import { discoveryStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchDollars = () => {
    return discoveryStore.fetchDollars()
  }

  updateDollars = () => {
    return discoveryStore.updateDollars()
  }
}
