# lptest
LP test

INSTALLATION

Lancer Docker
docker-compose up -d

Basculer dans les container Docker pour pouvoir lancer les migrations pour symfony
docker exec -it www_docker_symfony bash

Créer la base de donnée
php bin/console doctrine:database:create

Créer et Lancer les migations
php bin/console make:migration
php bin/console doctrine:migrations:migrate

Charger les fixtures
php bin/console doctrine:fixtures:load

Lancer l'appli angular dans le navigateur
