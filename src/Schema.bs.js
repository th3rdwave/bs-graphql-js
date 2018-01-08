'use strict';

var List                    = require("bs-platform/lib/js/list.js");
var $$Array                 = require("bs-platform/lib/js/array.js");
var Block                   = require("bs-platform/lib/js/block.js");
var Curry                   = require("bs-platform/lib/js/curry.js");
var Hashtbl                 = require("bs-platform/lib/js/hashtbl.js");
var Graphql                 = require("graphql");
var Js_boolean              = require("bs-platform/lib/js/js_boolean.js");
var Caml_exceptions         = require("bs-platform/lib/js/caml_exceptions.js");
var Js_null_undefined       = require("bs-platform/lib/js/js_null_undefined.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var GraphQLError = Caml_exceptions.create("Schema-BsGraphqlJs.GraphQLError");

var interfaceMap = Hashtbl.create(/* None */0, 10);

var objectMap = Hashtbl.create(/* None */0, 10);

function arg(doc, name, typ) {
  return /* Arg */Block.__(0, [/* record */[
              /* name */name,
              /* typ */typ,
              /* doc */doc
            ]]);
}

function arg$prime(doc, $$default, name, typ) {
  return /* DefaultArg */Block.__(1, [/* record */[
              /* name */name,
              /* typ */typ,
              /* default */$$default,
              /* doc */doc
            ]]);
}

function obj(doc, name, fields) {
  return /* Object */Block.__(0, [/* record */[
              /* name */name,
              /* fields */fields,
              /* doc */doc
            ]]);
}

function list(t) {
  return /* List */Block.__(1, [t]);
}

function nonNull(t) {
  return /* NonNull */Block.__(2, [t]);
}

var Arg = /* module */[
  /* arg */arg,
  /* arg' */arg$prime,
  /* obj */obj,
  /* list */list,
  /* nonNull */nonNull,
  /* string : String */0,
  /* float : Float */1,
  /* int : Int */2,
  /* bool : Bool */3,
  /* id : Id */4
];

function field(doc, $staropt$star, args, name, typ, resolve) {
  var deprecated = $staropt$star ? $staropt$star[0] : /* NotDeprecated */0;
  return /* Field */Block.__(0, [/* record */[
              /* name */name,
              /* typ */typ,
              /* args */args,
              /* resolve */resolve,
              /* deprecated */deprecated,
              /* doc */doc
            ]]);
}

function asyncField(doc, $staropt$star, args, name, typ, resolve) {
  var deprecated = $staropt$star ? $staropt$star[0] : /* NotDeprecated */0;
  return /* AsyncField */Block.__(1, [/* record */[
              /* name */name,
              /* typ */typ,
              /* args */args,
              /* resolve */resolve,
              /* deprecated */deprecated,
              /* doc */doc
            ]]);
}

function nonNull$1(t) {
  return /* NonNull */Block.__(3, [t]);
}

function list$1(t) {
  return /* List */Block.__(4, [t]);
}

function obj$1(doc, $staropt$star, isTypeOf, name, fields) {
  var interfaces = $staropt$star ? $staropt$star[0] : /* [] */0;
  return /* Object */Block.__(0, [/* record */[
              /* name */name,
              /* fields */fields,
              /* interfaces */interfaces,
              /* isTypeOf */isTypeOf,
              /* doc */doc
            ]]);
}

function $$interface(doc, name, fields) {
  return /* Interface */Block.__(2, [/* record */[
              /* name */name,
              /* fields */fields,
              /* doc */doc
            ]]);
}

function interfaceField(doc, name, typ) {
  return /* InterfaceField */Block.__(2, [/* record */[
              /* name */name,
              /* typ */typ,
              /* doc */doc
            ]]);
}

function jsObjMap(list) {
  return List.fold_left((function (obj, param) {
                obj[param[0]] = param[1];
                return obj;
              }), { }, list);
}

function interopJsType(t) {
  return /* JsInteropType */Block.__(1, [t]);
}

function toJsType(typ) {
  if (typeof typ === "number") {
    switch (typ) {
      case 0 : 
          return Graphql.GraphQLString;
      case 1 : 
          return Graphql.GraphQLFloat;
      case 2 : 
          return Graphql.GraphQLInt;
      case 3 : 
          return Graphql.GraphQLBoolean;
      case 4 : 
          return Graphql.GraphQLID;
      
    }
  } else {
    switch (typ.tag | 0) {
      case 0 : 
          var match = typ[0];
          var name = match[/* name */0];
          try {
            return Hashtbl.find(objectMap, name);
          }
          catch (exn){
            if (exn === Caml_builtin_exceptions.not_found) {
              var jsObject = new Graphql.GraphQLObjectType({
                    name: name,
                    fields: jsObjMap(List.map((function (f) {
                                switch (f.tag | 0) {
                                  case 0 : 
                                      var f$1 = f[0];
                                      return /* tuple */[
                                              f$1[/* name */0],
                                              toJsSchema(/* Field */Block.__(0, [f$1]))
                                            ];
                                  case 1 : 
                                      var f$2 = f[0];
                                      return /* tuple */[
                                              f$2[/* name */0],
                                              toJsSchema(/* AsyncField */Block.__(1, [f$2]))
                                            ];
                                  case 2 : 
                                      var f$3 = f[0];
                                      return /* tuple */[
                                              f$3[/* name */0],
                                              toJsSchema(/* InterfaceField */Block.__(2, [f$3]))
                                            ];
                                  
                                }
                              }), match[/* fields */1])),
                    interfaces: $$Array.of_list(List.map(toJsType, match[/* interfaces */2])),
                    isTypeOf: Js_null_undefined.from_opt(match[/* isTypeOf */3]),
                    description: Js_null_undefined.from_opt(match[/* doc */4])
                  });
              Hashtbl.add(objectMap, name, jsObject);
              return jsObject;
            } else {
              throw exn;
            }
          }
          break;
      case 1 : 
          return typ[0];
      case 2 : 
          var match$1 = typ[0];
          var name$1 = match$1[/* name */0];
          try {
            return Hashtbl.find(interfaceMap, name$1);
          }
          catch (exn$1){
            if (exn$1 === Caml_builtin_exceptions.not_found) {
              var jsInterface = new Graphql.GraphQLInterfaceType({
                    name: name$1,
                    fields: jsObjMap(List.map((function (param) {
                                switch (param.tag | 0) {
                                  case 0 : 
                                  case 1 : 
                                      throw [
                                            Caml_builtin_exceptions.match_failure,
                                            [
                                              "/Users/janic/Developer/bs-graphql-js/src/Schema.re",
                                              252,
                                              26
                                            ]
                                          ];
                                  case 2 : 
                                      var match = param[0];
                                      return /* tuple */[
                                              match[/* name */0],
                                              {
                                                type: toJsType(match[/* typ */1]),
                                                description: Js_null_undefined.from_opt(match[/* doc */2])
                                              }
                                            ];
                                  
                                }
                              }), match$1[/* fields */1]))
                  });
              Hashtbl.add(interfaceMap, name$1, jsInterface);
              return jsInterface;
            } else {
              throw exn$1;
            }
          }
          break;
      case 3 : 
          return new Graphql.GraphQLNonNull(toJsType(typ[0]));
      case 4 : 
          return new Graphql.GraphQLList(toJsType(typ[0]));
      
    }
  }
}

function toJsArgType(typ) {
  if (typeof typ === "number") {
    switch (typ) {
      case 0 : 
          return Graphql.GraphQLString;
      case 1 : 
          return Graphql.GraphQLFloat;
      case 2 : 
          return Graphql.GraphQLInt;
      case 3 : 
          return Graphql.GraphQLBoolean;
      case 4 : 
          return Graphql.GraphQLID;
      
    }
  } else {
    switch (typ.tag | 0) {
      case 0 : 
          var match = typ[0];
          var fields = match[/* fields */1];
          return new Graphql.GraphQLInputObjectType({
                      name: match[/* name */0],
                      fields: (function (param) {
                          return toJsArgs(fields, param);
                        }),
                      description: Js_null_undefined.from_opt(match[/* doc */2])
                    });
      case 1 : 
          return new Graphql.GraphQLList(toJsArgType(typ[0]));
      case 2 : 
          return new Graphql.GraphQLNonNull(toJsArgType(typ[0]));
      
    }
  }
}

function toJsArgs(_args, dict) {
  while(true) {
    var args = _args;
    var addJsArg = function (dict, name, typ, doc, $$default) {
      dict[name] = {
        type: toJsArgType(typ),
        description: Js_null_undefined.from_opt(doc),
        default: $$default
      };
      return /* () */0;
    };
    if (args) {
      var match = args[0];
      if (match.tag) {
        var match$1 = match[0];
        addJsArg(dict, match$1[/* name */0], match$1[/* typ */1], match$1[/* doc */3], match$1[/* default */2]);
        _args = args[1];
        continue ;
        
      } else {
        var match$2 = match[0];
        addJsArg(dict, match$2[/* name */0], match$2[/* typ */1], match$2[/* doc */2], null);
        _args = args[1];
        continue ;
        
      }
    } else {
      return dict;
    }
  };
}

function toJsSchema(field) {
  var match;
  switch (field.tag | 0) {
    case 0 : 
    case 1 : 
        match = field[0];
        break;
    case 2 : 
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Should not resolve interface field"
            ];
    
  }
  var deprecated = match[/* deprecated */4];
  var resolve = match[/* resolve */3];
  var args = match[/* args */2];
  var typ = match[/* typ */1];
  var maybeResolve = function (f, value) {
    switch (f.tag | 0) {
      case 0 : 
          return Promise.resolve(value);
      case 1 : 
          return value;
      case 2 : 
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "Should not resolve interface field"
              ];
      
    }
  };
  var resolveArg = function (name, typ, jsArgs, f) {
    var exit = 0;
    if (typeof typ === "number") {
      exit = 1;
    } else if (typ.tag === 2) {
      return Curry._1(f, jsArgs[name]);
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var match = jsArgs[name];
      return Curry._1(f, match !== undefined && !(match == null) ? [match] : /* None */0);
    }
    
  };
  var jsResolve = function (node, jsArgs, ctx) {
    var resolveArgs = function (_args, jsArgs, _f) {
      while(true) {
        var f = _f;
        var args = _args;
        if (args) {
          var match = args[0][0];
          var res = resolveArg(match[/* name */0], match[/* typ */1], jsArgs, f);
          _f = res;
          _args = args[1];
          continue ;
          
        } else {
          return f;
        }
      };
    };
    var convertResultToJs = function (_typ, _nullable, result) {
      while(true) {
        var nullable = _nullable;
        var typ = _typ;
        var exit = 0;
        if (typeof typ === "number") {
          if (typ === 3) {
            return Js_boolean.to_js_boolean(result);
          } else {
            exit = 1;
          }
        } else if (typ.tag === 3) {
          _nullable = /* false */0;
          _typ = typ[0];
          continue ;
          
        } else {
          exit = 1;
        }
        if (exit === 1) {
          if (nullable !== 0) {
            return Js_null_undefined.from_opt(result);
          } else {
            return result;
          }
        }
        
      };
    };
    return maybeResolve(field, resolveArgs(args, jsArgs, Curry._2(resolve, ctx, node))).then((function (res) {
                  return Promise.resolve(convertResultToJs(typ, /* true */1, res));
                }));
  };
  var jsType = toJsType(typ);
  var jsArgs = toJsArgs(args, { });
  return {
          type: jsType,
          args: jsArgs,
          resolve: jsResolve,
          deprecationReason: deprecated ? deprecated[0] : null,
          description: Js_null_undefined.from_opt(match[/* doc */5])
        };
}

function execute(schema, query, rootValue, context, variables) {
  return Graphql.graphql(schema, query, rootValue, context, variables).then((function (result) {
                var match = result.errors;
                if (match == null) {
                  return Promise.resolve(/* Success */Block.__(0, [result.data]));
                } else {
                  return Promise.resolve(/* Error */Block.__(1, [match]));
                }
              }));
}

function validate(schema, query) {
  var ast = Graphql.parse(query);
  return $$Array.map((function (err) {
                var match = err.message;
                return [
                        GraphQLError,
                        match !== undefined ? match : "GraphQLError"
                      ];
              }), Graphql.validate(schema, ast, Graphql.specifiedRules));
}

var string = /* String */0;

var $$float = /* Float */1;

var $$int = /* Int */2;

var bool = /* Bool */3;

var id = /* Id */4;

exports.GraphQLError   = GraphQLError;
exports.interfaceMap   = interfaceMap;
exports.objectMap      = objectMap;
exports.Arg            = Arg;
exports.field          = field;
exports.asyncField     = asyncField;
exports.string         = string;
exports.$$float        = $$float;
exports.$$int          = $$int;
exports.bool           = bool;
exports.id             = id;
exports.nonNull        = nonNull$1;
exports.list           = list$1;
exports.obj            = obj$1;
exports.$$interface    = $$interface;
exports.interfaceField = interfaceField;
exports.jsObjMap       = jsObjMap;
exports.interopJsType  = interopJsType;
exports.toJsType       = toJsType;
exports.toJsArgType    = toJsArgType;
exports.toJsArgs       = toJsArgs;
exports.toJsSchema     = toJsSchema;
exports.execute        = execute;
exports.validate       = validate;
/* interfaceMap Not a pure module */
