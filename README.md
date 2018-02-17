# bs-graphql-js

Bindings for [graphql](https://github.com/graphql/graphql-js) and [graphql-relay](https://github.com/graphql/graphql-relay-js) with an API based on [ocaml-graphql-server](https://github.com/andreas/ocaml-graphql-server). Allows for interop between JS and Reason/OCaml defined schemas.

[![npm version](https://badge.fury.io/js/bs-graphql-js.svg)](https://badge.fury.io/js/bs-graphql-js)
[![CircleCI](https://circleci.com/gh/janicduplessis/bs-graphql-js.svg?style=svg)](https://circleci.com/gh/janicduplessis/bs-graphql-js)

## TODO

It's missing a lot of things and the implementation is badly typed.

- rei interface
- Union types
- Better type safety for interfaces
- Custom scalar types
- Properly type the implementation (aka remove some Obj.magic :S).
- Examples
- Maybe separate relay stuff in a separate package.
- Tests
