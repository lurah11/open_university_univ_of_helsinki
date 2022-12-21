```mermaid
sequenceDiagram
browser->>server:HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa --> payload:{"content":"tampan ","date":"2022-12-21T07:47:24.009Z"}
server-->>browser: 201 created -> data : {"message":"note created"}
```