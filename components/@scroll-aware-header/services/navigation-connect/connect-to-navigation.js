import React, { PureComponent } from 'react'
import { withNavigation } from 'react-navigation'
import createScrollDriver from '../scroll-driver'

class ConnectedToScrollDriver extends PureComponent {
  constructor(props) {
    super(props)

    const { ScrollProviderComponent, navigation, scrollDriver } = this.props

    const { scrollOffset } = scrollDriver
    navigation.setParams({ ...scrollOffset })

    // connectProvier HOC forwards refs
    this.ConnectedToScrollDriver = scrollDriver.connectProvider(
      ScrollProviderComponent
    )
  }

  render() {
    const {
      ScrollProviderComponent,
      navigation,
      scrollDriver,
      forwardedRef,
      ...otherProps
    } = this.props
    return <this.ConnectedToScrollDriver {...otherProps} ref={forwardedRef} />
  }
}

const ConnectedToNavigation = withNavigation(ConnectedToScrollDriver)

function connectToScrollDriverAndNavigation(
  scrollDriver,
  ScrollProviderComponent
) {
  return React.forwardRef((props, ref) => (
    <ConnectedToNavigation
      scrollDriver={scrollDriver}
      ScrollProviderComponent={ScrollProviderComponent}
      forwardedRef={ref}
      {...props}
    />
  ))
}

export function connectToNavigationUsingDriver(driver) {
  return ScrollProviderComponent =>
    connectToScrollDriverAndNavigation(driver, ScrollProviderComponent)
}

export function connectToNavigation(ScrollProviderComponent) {
  return connectToScrollDriverAndNavigation(
    createScrollDriver(),
    ScrollProviderComponent
  )
}
