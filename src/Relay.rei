module Node: {
  let toGlobalId: (~typ: string, ~id: string) => string;
  type fromGlobalIdResult = {
    [@bs.as "type"]
    type_: string,
    id: string,
  };
  let fromGlobalId: string => fromGlobalIdResult;
  let globalIdField: (string, ~resolve: 'a => string) => Schema.field('b, 'a);
};
module Connection: {
  type pageInfo = {
    hasNextPage: bool,
    hasPreviousPage: bool,
    startCursor: option(string),
    endCursor: option(string),
  };
  type edge('t) = {
    node: 't,
    cursor: string,
  };
  type t('t) = {
    edges: array(edge('t)),
    pageInfo,
  };
  let empty: unit => t('a);
  let fromArray:
    (
      ~first: int=?,
      ~last: int=?,
      ~before: string=?,
      ~after: string=?,
      array('a)
    ) =>
    t('a);
  let forwardsArgs:
    unit =>
    BsGraphqlJs.Schema.Arg.argList('a, (option(int), option(string)) => 'a);
  let pageInfoType: unit => BsGraphqlJs.Schema.typ('a, option(pageInfo));
  type definition('a, 'b) = {
    edgeType: 'a,
    connectionType: 'b,
  };
  let definitions:
    (string, ~nodeType: BsGraphqlJs.Schema.typ('a, option('b))) =>
    definition(
      BsGraphqlJs.Schema.typ('a, option(edge('b))),
      BsGraphqlJs.Schema.typ('a, option(t('b))),
    );
};
