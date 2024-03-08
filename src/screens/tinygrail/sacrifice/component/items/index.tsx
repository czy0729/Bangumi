/*
 * @Author: czy0729
 * @Date: 2021-03-08 21:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 05:41:02
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { useObserver } from '@utils/hooks'
import Head from './head'
import List from './list'
import Modal from './modal'
import { memoStyles } from './styles'

function Items() {
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)

  const onOpen = useCallback((title: string) => {
    setTitle(title)
    setVisible(true)
  }, [])
  const onClose = useCallback(() => {
    setTitle('')
    setVisible(false)
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <View style={styles.container}>
          <Head />
          <List onOpen={onOpen} />
        </View>
        <Modal title={title} visible={visible} onClose={onClose} />
      </>
    )
  })
}

export default Items
