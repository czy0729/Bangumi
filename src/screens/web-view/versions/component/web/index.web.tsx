/*
 * @Author: czy0729
 * @Date: 2023-11-04 05:54:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-08 17:18:10
 */
import React from 'react'
import { View } from 'react-native'
import { Loading } from '@components'
import { SafeAreaView } from '@_'
import { _ } from '@stores'
import { useBoolean } from '@utils/hooks'
import { HTML_SINGLE_DOC } from '@constants'

function Web({ uri }) {
  const { state, setTrue } = useBoolean(false)

  return (
    <SafeAreaView
      style={[
        _.container.flex,
        {
          backgroundColor: _.colorPlain
        }
      ]}
    >
      {!state && <Loading style={_.mt.lg} />}
      <View
        style={{
          flex: 1,
          backgroundColor: _.colorPlain,
          opacity: state ? 1 : 0
        }}
        onLayout={() => {
          setTrue()
        }}
      >
        <iframe
          style={{
            height: '100%',
            border: 'none'
          }}
          src={HTML_SINGLE_DOC(uri)}
        />
      </View>
    </SafeAreaView>
  )
}

export default Web
