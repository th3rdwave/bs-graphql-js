'use strict';

var List                    = require("bs-platform/lib/js/list.js");
var $$Array                 = require("bs-platform/lib/js/array.js");
var Block                   = require("bs-platform/lib/js/block.js");
var Curry                   = require("bs-platform/lib/js/curry.js");
var Hashtbl                 = require("bs-platform/lib/js/hashtbl.js");
var Graphql                 = require("graphql");
var Js_boolean              = require("bs-platform/lib/js/js_boolean.js");
var Caml_exceptions         = require("bs-platform/lib/js/caml_exceptions.js");
var CamlinternalLazy        = require("bs-platform/lib/js/camlinternalLazy.js");
var Js_null_undefined       = require("bs-platform/lib/js/js_null_undefined.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var GraphQLError = Caml_exceptions.create("Schema-BsGraphqlJs.GraphQLError");

var interfaceMap = Hashtbl.create(/* None */0, 10);

var objectMap = Hashtbl.create(/* None */0, 10);

var toJsDoc = Js_null_undefined.from_opt;

function toJsDeprecationReason(d) {
  if (d) {
    return d[0];
  } else {
    return null;
  }
}

function enumValue(doc, $staropt$star, name, value) {
  var deprecated = $staropt$star ? $staropt$star[0] : /* NotDeprecated */0;
  return /* record */[
          /* name */name,
          /* doc */doc,
          /* deprecated */deprecated,
          /* value */value
        ];
}

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

function $$enum(doc, name, values) {
  return /* Enum */Block.__(3, [/* record */[
              /* name */name,
              /* doc */doc,
              /* values */values
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
  /* enum */$$enum,
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

function $$enum$1(doc, name, values) {
  return /* Enum */Block.__(5, [/* record */[
              /* name */name,
              /* doc */doc,
              /* values */values
            ]]);
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
          var fields = match[/* fields */1];
          var name = match[/* name */0];
          try {
            return Hashtbl.find(objectMap, name);
          }
          catch (exn){
            if (exn === Caml_builtin_exceptions.not_found) {
              var jsObject = new Graphql.GraphQLObjectType({
                    name: name,
                    fields: (function () {
                        var tag = fields.tag | 0;
                        return jsObjMap(List.map((function (f) {
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
                                        }), tag === 250 ? fields[0] : (
                                          tag === 246 ? CamlinternalLazy.force_lazy_block(fields) : fields
                                        )));
                      }),
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
          var fields$1 = match$1[/* fields */1];
          var name$1 = match$1[/* name */0];
          try {
            return Hashtbl.find(interfaceMap, name$1);
          }
          catch (exn$1){
            if (exn$1 === Caml_builtin_exceptions.not_found) {
              var jsInterface = new Graphql.GraphQLInterfaceType({
                    name: name$1,
                    fields: (function () {
                        var tag = fields$1.tag | 0;
                        return jsObjMap(List.map((function (f) {
                                          var exit = 0;
                                          switch (f.tag | 0) {
                                            case 0 : 
                                            case 1 : 
                                                exit = 1;
                                                break;
                                            case 2 : 
                                                var match = f[0];
                                                return /* tuple */[
                                                        match[/* name */0],
                                                        {
                                                          type: toJsType(match[/* typ */1]),
                                                          description: Js_null_undefined.from_opt(match[/* doc */2])
                                                        }
                                                      ];
                                            
                                          }
                                          if (exit === 1) {
                                            var match$1 = f[0];
                                            return /* tuple */[
                                                    match$1[/* name */0],
                                                    {
                                                      type: toJsType(match$1[/* typ */1]),
                                                      description: Js_null_undefined.from_opt(match$1[/* doc */5])
                                                    }
                                                  ];
                                          }
                                          
                                        }), tag === 250 ? fields$1[0] : (
                                          tag === 246 ? CamlinternalLazy.force_lazy_block(fields$1) : fields$1
                                        )));
                      })
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
      case 5 : 
          var match$2 = typ[0];
          var name$2 = match$2[/* name */0];
          return new GraphQLEnumType({
                      name: name$2,
                      values: jsObjMap(List.map((function (v) {
                                  return /* tuple */[
                                          name$2,
                                          {
                                            value: v[/* name */0],
                                            deprecationReason: toJsDeprecationReason(v[/* deprecated */2]),
                                            description: Js_null_undefined.from_opt(v[/* doc */1])
                                          }
                                        ];
                                }), match$2[/* values */2])),
                      description: Js_null_undefined.from_opt(match$2[/* doc */1])
                    });
      
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
      case 3 : 
          var match$1 = typ[0];
          var name = match$1[/* name */0];
          return new GraphQLEnumType({
                      name: name,
                      values: jsObjMap(List.map((function (v) {
                                  return /* tuple */[
                                          name,
                                          {
                                            value: v[/* name */0],
                                            deprecationReason: toJsDeprecationReason(v[/* deprecated */2]),
                                            description: Js_null_undefined.from_opt(v[/* doc */1])
                                          }
                                        ];
                                }), match$1[/* values */2])),
                      description: Js_null_undefined.from_opt(match$1[/* doc */1])
                    });
      
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
  var parseArg = function (name, typ, value, nullable) {
    if (value) {
      var value$1 = value[0];
      var res;
      if (typeof typ === "number") {
        res = value$1;
      } else {
        switch (typ.tag | 0) {
          case 2 : 
              res = parseArg(name, typ[0], /* Some */[value$1], /* false */0);
              break;
          case 3 : 
              res = List.find((function (v) {
                      return +(v[/* name */0] === value$1);
                    }), typ[0][/* values */2]);
              break;
          default:
            res = value$1;
        }
      }
      if (nullable !== 0) {
        if (res == null) {
          return /* None */0;
        } else {
          return [res];
        }
      } else {
        return res;
      }
    } else {
      return /* None */0;
    }
  };
  var resolveArg = function (name, typ, jsArgs, f) {
    var match = jsArgs[name];
    var value = match !== undefined && !(match == null) ? [match] : /* None */0;
    return Curry._1(f, parseArg(name, typ, value, /* true */1));
  };
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
  var jsResolve = function (node, jsArgs, ctx) {
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
          deprecationReason: toJsDeprecationReason(match[/* deprecated */4]),
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

exports.GraphQLError          = GraphQLError;
exports.interfaceMap          = interfaceMap;
exports.objectMap             = objectMap;
exports.toJsDoc               = toJsDoc;
exports.toJsDeprecationReason = toJsDeprecationReason;
exports.enumValue             = enumValue;
exports.Arg                   = Arg;
exports.field                 = field;
exports.asyncField            = asyncField;
exports.string                = string;
exports.$$float               = $$float;
exports.$$int                 = $$int;
exports.bool                  = bool;
exports.id                    = id;
exports.nonNull               = nonNull$1;
exports.list                  = list$1;
exports.$$enum                = $$enum$1;
exports.obj                   = obj$1;
exports.$$interface           = $$interface;
exports.interfaceField        = interfaceField;
exports.jsObjMap              = jsObjMap;
exports.interopJsType         = interopJsType;
exports.toJsType              = toJsType;
exports.toJsArgType           = toJsArgType;
exports.toJsArgs              = toJsArgs;
exports.toJsSchema            = toJsSchema;
exports.execute               = execute;
exports.validate              = validate;
/* interfaceMap Not a pure module */
