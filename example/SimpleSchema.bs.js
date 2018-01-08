'use strict';

var Schema$BsGraphqlJs = require("../src/Schema.bs.js");

function getViewer() {
  return /* record */[
          /* firstName */"Jane",
          /* lastName */"Mills"
        ];
}

var viewerType = Schema$BsGraphqlJs.obj(/* None */0, "Viewer", /* :: */[
      Schema$BsGraphqlJs.field(/* None */0, /* None */0, /* [] */0, "firstName", Schema$BsGraphqlJs.nonNull(Schema$BsGraphqlJs.string), (function (_, node) {
              return node[/* firstName */0];
            })),
      /* :: */[
        Schema$BsGraphqlJs.field(/* None */0, /* None */0, /* [] */0, "lastName", Schema$BsGraphqlJs.string, (function (_, node) {
                return /* Some */[node[/* lastName */1]];
              })),
        /* [] */0
      ]
    ]);

var schema = Schema$BsGraphqlJs.field(/* None */0, /* None */0, /* [] */0, "viewer", Schema$BsGraphqlJs.nonNull(viewerType), (function (_, _$1) {
        return /* record */[
                /* firstName */"Jane",
                /* lastName */"Mills"
              ];
      }));

var jsSchema = Schema$BsGraphqlJs.toJsSchema(schema);

exports.getViewer  = getViewer;
exports.viewerType = viewerType;
exports.schema     = schema;
exports.jsSchema   = jsSchema;
/* viewerType Not a pure module */
