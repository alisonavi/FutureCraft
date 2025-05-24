// src/components/UnityGame.jsx
import React, { useEffect } from 'react';

export default function UnityGame() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/WebGLBuild/Build/FutureCraftPreFinal.loader.js';
    script.onload = () => {
      const container = document.querySelector('#unity-container');
      const canvas = document.querySelector('#unity-canvas');
      const loadingBar = document.querySelector('#unity-loading-bar');
      const progressBarFull = document.querySelector('#unity-progress-bar-full');
      const fullscreenButton = document.querySelector('#unity-fullscreen-button');
      const warningBanner = document.querySelector('#unity-warning');

      const config = {
        dataUrl: '/WebGLBuild/Build/FutureCraftPreFinal.data.unityweb',
        frameworkUrl: '/WebGLBuild/Build/FutureCraftPreFinal.framework.js.unityweb',
        codeUrl: '/WebGLBuild/Build/FutureCraftPreFinal.wasm.unityweb',
        streamingAssetsUrl: '/WebGLBuild/TemplateData',
        companyName: 'YourCompany',
        productName: 'YourGame',
        productVersion: '1.0',
      };

      window.createUnityInstance(canvas, config, (progress) => {
        if (progressBarFull) {
          progressBarFull.style.width = 100 * progress + '%';
        }
      }).then((unityInstance) => {
        if (loadingBar) loadingBar.style.display = 'none';
        if (fullscreenButton) fullscreenButton.addEventListener('click', () => {
          unityInstance.SetFullscreen(1);
        });
      }).catch((error) => {
        console.error('Unity load error:', error);
        if (warningBanner) {
          warningBanner.textContent = 'Failed to load Unity content.';
          warningBanner.style.display = 'block';
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector("script[src='/WebGLBuild/Build/WebGLBuild.loader.js']");
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  return (
    <div id="unity-container" className="unity-desktop" style={{ width: '100%', height: '100vh' }}>
      <canvas id="unity-canvas" width="960" height="600" style={{ width: '100%', height: '100%' }} />
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
      <div id="unity-warning" style={{ display: 'none' }}></div>
      <div id="unity-footer">
        <div id="unity-webgl-logo"></div>
        <div id="unity-fullscreen-button"></div>
        <div id="unity-build-title">My project (1)</div>
      </div>
    </div>
  );
}
