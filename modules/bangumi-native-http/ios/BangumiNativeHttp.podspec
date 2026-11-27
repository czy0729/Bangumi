Pod::Spec.new do |s|
  s.name           = 'BangumiNativeHttp'
  s.version        = '1.0.0'
  s.summary        = 'Native no-redirect HTTP for Bangumi login'
  s.description    = 'Sends a single HTTP request without following 3xx, so the caller can read Set-Cookie and Location.'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = { :ios => '15.1' }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule'
  }

  s.source_files = "**/*.{h,m,mm,swift}"
end
