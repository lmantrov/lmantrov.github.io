# Technical Writing Portfolio

I am a technical writer specializing in documentation for developer-oriented software and database systems.
I have created this page to showcase my writing style.

## PostgreSQL documentation

As a technical writer at Postgres Professional, I created documentation for several PostgreSQL-based products,
which included both enhanced flavors of vanilla PostgreSQL and various extensions or utilities.
Here you can see some samples of this work.

### Reference

[pg_integrity_check utility](https://drive.google.com/file/d/1OcKDS5TxKXSX-QtdSNJgIVrSxOnPZEHz/view?usp=sharing)

### Task

This instruction was created as part of the Installation guide for Postgres Pro Standard.

<details>
  <summary>Configuring multiple Postgres Pro instances on Windows</summary>

  ### Configuring multiple Postgres Pro instances on Windows

  To set up several Postgres Pro server instances with different data directories:

  1. Install Postgres Pro as explained in
     [GUI installation](https://postgrespro.com/docs/postgrespro/12/binary-installation-on-windows#GUI-INSTALLATION-WIN)
     or [Command-line installation](https://postgrespro.com/docs/postgrespro/12/binary-installation-on-windows#WIN-CLI-INSTALLATION) sections.
     The installed binary files are shared by all Postgres Pro instances, so you need to complete this step only once.

  2. Select an empty folder that your new Postgres Pro instance will use as the data directory.
     For example, `C:\Program Files\PostgresPro\12\data2`. Make sure to grant Full Control
     permissions for this folder to the current OS user that will own the database files and to
     the user on behalf of which the server is running (`NT AUTHORITY\NetworkService` by default).

  3. Run `initdb` specifying the path to the new data directory and any other parameters
     required to initialize another server instance. For example:

     ```
     "C:\Program Files\PostgresPro\12\bin\initdb.exe" --encoding=UTF8 -U "postgres" -D "C:\Program Files\PostgresPro\12\data2"
     ```

     Alternatively, you can stop the running server and copy the contents of the existing data directory
     into the newly created folder. In this case, the new Postgres Pro instance inherits all the settings
     of the original instance, including authentication settings.

  4. Modify `postgresql.conf` settings for the new Postgres Pro instance as required.
     Make sure to specify different ports for your server instances to avoid conflicts.

  5. Open the command prompt as Administrator and register a new Postgres Pro service
     with a unique name. For example, `postgrespro-data2`:

     ```
     "C:\Program Files\PostgresPro\12\bin\pg_ctl.exe" register -N "postgrespro-data2" -U "NT AUTHORITY\NetworkService" -D "C:\Program Files\PostgresPro\12\data2" -w
     ```

  6. Start the registered service:

     ```
     sc start "postgrespro-data2"
     ```

  Once the service is started, your Postgres Pro instance is ready to use. If you need
  any additional Postgres Pro extensions, make sure to enable them for the new instance
  as explained in [Installing additional supplied modules](https://postgrespro.com/docs/postgrespro/12/installing-additional-modules).
</details>

### Concept

This is a description of the jsonpath data type introduced in PostgreSQL for querying JSON data.
The original patch submitted to PostgreSQL is available in the
[official PostgreSQL repository](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commitdiff;h=72b6460336e86ad5cafd3426af6013c7d8457367).

<details>
  <summary>jsonpath type</summary>

  ### jsonpath Type

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

  * Dot `.` is used for member access
  * Square brackets `[]` are used for array access
  * SQL/JSON arrays are 0-relative, unlike regular SQL arrays that start from 1

  An SQL/JSON path expression is an SQL character string literal,
  so it must be enclosed in single quotes when passed to an SQL/JSON
  query function. Following the JavaScript
  conventions, character string literals within the path expression
  must be enclosed in double quotes. Any single quotes within this
  character string literal must be escaped with a single quote
  by the SQL convention.

  A path expression consists of a sequence of path elements,
  which can be the following:

  * Path literals of JSON primitive types: Unicode text, numeric, true, false, or null.
  * Path variables listed in [jsonpath variables](#jsonpath-variables) table.
  * Accessor operators listed in [jsonpath accessors](#jsonpath-accessors) table.
  * jsonpath operators and methods listed in the [jsonpath operators and methods](https://postgrespro.com/docs/postgresql/12/functions-json#FUNCTIONS-SQLJSON-PATH-OPERATORS) table.
  * Parentheses, which can be used to provide filter expressions or define the order of path evaluation.

  For details on using <type>jsonpath</type> expressions with SQL/JSON
  query functions, see [SQL/JSON path language](https://postgrespro.com/docs/postgresql/12/functions-json#FUNCTIONS-SQLJSON-PATH).

  #### jsonpath variables

  | Variable | Description |
  | --- | --- |
  | `$` | A variable representing the JSON text to be queried (the <firstterm>context item</firstterm>). |
  | `$varname` | A named variable. Its value must be set in the <command>PASSING</command> clause of an SQL/JSON query function. See <xref linkend="sqljson-input-clause"/> for details. |
  | `@` | A variable representing the result of path evaluation in filter expressions. |

  #### jsonpath accessors

  | Accessor operator | Description |
  | --- | --- |
  | `.key` <br> `."$varname"` | Member accessor that returns an object member with the specified key. If the key name is a named variable starting with `$` or does not meet the JavaScript rules of an identifier, it must be enclosed in double quotes as a character string literal. |
  | `.*` | Wildcard member accessor that returns the values of all members located at the top level of the current object. |
  | `.**` | Recursive wildcard member accessor that processes all levels of the JSON hierarchy of the current object and returns all the member values, regardless of their nesting level. This is a PostgreSQL extension of the SQL/JSON standard. |
  | `[subscript, ...]` <br> `[subscript to last]` | Array element accessor. The provided numeric subscripts return the corresponding array elements. The first element in an array is accessed with `[0]`. The `last` keyword denotes the last subscript in an array and can be used to handle arrays of unknown length. |
  | `[*]` | Wildcard array element accessor that returns all array elements. |

</details>

## Intel documentation

The projects that I supported at Intel Corporation were quite diverse, but mostly
dealt with performance analysis. I include a couple of old snapshots to complete the picture.

* [Profiling OpenGL/OpenGL ES* frames with Graphics Frame Analyzer](https://drive.google.com/file/d/0B3DZw4r9vC46WXpKcTRaTE5xbVE/view?usp=sharing&resourcekey=0-MvFeU89u2OylskHUNGM2vg)
* [Data fitting functions](https://drive.google.com/file/d/0B3DZw4r9vC46anhXVzd0eE56bEU/view?usp=sharing&resourcekey=0-DwijtvO0F9XAtoN0Hz4dgQ)


## Translated books

I have translated these books from Russian into English:

* [PostgreSQL Internals](https://edu.postgrespro.com/postgresql_internals-14_en.pdf)
* [Postgres: The First Experience](https://edu.postgrespro.ru/introbook_v9_en.pdf)

## Contact info

[LinkedIn](https://www.linkedin.com/in/lmantrov/)