import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

const REST_API_KEY = 'e36d1bf95f32016fc0ba84525063eb27'; // 본인의 카카오 애플리케이션 키로 대체해주세요
const REDIRECT_URI = 'https://124.50.12.6'; // 카카오 개발자 사이트에 등록한 Redirect URI로 대체해주세요

const INJECTED_JAVASCRIPT =  `
const meta = document.createElement('meta');
meta.setAttribute('name', 'apple-mobile-web-app-capable');
meta.setAttribute('content', 'yes');
document.getElementsByTagName('head')[0].appendChild(meta);

const languageMeta = document.createElement('meta');
languageMeta.setAttribute('http-equiv', 'content-language');
languageMeta.setAttribute('content', 'ko');
document.getElementsByTagName('head')[0].appendChild(languageMeta);
`;

function LoginScreen() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleWebViewMessage = (event) => {
    const data = event.nativeEvent.data;
    if (data.includes('code=')) {
      const code = data.split('code=')[1];
      // 카카오 로그인 성공 시 작업 수행
      setLoginSuccess(true);
      // 이후에 필요한 작업을 수행하십시오.
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loginSuccess ? (
        <View style={styles.container}>
          <Text>카카오 로그인 성공!</Text>
          {/* 원하는 컴포넌트를 렌더링하거나 페이지를 이동시킬 수 있습니다. */}
        </View>
      ) : (
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={handleWebViewMessage}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
