/*
 * @Author: czy0729
 * @Date: 2019-05-18 00:32:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-18 00:34:47
 */
import React from 'react'
import { IconBack } from '@screens/_'
import _ from '@styles'
import observer from './observer'

const withHeader = () => ComposedComponent =>
  observer(
    class extends React.Component {
      static navigationOptions = ({ navigation }) => ({
        headerLeft: <IconBack navigation={navigation} color={_.colorTitle} />,
        ...ComposedComponent.navigationOptions
      })

      render() {
        return <ComposedComponent />
      }
    }
  )

export default withHeader
