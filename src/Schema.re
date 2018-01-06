type executionResultData;

type documentAst;

type rule;

type executionResult =
  | Success(executionResultData)
  | Error(array(Js.Exn.t));

exception GraphQLError(string);

type t;

type graphqlType;

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
external graphqlNonNull : graphqlType => graphqlType = "GraphQLNonNull";

[@bs.new] [@bs.module "graphql"]
external graphqlList : graphqlType => graphqlType = "GraphQLList";

/* Js input types */
[@bs.new] [@bs.module "graphql"]
external graphqlInputObject : 'a => graphqlType = "GraphQLInputObjectType";

type deprecated =
  | Deprecated(string)
  | NotDeprecated;

module Arg = {
  type obj('a, 'b) = {
    name: string,
    fields: argList('a, 'b),
    doc: option(string)
  }
  and typ(_) =
    | Object(obj('a, 'b)): typ(option('a))
    | List(typ('a)): typ(array(option('a)))
    | NonNull(typ(option('a))): typ('a)
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
  let list = t => List(t);
  let nonNull = t => NonNull(t);
  let string = String;
  let float = Float;
  let int = Int;
  let bool = Bool;
  let id = Id;
  type any('a);
};

type jsInteropType('a, 'b);

type obj('ctx, 'src) = {
  name: string,
  fields: list(field('ctx, 'src)),
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
and typ(_, _) =
  | Object(obj('ctx, 'src)): typ('ctx, option('src))
  | JsInteropType(jsInteropType('ctx, 'src)): typ('ctx, option('src))
  | NonNull(typ('ctx, option('src))): typ('ctx, 'src)
  | List(typ('ctx, 'src)): typ('ctx, option(array('src)))
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

let obj = (~doc=?, name, ~fields) => Object({name, fields, doc});

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
    | Object({name, fields, doc}) =>
      graphqlObject({
        "name": name,
        "fields":
          fields
          |> List.map(f =>
               switch f {
               | Field(f) => (f.name, toJsSchema(Field(f)))
               | AsyncField(f) => (f.name, toJsSchema(AsyncField(f)))
               }
             )
          |> jsObjMap,
        "description": Js.Nullable.from_opt(doc)
      })
    | NonNull(t) => graphqlNonNull(toJsType(t))
    | List(t) => graphqlList(toJsType(t))
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
        "description": Js.Nullable.from_opt(doc)
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
          "description": Js.Nullable.from_opt(doc),
          /* More magic */
          "default": Obj.magic(default)
        }
      );
    Arg.(
      switch args {
      | [] => dict
      | [Arg.Arg({name, Arg.typ, doc}), ...rest] =>
        addJsArg(dict, name, typ, doc, Js.Nullable.null);
        toJsArgs(rest, dict);
      | [Arg.DefaultArg({name, Arg.typ, default, doc}), ...rest] =>
        addJsArg(dict, name, typ, doc, Js.Nullable.return(default));
        toJsArgs(rest, dict);
      }
    );
  }
and toJsSchema: type src. field('ctx, src) => jsField('t) =
  field => {
    /* This is full of magic, partly because we need to do crazy stuff, partly
     * because of my lack of ocaml skills.  */
    let {typ, args, resolve, deprecated, doc} =
      switch field {
      | Field(f) => Obj.magic(f)
      | AsyncField(f) => Obj.magic(f)
      };
    let maybeResolve = (f, value) =>
      switch f {
      | Field(_) => Obj.magic(Js.Promise.resolve(value))
      | AsyncField(_) => Obj.magic(value)
      };
    let resolveArg: type a. (string, Arg.typ(a), _, _) => _ =
      (name, typ, jsArgs, f) =>
        Obj.magic(
          switch typ {
          | Arg.NonNull(_) => f(Js.Dict.unsafeGet(jsArgs, name))
          | _ =>
            /* Convert from Js.Nullable.t to option */
            f(
              Obj.magic(
                switch (Js.Dict.get(jsArgs, name)) {
                | Some(a) => Js.Nullable.to_opt(a)
                | None => None
                }
              )
            )
          }
        );
    let jsResolve =
      Obj.magic((node, jsArgs, ctx) => {
        let rec resolveArgs: type a b. (Arg.argList(a, b), _, _) => _ =
          (args, jsArgs, f) =>
            Arg.(
              switch args {
              | [] => f
              | [Arg({name, typ}), ...rest] =>
                let res = resolveArg(name, typ, jsArgs, f);
                resolveArgs(rest, jsArgs, res);
              | [DefaultArg({name, typ}), ...rest] =>
                let res = resolveArg(name, typ, jsArgs, f);
                resolveArgs(rest, jsArgs, res);
              }
            );
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
      "deprecationReason":
        switch deprecated {
        | Deprecated(message) => Js.Nullable.return(message)
        | NotDeprecated => Js.Nullable.null
        },
      "description": Js.Nullable.from_opt(doc)
    };
  };

[@bs.val] [@bs.module "graphql"]
external execute_ : (t, string, 'b, 'c, Js.Json.t) => Js.Promise.t('d) =
  "graphql";

[@bs.val] [@bs.module "graphql"]
external parse_ : string => documentAst = "parse";

[@bs.val] [@bs.module "graphql"]
external validate_ : (t, documentAst, 'rules) => array(Js.Exn.t) = "validate";

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
