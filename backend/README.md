# Patika
- Java 17
- Spring Framework
- Spring Boot
- Spring MVC
- Spring Data
- Spring Rest(http status)
- Spring security
 
---

### System Login
> Register
> Login (username + password)
> Authorization(Jwt)
 
---

## Lesson Steps
> Spring Framework
> Spring Boot
> Spring MVC
> Spring Data (Jpa Hibernate)
> Spring Rest (RestFull ==> Jersey)
> Spring Security

---

### Reference Documentation
* [Github](https://github.com/m1erla)
* [H2 Console](http://localhost:8080/h2-console/l)
* [Swagger](http://localhost:8080/swagger-ui/index.html#/)
 
---

### Project Steps
1. @Bean 
2. Dto
3. BaseEntity (@MappedSuperclass)
4. UserEntity (@Entity)
5. CarEntity (@Entity)
6. ImageEntity(@Entity)
7. UserRepository (@Repository)
8. CarRepository(@Repository)
9. ImageRepository(@Repository)
10. UsereServices (interface)
11. UserServiceImpl(@Service)
12. CarManager(@Service)
13. ImageManager(@Service)
14. UserManager(@Service)
15. ResourceNotFoundException(@ResponseStatus)
16. HandleSecuritySystem(JWT, Token Provider, Security Config)
17. UserController(@RestController)
18. CarController(@RestController)
19. ImageController(@RestController)

---

### Unit Test
1. TestCrud (interface)
2. @SpringBootTest

---

### Auditing
1. @SpringBootApplication


---
```sh 
1. Deneme

```



## Docker Deployment
```sh
1.ADIM
$     ./mvnw clean package -DskipTests

2.ADIM
$    docker-compose up
$    docker ps


######POSTMAN###########
3.ADIM
POSTMAN
// API
http://localhost:8080/auth/register
http://localhost:8080/auth/login
http://localhost:8080/cars
http://localhost:8080/images
http://localhost:8080/users

//ADDITION - POST
http://localhost:8080/auth/register
http://localhost:8080/auth/login
http://localhost:8080/cars
http://localhost:8080/images
http://localhost:8080/users


//TO LIST - GET
http://localhost:8080/users
http://localhost:8080/cars
http://localhost:8080/images



//FIND - GET
http://localhost:8080/cars/1
http://localhost:8080/images/carId/1
http://localhost:8080/users/1



//DELETE
http://localhost:8080/cars/1
http://localhost:8080/images/carId/1
http://localhost:8080/users/1




4.ADIM
$    crudACar=#  \dt ==> Show tables
$    crudACar=#  select * from product
$    crudACar=#  \q ==> EXIT

```
