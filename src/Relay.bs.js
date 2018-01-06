'use strict';

var Curry              = require("bs-platform/lib/js/curry.js");
var GraphqlRelay       = require("graphql-relay");
var Schema$BsGraphqlJs = require("./Schema.bs.js");

function globalIdField(typeName, resolve) {
  return Schema$BsGraphqlJs.field(/* Some */["The ID of an object"], /* None */0, /* [] */0, "id", Schema$BsGraphqlJs.nonNull(Schema$BsGraphqlJs.id), (function (_, node) {
                return GraphqlRelay.toGlobalId(typeName, Curry._1(resolve, node));
              }));
}

var Node = /* module */[/* globalIdField */globalIdField];

function Connection() {
  var empty = function () {
    return /* record */[
            /* edges : array */[],
            /* pageInfo : record */[
              /* hasNextPage : false */0,
              /* hasPreviousPage : false */0,
              /* startCursor : None */0,
              /* endCursor : None */0
            ]
          ];
  };
  var forwardsArgs = function () {
    return /* :: */[
            Schema$BsGraphqlJs.Arg[/* arg */0](/* None */0, "first", Schema$BsGraphqlJs.Arg[/* int */7]),
            /* :: */[
              Schema$BsGraphqlJs.Arg[/* arg */0](/* None */0, "after", Schema$BsGraphqlJs.Arg[/* string */5]),
              /* [] */0
            ]
          ];
  };
  var pageInfoType = Schema$BsGraphqlJs.obj(/* Some */["Information about pagination in a connection."], "BsPageInfo", /* :: */[
        Schema$BsGraphqlJs.field(/* Some */["When paginating forwards, are there more items?"], /* None */0, /* [] */0, "hasNextPage", Schema$BsGraphqlJs.nonNull(Schema$BsGraphqlJs.bool), (function (_, node) {
                return node[/* hasNextPage */0];
              })),
        /* :: */[
          Schema$BsGraphqlJs.field(/* Some */["When paginating backwards, are there more items?"], /* None */0, /* [] */0, "hasPreviousPage", Schema$BsGraphqlJs.nonNull(Schema$BsGraphqlJs.bool), (function (_, node) {
                  return node[/* hasPreviousPage */1];
                })),
          /* :: */[
            Schema$BsGraphqlJs.field(/* Some */["When paginating backwards, the cursor to continue."], /* None */0, /* [] */0, "startCursor", Schema$BsGraphqlJs.string, (function (_, node) {
                    return node[/* startCursor */2];
                  })),
            /* :: */[
              Schema$BsGraphqlJs.field(/* Some */["When paginating forwards, the cursor to continue."], /* None */0, /* [] */0, "endCursor", Schema$BsGraphqlJs.string, (function (_, node) {
                      return node[/* endCursor */3];
                    })),
              /* [] */0
            ]
          ]
        ]
      ]);
  var definitions = function (name, nodeType) {
    var edgeType = Schema$BsGraphqlJs.obj(/* Some */["An edge in a connection."], name + "Edge", /* :: */[
          Schema$BsGraphqlJs.field(/* Some */["The item at the end of the edge"], /* None */0, /* [] */0, "node", Schema$BsGraphqlJs.nonNull(nodeType), (function (_, node) {
                  return node[/* node */0];
                })),
          /* :: */[
            Schema$BsGraphqlJs.field(/* Some */["A cursor for use in pagination"], /* None */0, /* [] */0, "cursor", Schema$BsGraphqlJs.nonNull(Schema$BsGraphqlJs.string), (function (_, node) {
                    return node[/* cursor */1];
                  })),
            /* [] */0
          ]
        ]);
    var connectionType = Schema$BsGraphqlJs.obj(/* Some */["A connection to a list of items."], name + "Connection", /* :: */[
          Schema$BsGraphqlJs.field(/* Some */["Information to aid in pagination."], /* None */0, /* [] */0, "pageInfo", Schema$BsGraphqlJs.nonNull(pageInfoType), (function (_, node) {
                  return node[/* pageInfo */1];
                })),
          /* :: */[
            Schema$BsGraphqlJs.field(/* Some */["A list of edges."], /* None */0, /* [] */0, "edges", Schema$BsGraphqlJs.nonNull(Schema$BsGraphqlJs.list(Schema$BsGraphqlJs.nonNull(edgeType))), (function (_, node) {
                    return node[/* edges */0];
                  })),
            /* [] */0
          ]
        ]);
    return /* record */[
            /* edgeType */edgeType,
            /* connectionType */connectionType
          ];
  };
  return /* module */[
          /* empty */empty,
          /* forwardsArgs */forwardsArgs,
          /* pageInfoType */pageInfoType,
          /* definitions */definitions
        ];
}

exports.Node       = Node;
exports.Connection = Connection;
/* graphql-relay Not a pure module */
