/*
 * @Author: czy0729
 * @Date: 2021-03-08 21:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:11:58
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Head from './head'
import List from './list'
import Modal from './modal'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Items() {
  const { $ } = useStore<Ctx>()

  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)

  const handleOpen = useCallback((title: string) => {
    setTitle(title)
    setVisible(true)
  }, [])
  const handleClose = useCallback(() => {
    setTitle('')
    setVisible(false)
  }, [])

  return useObserver(() => {
    const styles = memoStyles()

    if ($.state.showItems) {
      return (
        <View
          style={[
            styles.container,
            {
              width: _.window.width
            }
          ]}
        >
          <Head />
          <List onOpen={handleOpen} />
          <Modal title={title} visible={visible} onClose={handleClose} />
        </View>
      )
    }

    return (
      <Flex.Item style={styles.container}>
        <Head />
      </Flex.Item>
    )
  })
}

export default Items
