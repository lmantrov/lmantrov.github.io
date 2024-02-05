# jsonpath type

The jsonpath type implements support for the SQL/JSON path language
in PostgreSQL to effectively query JSON data.
It provides a binary representation of the parsed SQL/JSON path
expression that specifies the items to be retrieved by the path
engine from the JSON data for further processing with the
SQL/JSON query functions.

The SQL/JSON path language is fully integrated into the SQL engine:
the semantics of its predicates and operators generally follow SQL.
At the same time, to provide a most natural way of working with JSON data,
SQL/JSON path syntax uses some of the JavaScript conventions:

- Dot `.` is used for member access
- Square brackets `[]` are used for array access
- SQL/JSON arrays are 0-relative, unlike regular SQL arrays that start from 1

An SQL/JSON path expression is an SQL character string literal,
so it must be enclosed in single quotes when passed to an SQL/JSON
query function. Following the JavaScript
conventions, character string literals within the path expression
must be enclosed in double quotes. Any single quotes within this
character string literal must be escaped with a single quote
by the SQL convention.

A path expression consists of a sequence of path elements,
which can be the following:

- Path literals of JSON primitive types: Unicode text, numeric, true, false, or null.
- Path variables listed in [jsonpath variables](#jsonpath-variables) table.
- Accessor operators listed in [jsonpath accessors](#jsonpath-accessors) table.
- jsonpath operators and methods listed in the [jsonpath operators and methods](https://postgrespro.com/docs/postgresql/12/functions-json#FUNCTIONS-SQLJSON-PATH-OPERATORS) table.
- Parentheses, which can be used to provide filter expressions or define the order of path evaluation.

For details on using <type>jsonpath</type> expressions with SQL/JSON
query functions, see [SQL/JSON path language](https://postgrespro.com/docs/postgresql/12/functions-json#FUNCTIONS-SQLJSON-PATH).

## jsonpath variables

| Variable | Description |
| --- | --- |
| `$` | A variable representing the JSON text to be queried (the <firstterm>context item</firstterm>). |
| `$varname` | A named variable. Its value must be set in the <command>PASSING</command> clause of an SQL/JSON query function. See <xref linkend="sqljson-input-clause"/> for details. |
| `@` | A variable representing the result of path evaluation in filter expressions. |

## jsonpath accessors

| Accessor operator | Description |
| --- | --- |
| `.key` <br> `."$varname"` | Member accessor that returns an object member with the specified key. If the key name is a named variable starting with `$` or does not meet the JavaScript rules of an identifier, it must be enclosed in double quotes as a character string literal. |
| `.*` | Wildcard member accessor that returns the values of all members located at the top level of the current object. |
| `.**` | Recursive wildcard member accessor that processes all levels of the JSON hierarchy of the current object and returns all the member values, regardless of their nesting level. This is a PostgreSQL extension of the SQL/JSON standard. |
| `[subscript, ...]` <br> `[subscript to last]` | Array element accessor. The provided numeric subscripts return the corresponding array elements. The first element in an array is accessed with `[0]`. The `last` keyword denotes the last subscript in an array and can be used to handle arrays of unknown length. |
| `[*]` | Wildcard array element accessor that returns all array elements. |