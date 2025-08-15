/*
 * @Author: czy0729
 * @Date: 2024-08-19 09:07:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 09:09:23
 */
import { queue } from '@utils'
import { loadJSON } from '@assets/json'

export async function loadJAData() {
  return queue([() => loadJSON('thirdParty/ja.min'), () => loadJSON('thirdParty/ja.addon')])
}
