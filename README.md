# lptest
LP test

# INSTALLATION

### Installer les dépendances pour symfony
composer update

### Lancer Docker
docker-compose up -d

### Se connecter au container pour pouvoir lancer les migrations pour symfony
docker exec -it www_docker_symfony bash

### Créer la base de donnée
php bin/console doctrine:database:create

### Créer et Lancer les migations
php bin/console make:migration
php bin/console doctrine:migrations:migrate

### Charger les fixtures
php bin/console doctrine:fixtures:load

## Lancer l'appli angular (/angular-lp-test)

### Installer le dependances
npm install

### Lancer l'appli sur serveur local
ng serve --open  

Angular CLI: 13.2.3  
Node: 16.10.0  
Package Manager: npm 7.24.0  
OS: linux x64  

Angular: 13.2.2  
... animations, common, compiler, compiler-cli, core, forms  
... platform-browser, platform-browser-dynamic, router  

Package                         Version  
---------------------------------------------------------  
@angular-devkit/architect       0.1302.3  
@angular-devkit/build-angular   13.2.3    
@angular-devkit/core            13.2.3  
@angular-devkit/schematics      13.2.3  
@angular/cli                    13.2.3  
@schematics/angular             13.2.3  
rxjs                            7.5.4  
typescript                      4.5.5  
