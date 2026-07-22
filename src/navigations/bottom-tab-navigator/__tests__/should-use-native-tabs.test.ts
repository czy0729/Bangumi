import { shouldUseNativeTabs } from '../should-use-native-tabs'

describe('shouldUseNativeTabs', () => {
  it('only enables native tabs for standalone builds with at most five tabs', () => {
    expect(shouldUseNativeTabs(true, 5)).toBe(true)
    expect(shouldUseNativeTabs(false, 5)).toBe(false)
    expect(shouldUseNativeTabs(true, 6)).toBe(false)
  })
})
