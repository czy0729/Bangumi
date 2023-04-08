/*
 * @Author: czy0729
 * @Date: 2023-04-04 21:21:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 08:26:45
 */
import { StorybookPage } from './page'
import { StorybookList } from './list'
import { StorybookGrid } from './grid'

export { StorybookPage, StorybookList, StorybookGrid }

export const navigation = {
  getState() {
    return {
      index: 1
    }
  },
  push() {},
  replace() {},
  goBack() {},
  addListener() {}
}
