open Schema;

type role =
  | User
  | Admin;

type viewer = {
  firstName: string,
  lastName: string,
  role,
};

let getViewer = () => {firstName: "Jane", lastName: "Mills", role: Admin};

type ctx = unit;

let roleEnum =
  enum(
    "Role",
    ~values=[
      enumValue("USER", ~value=User),
      enumValue("ADMIN", ~value=Admin),
    ],
  );

let viewerType =
  obj(
    "Viewer",
    ~fields=
      lazy [
        /* Simple non null field */
        field(
          "firstName", ~typ=nonNull(string), ~args=[], ~resolve=(_ctx, node) =>
          node.firstName
        ),
        /* Simple nullable field */
        field("lastName", ~typ=string, ~args=[], ~resolve=(_ctx, node) =>
          Some(node.lastName)
        ),
        /* Simple enum field */
        field(
          "role", ~typ=nonNull(roleEnum), ~args=[], ~resolve=(_ctx, node) =>
          node.role
        ),
      ],
  );

/* Type annotation for the root field is required */
let schema: field(ctx, unit) =
  field("viewer", ~typ=nonNull(viewerType), ~args=[], ~resolve=(_ctx, _node) =>
    getViewer()
  );

let jsSchema = toJsSchema(schema);
