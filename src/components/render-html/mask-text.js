/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:03:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 12:05:14
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Text } from '../text'

export default
@observer
class MaskText extends React.Component {
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
    return (
      <Text
        style={[
          style,
          show ? this.styles.blockTextShow : this.styles.blockText
        ]}
        selectable
        onPress={this.toggle}
      >
        {children}
      </Text>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  blockText: {
    color: _.select(_.colorDesc, _._colorDarkModeLevel2),
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel2)
  },
  blockTextShow: {
    color: _.colorPlain,
    backgroundColor: _.colorDesc
  }
}))
