# Configuring multiple Postgres Pro instances on Windows

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