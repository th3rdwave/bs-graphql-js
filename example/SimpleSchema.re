open BsGraphqlJs.Schema;

type viewer = {
  firstName: string,
  lastName: string
};

let getViewer = () => {firstName: "Jane", lastName: "Mills"};

type ctx = unit;

let viewerType =
  obj(
    "Viewer",
    ~fields=[
      /* Simple non null field */
      field("firstName", ~typ=nonNull(string), ~args=[], ~resolve=(_ctx, node) =>
        node.firstName
      ),
      /* Simple nullable field */
      field("lastName", ~typ=string, ~args=[], ~resolve=(_ctx, node) =>
        Some(node.lastName)
      )
    ]
  );

/* Type annotation for the root field is required */
let schema: field(ctx, unit) =
  field("viewer", ~typ=nonNull(viewerType), ~args=[], ~resolve=(_ctx, _node) =>
    getViewer()
  );

let jsSchema = toJsSchema(schema);
