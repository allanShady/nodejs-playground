## What I learned

With new version of express, it comes with a build in json parser and we cal register the middle as the code bellow

```js
    import express, { json } from 'express'

    const app = express();
    
    app.use(json());  
```