/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:53:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 18:23:58
 */
import React, { useCallback } from 'react'
import Stores from '@stores'
import { useMount, useBoolean } from '@utils/hooks'
import { StorybookPage } from './page'

let inited = false

export const StorybookSPA = ({ children }) => {
  const { state, setTrue } = useBoolean(inited)
  const init = useCallback(async () => {
    if (!inited) {
      try {
        await Stores.init()
        console.info('stores inited')
      } catch (error) {
      } finally {
        setTrue()
        inited = true
      }
    }
  }, [setTrue])
  useMount(() => {
    init()
  })

  return <StorybookPage>{state ? children : null}</StorybookPage>
}
