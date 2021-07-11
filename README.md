# bs-graphql-js

## NO LONGER MAINTAINED

We do not use Reason at Th3rdwave anymore so this repo is no longer maintained.

Bindings for [graphql](https://github.com/graphql/graphql-js) and [graphql-relay](https://github.com/graphql/graphql-relay-js) with an API based on [ocaml-graphql-server](https://github.com/andreas/ocaml-graphql-server). Allows for interop between JS and Reason/OCaml defined schemas.

[![npm version](https://badge.fury.io/js/bs-graphql-js.svg)](https://badge.fury.io/js/bs-graphql-js)
[![CircleCI](https://circleci.com/gh/janicduplessis/bs-graphql-js.svg?style=svg)](https://circleci.com/gh/janicduplessis/bs-graphql-js)

## Install

```sh
npm install bs-graphql-js

# or

yarn add bs-graphql-js
```

**NOTE**

As of version 0.6.0 this requires bucklescript 7.0+


## TODO

It's missing a lot of things and the implementation is badly typed.

- Union types
- Better type safety for interfaces
- Custom scalar types
- Properly type the implementation (aka remove some Obj.magic :S).
- Examples
- Maybe separate relay stuff in a separate package.
- Tests
