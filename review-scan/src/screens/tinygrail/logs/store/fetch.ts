/*
 * @Author: czy0729
 * @Date: 2025-04-20 16:26:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-20 16:26:41
 */
import { tinygrailStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchBalance = (refresh = true) => {
    return tinygrailStore.fetchBalance(refresh)
  }
}
