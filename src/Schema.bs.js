'use strict';

var List              = require("bs-platform/lib/js/list.js");
var $$Array           = require("bs-platform/lib/js/array.js");
var Block             = require("bs-platform/lib/js/block.js");
var Curry             = require("bs-platform/lib/js/curry.js");
var Graphql           = require("graphql");
var Js_boolean        = require("bs-platform/lib/js/js_boolean.js");
var Caml_exceptions   = require("bs-platform/lib/js/caml_exceptions.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");

var GraphQLError = Caml_exceptions.create("Schema-BsGraphqlJs.GraphQLError");

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
  return /* NonNull */Block.__(2, [t]);
}

function list$1(t) {
  return /* List */Block.__(3, [t]);
}

function obj$1(doc, name, fields) {
  return /* Object */Block.__(0, [/* record */[
              /* name */name,
              /* fields */fields,
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
          return new Graphql.GraphQLObjectType({
                      name: match[/* name */0],
                      fields: jsObjMap(List.map((function (f) {
                                  if (f.tag) {
                                    var f$1 = f[0];
                                    return /* tuple */[
                                            f$1[/* name */0],
                                            toJsSchema(/* AsyncField */Block.__(1, [f$1]))
                                          ];
                                  } else {
                                    var f$2 = f[0];
                                    return /* tuple */[
                                            f$2[/* name */0],
                                            toJsSchema(/* Field */Block.__(0, [f$2]))
                                          ];
                                  }
                                }), match[/* fields */1])),
                      description: Js_null_undefined.from_opt(match[/* doc */2])
                    });
      case 1 : 
          return typ[0];
      case 2 : 
          return new Graphql.GraphQLNonNull(toJsType(typ[0]));
      case 3 : 
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
  var f = field[0];
  var deprecated = f[/* deprecated */4];
  var resolve = f[/* resolve */3];
  var args = f[/* args */2];
  var typ = f[/* typ */1];
  var maybeResolve = function (f, value) {
    if (f.tag) {
      return value;
    } else {
      return Promise.resolve(value);
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
        } else if (typ.tag === 2) {
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
          description: Js_null_undefined.from_opt(f[/* doc */5])
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

exports.GraphQLError  = GraphQLError;
exports.Arg           = Arg;
exports.field         = field;
exports.asyncField    = asyncField;
exports.string        = string;
exports.$$float       = $$float;
exports.$$int         = $$int;
exports.bool          = bool;
exports.id            = id;
exports.nonNull       = nonNull$1;
exports.list          = list$1;
exports.obj           = obj$1;
exports.jsObjMap      = jsObjMap;
exports.interopJsType = interopJsType;
exports.toJsType      = toJsType;
exports.toJsArgType   = toJsArgType;
exports.toJsArgs      = toJsArgs;
exports.toJsSchema    = toJsSchema;
exports.execute       = execute;
exports.validate      = validate;
/* graphql Not a pure module */
