/*
 * @Author: czy0729
 * @Date: 2021-05-25 23:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-25 23:36:16
 */
import React from 'react'

export class PotentialError extends React.Component {
  state = {
    error: false
  }

  componentDidCatch(error) {
    this.setState({
      error
    })
  }

  render() {
    const { error } = this.state
    const { children, renderError } = this.props
    if (error) {
      return renderError ? renderError() : null
    }

    return children
  }
}
