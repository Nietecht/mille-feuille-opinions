---
layout: layout.njk
---
# Syntax Highlight

## C\#

``` csharp
using System;

System.Console.WriteLine("Hello world!");
```

## JavaScript

``` javascript
const A = 1;
const B = 2;
const C = 3;
const P = (i) => {
    switch (i) {
        case A:
    }
};
const Q = (i) => {
    switch (i) {
        case A:
    }
};
const PT = (i, s) => {
    switch (s) {
        case A:
            return [
                s(i),
                PT(s)
            ]
    }
};
```

## TypeScript

``` typescript
const A = 1;
const B = 2;
const C = 3;
const P = (i: Number) => {
    switch (i) {
        case A:
    }
};
const Q = (i: Number) => {
    switch (i) {
        case A:
    }
};
const PT = (i: Number, s: any) => {
    switch (i) {
        case A:
            return [
                s(i),
                PT(s)
            ]
    }
};
```
