StitchUserImpl= {
      id: '5c926bc64da69303ebe66b86',
      loggedInProviderType: 'anon-user',
      loggedInProviderName: 'anon-user',
      profile:
       ApiCoreUserProfile {
         userType: 'normal',
         data: {},
         identities: [ [/*ApiStitchUserIdentity*/] ] },
      isLoggedIn: true,
      lastAuthActivity: 2019-03-20T16:35:19.681Z,
      auth:
       StitchAuthImpl {
         requestClient:
          StitchAppRequestClient {
            baseUrl: 'https://stitch.mongodb.com',
            transport: RNFetchTransport {},
            clientAppId: 'maatel_artistrenaissance-dilzf',
            routes: [/*StitchAppRoutes*/],
            appMetadata: [/*ApiAppMetadata*/] },
         authRoutes:
          StitchAppAuthRoutes {
            baseAuthRoute: '/api/client/v2.0/auth',
            sessionRoute: '/api/client/v2.0/auth/session',
            profileRoute: '/api/client/v2.0/auth/profile',
            clientAppId: 'maatel_artistrenaissance-dilzf' },
         storage:
          RNAsyncStorage {
            suiteName: 'maatel_artistrenaissance-dilzf',
            cachedStorage: [/*Object*/] },
         allUsersAuthInfo: Map { '5c926bc64da69303ebe66b86' => [/*AuthInfo*/] },
         activeUserAuthInfo:
          AuthInfo {
            userId: '5c926bc64da69303ebe66b86',
            deviceId: '5c926bc64da69303ebe66b88',
            accessToken:
             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTMxMDE1MTksImlhdCI6MTU1MzA5OTcxOSwiaXNzIjoiNWM5MjZiYzc0ZGE2OTMwM2ViZTY2YjhiIiwic3RpdGNoX2RhdGEiOm51bGwsInN0aXRjaF9kZXZJZCI6IjVjOTI2YmM2NGRhNjkzMDNlYmU2NmI4OCIsInN0aXRjaF9kb21haW5JZCI6IjVjNWNhMjJjMGZkM2Y0NWQ0OWY2YzdkZiIsInN1YiI6IjVjOTI2YmM2NGRhNjkzMDNlYmU2NmI4NiIsInR5cCI6ImFjY2VzcyJ9.YW7leyC51cbCzUmIPPOUNjShoE8UdCmjiurVJ59Gbb8',
            refreshToken:
             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTgyODM3MTksImlhdCI6MTU1MzA5OTcxOSwic3RpdGNoX2RhdGEiOm51bGwsInN0aXRjaF9kZXZJZCI6IjVjOTI2YmM2NGRhNjkzMDNlYmU2NmI4OCIsInN0aXRjaF9kb21haW5JZCI6IjVjNWNhMjJjMGZkM2Y0NWQ0OWY2YzdkZiIsInN0aXRjaF9pZCI6IjVjOTI2YmM3NGRhNjkzMDNlYmU2NmI4YiIsInN0aXRjaF9pZGVudCI6eyJpZCI6IjVjOTI2YmM2NGRhNjkzMDNlYmU2NmI4NS1wam5kcnNwbnh6cW5hc2hnc212bmdia3AiLCJwcm92aWRlcl90eXBlIjoiYW5vbi11c2VyIiwicHJvdmlkZXJfaWQiOiI1YzVjY2E0OTk1MDAyYzZjNDQ3Njc1MmYifSwic3ViIjoiNWM5MjZiYzY0ZGE2OTMwM2ViZTY2Yjg2IiwidHlwIjoicmVmcmVzaCJ9.95nmqxp81E9Z8FkkA6x6taK8bK-IWd1dGR75nAGTfVU',
            loggedInProviderType: 'anon-user',
            loggedInProviderName: 'anon-user',
            lastAuthActivity: 2019-03-20T16:35:19.681Z,
            userProfile: [/*ApiCoreUserProfile*/] },
         accessTokenRefresher:
          AccessTokenRefresher {
            auth: [/*Circular*/],
            nextTimeout:
             Timeout {
               _called: false,
               _idleTimeout: 60000,
               _idlePrev: [TimersList],
               _idleNext: [TimersList],
               _idleStart: 1908,
               _onTimeout: [Function],
               _timerArgs: undefined,
               _repeat: null,
               _destroyed: false,
               [Symbol(unrefed)]: false,
               [Symbol(asyncId)]: 204,
               [Symbol(triggerId)]: 203 } },
         appInfo:
          StitchAppClientInfo {
            clientAppId: 'maatel_artistrenaissance-dilzf',
            dataDirectory: '',
            localAppName: undefined,
            localAppVersion: undefined },
         listeners: Set {},
         synchronousListeners: Set {},
         currentUser: [/*Circular*/] } }