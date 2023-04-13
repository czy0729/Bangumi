/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:53:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 17:27:14
 */
import React, { useCallback } from 'react'
// import KeepAlive from 'react-activation'
import Stores from '@stores'
import { useMount, useBoolean } from '@utils/hooks'
import { StorybookPage } from './page'

let inited = false

export const StorybookSPA = ({ children, ...other }) => {
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

  return <StorybookPage {...other}>{state ? children : null}</StorybookPage>
}
