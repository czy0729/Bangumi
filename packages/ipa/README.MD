sudo chmod -R 777 node_modules

xcodebuild -workspace Bangumi.xcworkspace -scheme Bangumi -configuration Release -sdk iphoneos CODE_SIGN_IDENTITY=\"\" CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=NO -derivedDataPath build

yarn make:ipa
