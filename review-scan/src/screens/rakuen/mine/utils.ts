/*
 * @Author: czy0729
 * @Date: 2024-08-19 04:53:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 04:54:24
 */
import { loadJSON } from '@assets/json'

export async function loadGroupData() {
  return await loadJSON('group')
}
