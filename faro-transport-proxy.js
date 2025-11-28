(function() {
    if (window.faroTransportProxyInstalled) {
        return;
    }
    window.faroTransportProxyInstalled = true;

    const originalFetch = window.fetch;

    window.fetch = function(url, options) {
        const urlString = typeof url === 'string' ? url : url.url;

        if (urlString && (urlString.includes('grafana.net/collect') || urlString.includes('corsproxy.io'))) {
            return new Promise((resolve, reject) => {
                window.postMessage({
                    type: 'FARO_FETCH_PROXY',
                    url: urlString,
                    options: {
                        method: options?.method || 'POST',
                        headers: options?.headers || {},
                        body: options?.body
                    }
                }, '*');

                const listener = (event) => {
                    if (event.data.type === 'FARO_FETCH_RESPONSE') {
                        window.removeEventListener('message', listener);

                        if (event.data.error) {
                            reject(new Error(event.data.error));
                        } else {
                            const response = {
                                ok: event.data.ok,
                                status: event.data.status,
                                statusText: event.data.statusText,
                                headers: new Headers(event.data.headers),
                                json: () => Promise.resolve(event.data.body),
                                text: () => Promise.resolve(JSON.stringify(event.data.body)),
                                blob: () => Promise.resolve(new Blob([JSON.stringify(event.data.body)])),
                                arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
                                clone: () => response
                            };
                            resolve(response);
                        }
                    }
                };

                window.addEventListener('message', listener);

                setTimeout(() => {
                    window.removeEventListener('message', listener);
                    reject(new Error('Faro fetch proxy timeout'));
                }, 30000);
            });
        }

        return originalFetch.apply(this, arguments);
    };

    window.addEventListener('message', (event) => {
        if (event.data.type === 'FARO_TEST_TRIGGER') {
            if (typeof window.faro === 'undefined') {
                window.postMessage({
                    type: 'FARO_TEST_RESULT',
                    success: false
                }, '*');
                return;
            }

            try {
                console.log('[Faro] Sending test telemetry');

                const apiError = new Error('Failed to fetch user data: 404 Not Found');
                apiError.name = 'ApiError';
                apiError.stack = `ApiError: Failed to fetch user data: 404 Not Found
    at fetchUserProfile (https://example.com/api/users.js:42:15)
    at handleUserLogin (https://example.com/auth/login.js:128:23)
    at onClick (https://example.com/components/LoginButton.js:67:11)`;

                window.faro.api.pushError(apiError, {
                    type: 'ApiError',
                    context: {
                        endpoint: '/api/v1/user/profile',
                        method: 'GET',
                        statusCode: 404,
                        requestId: 'req_' + Date.now()
                    }
                });

                window.faro.api.pushLog(['API request took longer than expected', {
                    endpoint: '/api/v1/user/profile',
                    duration: 3500,
                    threshold: 2000
                }], {
                    level: 'warn'
                });

                const renderError = new Error("Cannot read properties of undefined (reading 'userId')");
                renderError.name = 'TypeError';
                renderError.stack = `TypeError: Cannot read properties of undefined (reading 'userId')
    at UserProfile.render (https://example.com/components/UserProfile.js:89:34)
    at updateComponent (https://example.com/framework/renderer.js:156:21)
    at commitWork (https://example.com/framework/scheduler.js:234:17)`;

                window.faro.api.pushError(renderError, {
                    type: 'TypeError',
                    context: {
                        component: 'UserProfile',
                        props: { userId: undefined },
                        state: 'loading'
                    }
                });

                window.faro.api.pushEvent('test.user_action', {
                    action: 'button_click',
                    element: 'test-error-button',
                    timestamp: new Date().toISOString(),
                    testSource: 'faro-extension'
                });

                window.postMessage({
                    type: 'FARO_TEST_RESULT',
                    success: true
                }, '*');
            } catch (error) {
                console.error('[Faro] Test failed:', error);
                window.postMessage({
                    type: 'FARO_TEST_RESULT',
                    success: false
                }, '*');
            }
        }
    });
})();
