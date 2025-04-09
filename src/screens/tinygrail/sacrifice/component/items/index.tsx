/*
 * @Author: czy0729
 * @Date: 2021-03-08 21:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:21:49
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Head from './head'
import List from './list'
import Modal from './modal'
import { memoStyles } from './styles'

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
    return (
      <View style={styles.container}>
        <Head />
        {$.state.showItems && (
          <>
            <List onOpen={handleOpen} />
            <Modal title={title} visible={visible} onClose={handleClose} />
          </>
        )}
      </View>
    )
  })
}

export default Items
