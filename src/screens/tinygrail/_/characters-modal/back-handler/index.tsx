/*
 * @Author: czy0729
 * @Date: 2025-04-06 16:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 16:47:55
 */
import { useBackHandler } from '@utils/hooks'
import { Fn } from '@types'

function BackHandler({ handler }: { handler: Fn }) {
  useBackHandler(handler)

  return null
}

export default BackHandler
