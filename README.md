# external-spotify

### Build (untested)

- clone the project
- install node and npm (could be omited because of mvn clean install)
- install angular globally
- mvn clean install in the root dir (it should install node, npm and all modules
- mvn spring-boot:run

### Development

- After modifying the server, a rerun is necessary, the port of the server is 8080
- The web needs does need nothing as long as 'ng serve' is running in the 'external-spotify\external-spotify-web\src\main\web' directory
- The port of the dynamic web is 4200, which is available after the 'ng serve' command
