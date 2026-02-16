/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:03:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 07:43:17
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ReactNode, TextStyle } from '@types'
import { Text } from '../../text'
import { memoStyles } from './styles'

class MaskText extends React.Component<{
  style?: TextStyle
  children?: ReactNode
}> {
  state = {
    show: false
  }

  toggle = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  render() {
    const { style, children } = this.props
    const { show } = this.state
    const _style = style
      ? [style, show ? this.styles.blockTextShow : this.styles.blockText]
      : show
      ? this.styles.blockTextShow
      : this.styles.blockText
    return (
      <Text style={_style} onPress={this.toggle}>
        {children}
      </Text>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default observer(MaskText)
