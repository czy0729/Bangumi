/*
 * @Author: czy0729
 * @Date: 2021-05-25 23:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-20 17:46:39
 */
import React from 'react'

export class PotentialError extends React.Component {
  state = {
    error: false
  }

  componentDidCatch(error) {
    console.info('@/components/potential-error', 'componentDidCatch')

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
