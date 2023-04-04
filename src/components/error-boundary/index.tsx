/*
 * @Author: czy0729
 * @Date: 2023-04-04 10:10:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 12:05:35
 */
import React from 'react'
import { _ } from '@stores'
import { AnyObject } from '@types'
import { Flex } from '../flex'
import { Text } from '../text'
import { styles } from './styles'
import { type State, type Props as ErrorBoundaryProps } from './types'
import { stl } from '@utils'

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = {
    error: null
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

function renderWithErrorBoundary(
  data: any | [any, string[]],
  index?: number,
  props?: AnyObject
) {
  const passProps = {}
  let Component: any
  if (Array.isArray(data)) {
    Component = data[0]
    data[1].forEach((key: string) => (passProps[key] = props[key]))
  } else {
    Component = data
  }

  return (
    <ErrorBoundary key={index}>
      <Component {...passProps} />
    </ErrorBoundary>
  )
}

export { ErrorBoundary, ErrorBoundaryProps, renderWithErrorBoundary }
