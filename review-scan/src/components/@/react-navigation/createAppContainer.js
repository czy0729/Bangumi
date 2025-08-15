import React from 'react'
import { AsyncStorage, Linking, Platform, BackHandler } from 'react-native'
import { polyfill } from 'react-lifecycles-compat'
import {
  NavigationActions,
  pathUtils,
  getNavigation,
  NavigationProvider
} from '@react-navigation/core'
import invariant from '@react-navigation/native/src/utils/invariant'
import docsUrl from '@react-navigation/native/src/utils/docsUrl'
import Page from './page'

const { urlToPathAndParams } = pathUtils

function isStateful(props) {
  return !props.navigation
}

function validateProps(props) {
  if (isStateful(props)) {
    return
  }
  const { navigation, screenProps, ...containerProps } = props

  const keys = Object.keys(containerProps)

  if (keys.length !== 0) {
    throw new Error(
      'This navigator has both navigation and container props, so it is ' +
        `unclear if it should own its own state. Remove props: "${keys.join(', ')}" ` +
        'if the navigator should get its state from the navigation prop. If the ' +
        'navigator should maintain its own state, do not pass a navigation prop.'
    )
  }
}

// Track the number of stateful container instances. Warn if >0 and not using the
// detached prop to explicitly acknowledge the behavior. We should deprecated implicit
// stateful navigation containers in a future release and require a provider style pattern
// instead in order to eliminate confusion entirely.
let _statefulContainerCount = 0
export function _TESTING_ONLY_reset_container_count() {
  _statefulContainerCount = 0
}

// We keep a global flag to catch errors during the state persistence hydrating scenario.
// The innermost navigator who catches the error will dispatch a new init action.
let _reactNavigationIsHydratingState = false
// Unfortunate to use global state here, but it seems necessesary for the time
// being. There seems to be some problems with cascading componentDidCatch
// handlers. Ideally the inner non-stateful navigator catches the error and
// re-throws it, to be caught by the top-level stateful navigator.

/**
 * Create an HOC that injects the navigation and manages the navigation state
 * in case it's not passed from above.
 * This allows to use e.g. the StackNavigator and TabNavigator as root-level
 * components.
 */
export default function createNavigationContainer(Component) {
  class NavigationContainer extends React.Component {
    subs = null

    static router = Component.router
    static navigationOptions = null

    static getDerivedStateFromProps(nextProps) {
      validateProps(nextProps)
      return null
    }

    _actionEventSubscribers = new Set()

    constructor(props) {
      super(props)

      validateProps(props)

      this._initialAction = NavigationActions.init()

      if (this._isStateful()) {
        this.subs = BackHandler.addEventListener('hardwareBackPress', () => {
          if (!this._isMounted) {
            this.subs && this.subs.remove()
          } else {
            // dispatch returns true if the action results in a state change,
            // and false otherwise. This maps well to what BackHandler expects
            // from a callback -- true if handled, false if not handled
            return this.dispatch(NavigationActions.back())
          }
        })
      }

      this.state = {
        nav:
          this._isStateful() && !props.persistenceKey
            ? Component.router.getStateForAction(this._initialAction)
            : null
      }
    }

    _renderLoading() {
      return this.props.renderLoadingExperimental ? this.props.renderLoadingExperimental() : null
    }

    _isStateful() {
      return isStateful(this.props)
    }

    _validateProps(props) {
      if (this._isStateful()) {
        return
      }

      const { navigation, screenProps, ...containerProps } = props
      const keys = Object.keys(containerProps)
      if (keys.length !== 0) {
        throw new Error(
          'This navigator has both navigation and container props, so it is ' +
            `unclear if it should own its own state. Remove props: "${keys.join(', ')}" ` +
            'if the navigator should get its state from the navigation prop. If the ' +
            'navigator should maintain its own state, do not pass a navigation prop.'
        )
      }
    }

    _handleOpenURL = ({ url }) => {
      const { enableURLHandling, uriPrefix } = this.props
      if (enableURLHandling === false) {
        return
      }
      const parsedUrl = urlToPathAndParams(url, uriPrefix)
      if (parsedUrl) {
        const { path, params } = parsedUrl
        const action = Component.router.getActionForPathAndParams(path, params)
        if (action) {
          this.dispatch(action)
        }
      }
    }

    _onNavigationStateChange(prevNav, nav, action) {
      if (
        typeof this.props.onNavigationStateChange === 'undefined' &&
        this._isStateful() &&
        !!process.env.REACT_NAV_LOGGING
      ) {
        if (console.group) {
          console.group('Navigation Dispatch: ')
          console.log('Action: ', action)
          console.log('New State: ', nav)
          console.log('Last State: ', prevNav)
          console.groupEnd()
        } else {
          console.log('Navigation Dispatch: ', {
            action,
            newState: nav,
            lastState: prevNav
          })
        }
        return
      }

      if (typeof this.props.onNavigationStateChange === 'function') {
        this.props.onNavigationStateChange(prevNav, nav, action)
      }
    }

    componentDidUpdate() {
      // Clear cached _navState every tick
      if (this._navState === this.state.nav) {
        this._navState = null
      }
    }

    async componentDidMount() {
      this._isMounted = true
      if (!this._isStateful()) {
        return
      }

      if (__DEV__ && !this.props.detached) {
        if (_statefulContainerCount > 0) {
          // Temporarily only show this on iOS due to this issue:
          // https://github.com/react-navigation/react-navigation/issues/4196#issuecomment-390827829
          if (Platform.OS === 'ios') {
            console.warn(
              `You should only render one navigator explicitly in your app, and other navigators should be rendered by including them in that navigator. Full details at: ${docsUrl(
                'common-mistakes.html#explicitly-rendering-more-than-one-navigator'
              )}`
            )
          }
        }
      }
      _statefulContainerCount++
      Linking.addEventListener('url', this._handleOpenURL)

      // Pull out anything that can impact state
      const { persistenceKey, uriPrefix, enableURLHandling } = this.props
      let parsedUrl = null
      let startupStateJSON = null
      if (enableURLHandling !== false) {
        startupStateJSON = persistenceKey && (await AsyncStorage.getItem(persistenceKey))
        const url = await Linking.getInitialURL()
        parsedUrl = url && urlToPathAndParams(url, uriPrefix)
      }

      // Initialize state. This must be done *after* any async code
      // so we don't end up with a different value for this.state.nav
      // due to changes while async function was resolving
      let action = this._initialAction
      let startupState = this.state.nav
      if (!startupState) {
        !!process.env.REACT_NAV_LOGGING && console.log('Init new Navigation State')
        startupState = Component.router.getStateForAction(action)
      }

      // Pull persisted state from AsyncStorage
      if (startupStateJSON) {
        try {
          startupState = JSON.parse(startupStateJSON)
          _reactNavigationIsHydratingState = true
        } catch (e) {
          /* do nothing */
        }
      }

      // Pull state out of URL
      if (parsedUrl) {
        const { path, params } = parsedUrl
        const urlAction = Component.router.getActionForPathAndParams(path, params)
        if (urlAction) {
          !!process.env.REACT_NAV_LOGGING &&
            console.log('Applying Navigation Action for Initial URL:', parsedUrl)
          action = urlAction
          startupState = Component.router.getStateForAction(urlAction, startupState)
        }
      }

      const dispatchActions = () =>
        this._actionEventSubscribers.forEach(subscriber =>
          subscriber({
            type: 'action',
            action,
            state: this.state.nav,
            lastState: null
          })
        )

      if (startupState === this.state.nav) {
        dispatchActions()
        return
      }

      this.setState({ nav: startupState }, () => {
        _reactNavigationIsHydratingState = false
        dispatchActions()
      })
    }

    componentDidCatch(e) {
      console.info('@/components/react-navigation', 'componentDidCatch', e)

      if (_reactNavigationIsHydratingState) {
        _reactNavigationIsHydratingState = false
        console.warn(
          'Uncaught exception while starting app from persisted navigation state! Trying to render again with a fresh navigation state..'
        )
        this.dispatch(NavigationActions.init())
      } else {
        throw e
      }
    }

    _persistNavigationState = async nav => {
      const { persistenceKey } = this.props
      if (!persistenceKey) {
        return
      }
      await AsyncStorage.setItem(persistenceKey, JSON.stringify(nav))
    }

    componentWillUnmount() {
      try {
        this._isMounted = false
        Linking.removeEventListener('url', this._handleOpenURL)
        this.subs && this.subs.remove()

        if (this._isStateful()) {
          _statefulContainerCount--
        }
      } catch (error) {}
    }

    // Per-tick temporary storage for state.nav

    dispatch = action => {
      if (this.props.navigation) {
        return this.props.navigation.dispatch(action)
      }

      // navState will have the most up-to-date value, because setState sometimes behaves asyncronously
      this._navState = this._navState || this.state.nav
      const lastNavState = this._navState
      invariant(lastNavState, 'should be set in constructor if stateful')
      const reducedState = Component.router.getStateForAction(action, lastNavState)
      const navState = reducedState === null ? lastNavState : reducedState

      const dispatchActionEvents = () => {
        this._actionEventSubscribers.forEach(subscriber =>
          subscriber({
            type: 'action',
            action,
            state: navState,
            lastState: lastNavState
          })
        )
      }

      if (reducedState === null) {
        // The router will return null when action has been handled and the state hasn't changed.
        // dispatch returns true when something has been handled.
        dispatchActionEvents()
        return true
      }

      if (navState !== lastNavState) {
        // Cache updates to state.nav during the tick to ensure that subsequent calls will not discard this change
        this._navState = navState
        this.setState({ nav: navState }, () => {
          this._onNavigationStateChange(lastNavState, navState, action)
          dispatchActionEvents()
          this._persistNavigationState(navState)
        })
        return true
      }

      dispatchActionEvents()
      return false
    }

    _getScreenProps = () => this.props.screenProps

    render() {
      let navigation = this.props.navigation
      if (this._isStateful()) {
        const navState = this.state.nav
        if (!navState) {
          return this._renderLoading()
        }
        if (!this._navigation || this._navigation.state !== navState) {
          this._navigation = getNavigation(
            Component.router,
            navState,
            this.dispatch,
            this._actionEventSubscribers,
            this._getScreenProps,
            () => this._navigation
          )
        }
        navigation = this._navigation
      }
      invariant(navigation, 'failed to get navigation')

      /**
       * @fixed react-navigation版本老旧, 在安卓黑暗模式下, 因性能问题
       * 后面切换的默认白色底会在切换的瞬间在最右边看见, 这里侵入给默认再包一层带底色的框
       */
      return (
        <Page>
          <NavigationProvider value={navigation}>
            <Component {...this.props} navigation={navigation} />
          </NavigationProvider>
        </Page>
      )
    }
  }

  return polyfill(NavigationContainer)
}
