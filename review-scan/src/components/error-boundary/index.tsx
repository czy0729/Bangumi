/*
 * @Author: czy0729
 * @Date: 2023-04-04 10:10:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 16:33:30
 */
import React from 'react'
import { _ } from '@stores'
import { navigationReference, stl } from '@utils'
import { APP_ID_SAY_DEVELOP } from '@constants'
import { Flex } from '../flex'
import { Text } from '../text'
import { styles } from './styles'
import { Props as ErrorBoundaryProps, State } from './types'

/** 捕捉错误异常 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = {
    error: this.props.error || null
  }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    const { error } = this.state
    if (error) {
      return (
        <Flex style={stl(styles.error, this.props.style)} direction='column' justify='center'>
          <Text type='sub' size={13} lineHeight={15} align='center'>
            代码发生错误，可尝试到
            <Text
              type='sub'
              size={13}
              lineHeight={15}
              underline
              onPress={() => {
                const navigation = navigationReference()
                if (navigation) navigation.push('Setting')
              }}
            >
              设置
            </Text>
            里清除缓存，{'\n'}若无法解决请与作者
            <Text
              type='sub'
              size={13}
              lineHeight={15}
              underline
              onPress={() => {
                const navigation = navigationReference()
                if (navigation) {
                  navigation.push('Say', {
                    sayId: APP_ID_SAY_DEVELOP
                  })
                }
              }}
            >
              反馈
            </Text>
            。
          </Text>
          <Text style={_.mt.sm} size={10} type='sub'>
            {error.message}
          </Text>
        </Flex>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary, ErrorBoundaryProps }

export default ErrorBoundary
