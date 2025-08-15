import * as React from 'react'
import { Dimensions } from 'react-native'
import hoistNonReactStatic from 'hoist-non-react-statics'

export const isOrientationLandscape = ({ width, height }) => width > height

export default function withDimensions(WrappedComponent) {
  const { width, height } = Dimensions.get('window')

  class EnhancedComponent extends React.Component {
    static displayName = `withDimensions(${WrappedComponent.displayName})`

    state = {
      dimensions: { width, height },
      isLandscape: isOrientationLandscape({ width, height })
    }

    componentDidMount() {
      Dimensions.addEventListener('change', this.handleOrientationChange)
    }

    componentWillUnmount() {
      try {
        Dimensions.removeEventListener('change', this.handleOrientationChange)
      } catch (error) {}
    }

    handleOrientationChange = ({ window }) => {
      const isLandscape = isOrientationLandscape(window)
      this.setState({ isLandscape })
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }

  return hoistNonReactStatic(EnhancedComponent, WrappedComponent)
}
