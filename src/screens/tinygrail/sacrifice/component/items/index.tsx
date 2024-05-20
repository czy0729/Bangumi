/*
 * @Author: czy0729
 * @Date: 2021-03-08 21:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 16:07:30
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { c } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Head from './head'
import List from './list'
import Modal from './modal'
import { memoStyles } from './styles'

function Items(props, { $ }: Ctx) {
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
      <View style={styles.container}>
        <Head />
        {$.state.showItems && (
          <>
            <List onOpen={onOpen} />
            <Modal title={title} visible={visible} onClose={onClose} />
          </>
        )}
      </View>
    )
  })
}

export default c(Items)
