type executionResultData;

type documentAst;

type rule;

type executionResult =
  | Success(executionResultData)
  | Error(array(Js.Exn.t));

exception GraphQLError(string);


type t;
type graphqlType;
let interfaceMap = Hashtbl.create(10);
let objectMap = Hashtbl.create(10);
/* Js types */
[@bs.val] [@bs.module "graphql"]
external graphqlString : graphqlType = "GraphQLString";
[@bs.val] [@bs.module "graphql"]
external graphqlFloat : graphqlType = "GraphQLFloat";
[@bs.val] [@bs.module "graphql"]
external graphqlInt : graphqlType = "GraphQLInt";
[@bs.val] [@bs.module "graphql"]
external graphqlBool : graphqlType = "GraphQLBoolean";
[@bs.val] [@bs.module "graphql"]
external graphqlId : graphqlType = "GraphQLID";
[@bs.new] [@bs.module "graphql"]
external graphqlObject : 'a => graphqlType = "GraphQLObjectType";
[@bs.new] [@bs.module "graphql"]
external graphqlInterface : 'a => graphqlType = "GraphQLInterfaceType";
[@bs.new] [@bs.module "graphql"]
external graphqlNonNull : graphqlType => graphqlType = "GraphQLNonNull";
[@bs.new] [@bs.module "graphql"]
external graphqlList : graphqlType => graphqlType = "GraphQLList";
[@bs.new] external graphqlEnum : 'a => graphqlType = "GraphQLEnumType";
/* Js input types */
[@bs.new] [@bs.module "graphql"]
external graphqlInputObject : 'a => graphqlType = "GraphQLInputObjectType";
let toJsDoc = doc => Js.Nullable.from_opt(doc);
type deprecated =
  | Deprecated(string)
  | NotDeprecated;
let toJsDeprecationReason = d =>
  switch d {
  | Deprecated(message) => Js.Nullable.return(message)
  | NotDeprecated => Js.Nullable.null
  };
type enumValue('a) = {
  name: string,
  doc: option(string),
  deprecated,
  value: 'a
};
let enumValue = (~doc=?, ~deprecated=NotDeprecated, name, ~value) => {
  name,
  doc,
  deprecated,
  value
};
module Arg = {
  type obj('a, 'b) = {
    name: string,
    fields: argList('a, 'b),
    doc: option(string)
  }
  and enum('a) = {
    name: string,
    doc: option(string),
    values: list(enumValue('a))
  }
  and typ(_) =
    | Object(obj('a, 'b)): typ(option('a))
    | List(typ('a)): typ(array(option('a)))
    | NonNull(typ(option('a))): typ('a)
    | Enum(enum('a)): typ(option('a))
    | String: typ(option(string))
    | Float: typ(option(float))
    | Int: typ(option(int))
    | Bool: typ(option(bool))
    | Id: typ(option(string))
  and argRec('a) = {
    name: string,
    typ: typ('a),
    doc: option(string)
  }
  and defaultArgRec('a, 'b) = {
    name: string,
    typ: typ('a),
    default: 'b,
    doc: option(string)
  }
  and arg(_) =
    | Arg(argRec('a)): arg('a)
    | DefaultArg(defaultArgRec(option('a), 'a)): arg('a)
  and argList(_, _) =
    | []: argList('a, 'a)
    | ::(arg('a), argList('b, 'c)): argList('b, 'a => 'c);
  let arg = (~doc=?, name, ~typ) => Arg({name, typ, doc});
  let arg' = (~doc=?, ~default, name, ~typ) =>
    DefaultArg({name, typ, default, doc});
  let obj = (~doc=?, name, ~fields) => Object({name, fields, doc});
  let enum = (~doc=?, name, ~values) => Enum({name, values, doc});
  let list = t => List(t);
  let nonNull = t => NonNull(t);
  let string = String;
  let float = Float;
  let int = Int;
  let bool = Bool;
  let id = Id;
  type any('a);
};
type enum('a) = {
  name: string,
  doc: option(string),
  values: list(enumValue('a))
};
type jsInteropType('a, 'b);
type obj('ctx, 'src, 'int) = {
  name: string,
  fields: Lazy.t(list(field('ctx, 'src))),
  interfaces: list(typ('ctx, 'int)),
  isTypeOf: option('src => bool),
  doc: option(string)
}
and interface('ctx, 'out) = {
  name: string,
  fields: Lazy.t(list(field('ctx, 'out))),
  doc: option(string)
}
and interfaceField('ctx, 'out) = {
  name: string,
  typ: typ('ctx, 'out),
  doc: option(string)
}
and fieldRec('ctx, 'src, 'args, 'out) = {
  name: string,
  typ: typ('ctx, 'out),
  args: Arg.argList('out, 'args),
  resolve: ('ctx, 'src) => 'args,
  deprecated,
  doc: option(string)
}
and asyncFieldRec('ctx, 'src, 'args, 'out) = {
  name: string,
  typ: typ('ctx, 'out),
  args: Arg.argList(Js.Promise.t('out), 'args),
  resolve: ('ctx, 'src) => 'args,
  deprecated,
  doc: option(string)
}
and field(_, _) =
  | Field(fieldRec('ctx, 'src, 'args, 'out)): field('ctx, 'src)
  | AsyncField(asyncFieldRec('ctx, 'src, 'args, 'out)): field('ctx, 'src)
  | InterfaceField(interfaceField('ctx, 'out)): field('ctx, 'src)
and typ(_, _) =
  | Object(obj('ctx, 'src, 'int)): typ('ctx, option('src))
  | JsInteropType(jsInteropType('ctx, 'src)): typ('ctx, option('src))
  | Interface(interface('ctx, 'src)): typ('ctx, option('src))
  | NonNull(typ('ctx, option('src))): typ('ctx, 'src)
  | List(typ('ctx, 'src)): typ('ctx, option(array('src)))
  | Enum(enum('src)): typ('ctx, option('src))
  | String: typ('ctx, option(string))
  | Float: typ('ctx, option(float))
  | Int: typ('ctx, option(int))
  | Bool: typ('ctx, option(bool))
  | Id: typ('ctx, option(string));
let field = (~doc=?, ~deprecated=NotDeprecated, ~args, name, ~typ, ~resolve) =>
  Field({name, typ, args, resolve, deprecated, doc});
let asyncField =
    (~doc=?, ~deprecated=NotDeprecated, ~args, name, ~typ, ~resolve) =>
  AsyncField({name, typ, args, resolve, deprecated, doc});
let string = String;
let float = Float;
let int = Int;
let bool = Bool;
let id = Id;
let nonNull = t => NonNull(t);
let list = t => List(t);
let enum = (~doc=?, name, ~values) => Enum({doc, name, values});
let obj = (~doc=?, ~interfaces=[], ~isTypeOf=?, name, ~fields) =>
  Object({name, fields, interfaces, isTypeOf, doc});
let interface = (~doc=?, name, ~fields) => Interface({doc, name, fields});
let interfaceField = (~doc=?, name, ~typ) =>
  InterfaceField({doc, name, typ});
let jsObjMap = list =>
  list
  |> List.fold_left(
       (obj, (key, value)) => {
         Js.Dict.set(obj, key, value);
         obj;
       },
       Js.Dict.empty()
     );
type jsField('a) = {
  .
  "type": graphqlType,
  "args":
    Js.Dict.t(
      {
        .
        "type": graphqlType,
        "description": Js.nullable(string),
        "default": Js.Json.t
      }
    ),
  "resolve": 'a,
  "deprecationReason": Js.nullable(string),
  "description": Js.nullable(string)
};
/* TODO: it would be possible to type this properly */
let interopJsType = t => JsInteropType(t);
let rec toJsType: type src. typ('ctx, src) => graphqlType =
  typ =>
    switch typ {
    | JsInteropType(t) => Obj.magic(t)
    | Object({name, fields, doc, interfaces, isTypeOf}) =>
      switch (Hashtbl.find(objectMap, name)) {
      | i => i
      | exception Not_found =>
        let jsObject =
          graphqlObject({
            "name": name,
            "fields": () =>
              Lazy.force(fields)
              |> List.map(f =>
                   switch f {
                   | Field(f) => (f.name, toJsSchema(Field(f)))
                   | AsyncField(f) => (f.name, toJsSchema(AsyncField(f)))
                   | InterfaceField(f) => (
                       f.name,
                       toJsSchema(InterfaceField(f))
                     )
                   }
                 )
              |> jsObjMap,
            "interfaces": interfaces |> List.map(toJsType) |> Array.of_list,
            "isTypeOf": Js.Nullable.from_opt(isTypeOf),
            "description": toJsDoc(doc)
          });
        Hashtbl.add(objectMap, name, jsObject);
        jsObject;
      }
    | Interface({name, fields}) =>
      switch (Hashtbl.find(interfaceMap, name)) {
      | i => i
      | exception Not_found =>
        let jsInterface =
          graphqlInterface({
            "name": name,
            "fields": () =>
              Lazy.force(fields)
              |> List.map(f =>
                   switch f {
                   | InterfaceField({name, typ, doc}) => (
                       name,
                       {"type": toJsType(typ), "description": toJsDoc(doc)}
                     )
                   | Field({name, typ, doc}) => (
                       name,
                       {"type": toJsType(typ), "description": toJsDoc(doc)}
                     )
                   | AsyncField({name, typ, doc}) => (
                       name,
                       {"type": toJsType(typ), "description": toJsDoc(doc)}
                     )
                   }
                 )
              |> jsObjMap
          });
        Hashtbl.add(interfaceMap, name, jsInterface);
        jsInterface;
      }
    | NonNull(t) => graphqlNonNull(toJsType(t))
    | List(t) => graphqlList(toJsType(t))
    | Enum({doc, name, values}) =>
      graphqlEnum({
        "name": name,
        "values":
          values
          |> List.map((v: enumValue(_)) =>
               (
                 name,
                 {
                   "value": v.name,
                   "deprecationReason": toJsDeprecationReason(v.deprecated),
                   "description": toJsDoc(v.doc)
                 }
               )
             )
          |> jsObjMap,
        "description": toJsDoc(doc)
      })
    | String => graphqlString
    | Float => graphqlFloat
    | Int => graphqlInt
    | Bool => graphqlBool
    | Id => graphqlId
    }
and toJsArgType: type a. Arg.typ(a) => graphqlType =
  typ =>
    switch typ {
    | Arg.Object({name, fields, doc}) =>
      graphqlInputObject({
        "name": name,
        "fields": toJsArgs(fields),
        "description": toJsDoc(doc)
      })
    | Arg.Enum({name, values, doc}) =>
      graphqlEnum({
        "name": name,
        "values":
          values
          |> List.map((v: enumValue(_)) =>
               (
                 name,
                 {
                   "value": v.name,
                   "deprecationReason": toJsDeprecationReason(v.deprecated),
                   "description": toJsDoc(v.doc)
                 }
               )
             )
          |> jsObjMap,
        "description": toJsDoc(doc)
      })
    | Arg.NonNull(t) => graphqlNonNull(toJsArgType(t))
    | Arg.List(t) => graphqlList(toJsArgType(t))
    | Arg.String => graphqlString
    | Arg.Float => graphqlFloat
    | Arg.Int => graphqlInt
    | Arg.Bool => graphqlBool
    | Arg.Id => graphqlId
    }
and toJsArgs: type a b. (Arg.argList(a, b), Js.Dict.t('c)) => Js.Dict.t('d) =
  (args, dict) => {
    let addJsArg = (dict, name, typ, doc, default) =>
      Js.Dict.set(
        dict,
        name,
        {
          "type": toJsArgType(typ),
          "description": toJsDoc(doc),
          /* More magic */
          "default": Obj.magic(default)
        }
      );
    open! Arg;
    switch args {
    | [] => dict
    | [Arg.Arg({name, Arg.typ, doc}), ...rest] =>
      addJsArg(dict, name, typ, doc, Js.Nullable.null);
      toJsArgs(rest, dict);
    | [Arg.DefaultArg({name, Arg.typ, default, doc}), ...rest] =>
      addJsArg(dict, name, typ, doc, Js.Nullable.return(default));
      toJsArgs(rest, dict);
    };
  }
and toJsSchema: type src. field('ctx, src) => jsField('t) =
  field => {
    /* This is full of magic, partly because we need to do crazy stuff, partly
     * because of my lack of ocaml skills.  */
    let {typ, args, resolve, deprecated, doc} =
      switch field {
      | Field(f) => Obj.magic(f)
      | AsyncField(f) => Obj.magic(f)
      | InterfaceField(_) =>
        raise(Invalid_argument("Should not resolve interface field"))
      };
    let maybeResolve = (f, value) =>
      switch f {
      | Field(_) => Obj.magic(Js.Promise.resolve(value))
      | AsyncField(_) => Obj.magic(value)
      | InterfaceField(_) =>
        raise(Invalid_argument("Should not resolve interface field"))
      };
    let rec parseArg: type a. (string, Arg.typ(a), option(Js.Json.t)) => 'b =
      (name, typ, value, nullable) =>
        switch value {
        | None => None
        | Some(value) =>
          let res =
            switch typ {
            | Arg.NonNull(t) => parseArg(name, t, Some(value), false)
            | Arg.Enum({values}) =>
              values
              |> List.find((v: enumValue(_)) => v.name == Obj.magic(value))
              |> Obj.magic
            | _ => value |> Obj.magic
            };
          nullable ? res |> Obj.magic |> Js.Nullable.to_opt : res;
        };
    let resolveArg = (name, typ, jsArgs, f) => {
      let value =
        switch (Js.Dict.get(jsArgs, name)) {
        | Some(a) => Js.Nullable.to_opt(a)
        | None => None
        };
      let arg = parseArg(name, typ, value, true);
      Obj.magic(f(arg));
    };
    let rec resolveArgs: type a b. (Arg.argList(a, b), _, _) => _ =
      (args, jsArgs, f) => {
        open! Arg;
        switch args {
        | [] => f
        | [Arg({name, typ}), ...rest] =>
          let res = resolveArg(name, typ, jsArgs, f);
          resolveArgs(rest, jsArgs, res);
        | [DefaultArg({name, typ}), ...rest] =>
          let res = resolveArg(name, typ, jsArgs, f);
          resolveArgs(rest, jsArgs, res);
        };
      };
    let jsResolve =
      Obj.magic((node, jsArgs, ctx) => {
        let rec convertResultToJs: type a b. (typ(a, b), _, _) => _ =
          (typ, nullable, result) => {
            let anyRes = Obj.magic(result);
            Obj.magic(
              switch typ {
              | Bool => Js.Nullable.return(Js.Boolean.to_js_boolean(anyRes))
              | NonNull(t) => convertResultToJs(t, false, anyRes)
              | _ =>
                nullable ?
                  Js.Nullable.from_opt(anyRes) : Js.Nullable.return(anyRes)
              }
            );
          };
        resolve(ctx, node)
        |> Obj.magic
        |> resolveArgs(args, jsArgs)
        |> maybeResolve(field)
        |> Js.Promise.then_(res =>
             Js.Promise.resolve(convertResultToJs(typ, true, res))
           );
      });
    let jsType = toJsType(typ);
    let jsArgs = toJsArgs(args, Js.Dict.empty());
    {
      "type": jsType,
      "args": jsArgs,
      "resolve": jsResolve,
      "deprecationReason": toJsDeprecationReason(deprecated),
      "description": toJsDoc(doc)
    };
  };

[@bs.val] [@bs.module "graphql"]
external execute_ : (t, string, 'b, 'c, Js.Json.t) => Js.Promise.t('d) =
  "graphql";

[@bs.val] [@bs.module "graphql"]
external parse_ : string => documentAst = "parse";

[@bs.val] [@bs.module "graphql"]
external validate_ : (t, documentAst, 'rules) => array(Js.Exn.t) =
  "validate";

[@bs.val] [@bs.module "graphql"] external specifiedRules : array(rule) = "";

let execute =
    (
      ~schema: t,
      ~query: string,
      ~rootValue: 'b,
      ~context: 'c,
      ~variables: Js.Json.t
    ) =>
  Js.Promise.(
    execute_(schema, query, rootValue, context, variables)
    |> then_(result =>
         switch (Js.Nullable.to_opt(result##errors)) {
         | Some(errors) => resolve(Error(errors))
         | None => resolve(Success(result##data))
         }
       )
  );

let validate = (~schema: t, ~query: string) : array(exn) => {
  let ast = parse_(query);
  validate_(schema, ast, specifiedRules)
  |> Array.map(err =>
       GraphQLError(
         switch (Js.Exn.message(err)) {
         | Some(m) => m
         | None => "GraphQLError"
         }
       )
     );
};
