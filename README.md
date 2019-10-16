## Partie front de l'application

**Pour déployer l'application**

Veillez d'abord à ce que le docker du back-end soit lancé à l'aide de la commande `docker-compose up -d`

Lancez les commandes notifié sur le README.md du projet backend

pour lancer l'environement executer `yarn install` où le `yarn.lock` est situé
Puis le lancer avec `yarn dev`

## Difficulté Rencontrées ##
**Des problèmes ont étés rencontrés pour la mise en place du PUT du fait de l'exploitation des modales en React qui sont des conceptes que j'ai eu du mal à assimilé
Cependant la méthode du PUT reste la même que le POST le seul problème qui aurait pu apparaître serait par rapport aux CORS mais ils ont été géré par le MiddleWare au Niveau de BackEnd