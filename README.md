# external-spotify

### Build (untested)

- clone the project
- install node and npm (could be omitted because of mvn clean install should do it)
- install angular globally
- mvn clean install in the root dir (it should install node, npm and all the required modules)
- mvn spring-boot:run

### Development

- After modifying the server, a rerun is necessary, the port of the server is 8080.
- The web needs nothing as long as 'ng serve' is running in the 'external-spotify\external-spotify-web\src\main\web' directory
- The port of the dynamic web is 4200, which is available after the 'ng serve' command
- Currently the 4200 port is supported by default. To use 8080 to its full extent, modify the redirectUri to 8080 in the AuthConfig.java
