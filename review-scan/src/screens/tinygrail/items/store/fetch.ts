/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:07:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-26 01:07:52
 */
import { tinygrailStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 道具 */
  fetchItems = () => {
    return tinygrailStore.fetchItems()
  }
}
