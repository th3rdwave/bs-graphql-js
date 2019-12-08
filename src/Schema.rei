type executionResultData;
type executionResult =
  | Success(executionResultData)
  | Error(array(Js.Exn.t));
type t;
type graphqlType;
type deprecated =
  | Deprecated(string)
  | NotDeprecated;
type enumValue('a);
let enumValue:
  (~doc: string=?, ~deprecated: deprecated=?, string, ~value: 'a) =>
  enumValue('a);
type jsInteropType('a, 'b);
module Arg: {
  type typ(_);
  type arg(_);
  type argList(_, _) =
    | []: argList('a, 'a)
    | ::(arg('a), argList('b, 'c)): argList('b, 'a => 'c);
  let arg: (~doc: string=?, string, ~typ: typ('a)) => arg('a);
  let arg':
    (~doc: string=?, ~default: 'a, string, ~typ: typ(option('a))) => arg('a);
  let obj:
    (~doc: string=?, string, ~fields: argList('a, 'b)) => typ(option('a));
  let enum:
    (~doc: string=?, string, ~values: list(enumValue('a))) =>
    typ(option('a));
  let list: typ('a) => typ(option(array('a)));
  let nonNull: typ(option('a)) => typ('a);
  let string: typ(option(string));
  let float: typ(option(float));
  let int: typ(option(int));
  let bool: typ(option(bool));
  let id: typ(option(string));
  let interopJsType: jsInteropType('a, 'b) => typ(option('b));
};
type field(_, _);
type typ(_, _);
let field:
  (
    ~doc: string=?,
    ~deprecated: deprecated=?,
    ~args: Arg.argList('a, 'b),
    string,
    ~typ: typ('c, 'a),
    ~resolve: ('c, 'd) => 'b
  ) =>
  field('c, 'd);
let asyncField:
  (
    ~doc: string=?,
    ~deprecated: deprecated=?,
    ~args: Arg.argList(Js.Promise.t('a), 'b),
    string,
    ~typ: typ('c, 'a),
    ~resolve: ('c, 'd) => 'b
  ) =>
  field('c, 'd);
let string: typ('a, option(string));
let float: typ('a, option(float));
let int: typ('a, option(int));
let bool: typ('a, option(bool));
let id: typ('a, option(string));
let nonNull: typ('a, option('b)) => typ('a, 'b);
let list: typ('a, 'b) => typ('a, option(array('b)));
let enum:
  (~doc: string=?, string, ~values: list(enumValue('a))) =>
  typ('b, option('a));
let obj:
  (
    ~doc: string=?,
    ~interfaces: list(typ('a, 'b))=?,
    ~isTypeOf: 'c => bool=?,
    string,
    ~fields: Lazy.t(list(field('a, 'c)))
  ) =>
  typ('a, option('c));
let interface:
  (~doc: string=?, string, ~fields: Lazy.t(list(field('a, 'b)))) =>
  typ('a, option('b));
let interfaceField:
  (~doc: string=?, string, ~typ: typ('a, 'b)) => field('a, 'c);
type jsFieldConfig;
let interopJsType: jsInteropType('a, 'b) => typ('a, option('b));
let toJsType: typ('ctx, 'src) => graphqlType;
let toJsSchema: field('ctx, 'src) => jsFieldConfig;
let execute:
  (
    ~schema: t,
    ~query: string,
    ~rootValue: 'b,
    ~context: 'c,
    ~variables: Js.Json.t
  ) =>
  Js.Promise.t(executionResult);
let validate: (~schema: t, ~query: string) => array(exn);
