/*
 * @Author: czy0729
 * @Date: 2019-05-18 00:32:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-23 00:42:23
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { IconBack } from '@screens/_'
import { IOS } from '@constants'
import _ from '@styles'
import observer from './observer'

const withHeader = () => ComposedComponent =>
  observer(
    class extends React.Component {
      static navigationOptions = ({ navigation }) => ({
        headerLeft: <IconBack navigation={navigation} color={_.colorTitle} />,
        headerStyle: IOS
          ? undefined
          : {
              borderBottomColor: _.colorBorder,
              borderBottomWidth: StyleSheet.hairlineWidth,
              elevation: 0
            },
        headerTitleStyle: {
          color: _.colorTitle,
          fontSize: 16,
          fontWeight: 'normal'
        },
        ...ComposedComponent.navigationOptions
      })

      render() {
        return <ComposedComponent />
      }
    }
  )

export default withHeader
