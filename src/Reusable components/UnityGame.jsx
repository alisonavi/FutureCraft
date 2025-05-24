import React, { useEffect } from 'react';

export default function UnityGame() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/WebGLBuild/Build/FutureCraftPreFinal.loader.js';
    script.onload = () => {
      const container = document.getElementById('unity-container');
      const canvas = document.getElementById('unity-canvas');
      const loadingBar = document.getElementById('unity-loading-bar');
      const progressBarFull = document.getElementById('unity-progress-bar-full');
      const fullscreenButton = document.getElementById('unity-fullscreen-button');
      const warningBanner = document.getElementById('unity-warning');

      const config = {
        dataUrl: '/WebGLBuild/Build/FutureCraftPreFinal.data.unityweb',
        frameworkUrl: '/WebGLBuild/Build/FutureCraftPreFinal.framework.js.unityweb',
        codeUrl: '/WebGLBuild/Build/FutureCraftPreFinal.wasm.unityweb',
        streamingAssetsUrl: '/WebGLBuild/TemplateData',
        companyName: 'YourCompany',
        productName: 'YourGame',
        productVersion: '1.0',
      };

      window
        .createUnityInstance(canvas, config, (progress) => {
          if (progressBarFull) {
            progressBarFull.style.width = 100 * progress + '%';
          }
        })
        .then((unityInstance) => {
          if (loadingBar) loadingBar.style.display = 'none';

          // Use the browser Fullscreen API
          if (fullscreenButton && container) {
            fullscreenButton.addEventListener('click', () => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                container.requestFullscreen().catch((err) => {
                  console.warn('Fullscreen request failed:', err);
                });
              }
            });
          }
        })
        .catch((error) => {
          console.error('Unity load error:', error);
          if (warningBanner) {
            warningBanner.textContent = 'Failed to load Unity content.';
            warningBanner.style.display = 'block';
          }
        });
    };

    document.body.appendChild(script);
    return () => {
      const existing = document.querySelector(
        "script[src='/WebGLBuild/Build/FutureCraftPreFinal.loader.js']"
      );
      if (existing) document.body.removeChild(existing);
    };
  }, []);

  return (
    <div
      id="unity-container"
      className="unity-desktop"
      style={{ width: '100%', height: '100vh' }}
    >
      <canvas
        id="unity-canvas"
        width="960"
        height="600"
        style={{ width: '100%', height: '100%' }}
      />
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
      <div id="unity-warning" style={{ display: 'none' }}></div>
      <div id="unity-footer">
        <div id="unity-webgl-logo"></div>
        {/* This button now triggers the browser's fullscreen */}
        <button id="unity-fullscreen-button">Fullscreen</button>
        <div id="unity-build-title">My project (1)</div>
      </div>
    </div>
  );
}
