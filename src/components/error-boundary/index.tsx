/*
 * @Author: czy0729
 * @Date: 2023-04-04 10:10:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 15:47:42
 */
import React from 'react'
import { _ } from '@stores'
import { stl } from '@utils'
import { AnyObject } from '@types'
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
          <Text size={13} type='sub'>
            代码发生错误
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

/** 捕捉错误异常组件包裹组件 */
function renderWithErrorBoundary(data: any, index?: number, props: AnyObject = {}) {
  const Component = data
  return (
    <ErrorBoundary key={index}>
      <Component {...props} />
    </ErrorBoundary>
  )
}

export { ErrorBoundary, ErrorBoundaryProps, renderWithErrorBoundary }
