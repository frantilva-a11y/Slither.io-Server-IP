// ==UserScript==
// @name         Slither.io Server IP
// @name:pt-br   IP do Servidor do Slither.io
// @namespace    https://github.com/frantilva-a11y/Slither.io-Server-IP
// @version      1.0.1
// @description  Shows the Slither.io server IP you are connected to
// @description:pt-br Mostra o IP do servidor do Slither.io conectado
// @author       br.gabrielslither
// @license      MIT
// @match        *://slither.io/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const OriginalWebSocket = window.WebSocket;

    window.WebSocket = function (url, protocols) {
        if (typeof url === 'string' && url.startsWith('wss://')) {
            console.log('[Slither.io] WebSocket:', url);

            // Extrai só IP + porta
            try {
                const server = url.replace(/^wss:\/\//, '').split('/')[0];

                showServer(server);
            } catch (e) {}
        }

        return protocols
            ? new OriginalWebSocket(url, protocols)
            : new OriginalWebSocket(url);
    };

    window.WebSocket.prototype = OriginalWebSocket.prototype;

    function showServer(text) {
        if (document.getElementById('slither-server-ip')) return;

        const box = document.createElement('div');
        box.id = 'slither-server-ip';
        box.textContent = 'Server: ' + text;

        Object.assign(box.style, {
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: '9999',
            background: 'rgba(0,0,0,0.7)',
            color: '#0f0',
            padding: '6px 8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            borderRadius: '4px'
        });

        document.body.appendChild(box);
    }
})();
