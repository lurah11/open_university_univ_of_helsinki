```mermaid
sequenceDiagram
browser->>server:HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->>browser: HTML-code
browser->>server:HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser:main.css
browser->>server:HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->>browser:spa.js
browser->>server:HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser:[{"content":"?","date":"2022-12-20T21:09:27.065Z"},{"content":"Pushpa","date":"2022-12-20T21:09:36.949Z"},.....]
```