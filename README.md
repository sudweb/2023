# SudWeb 2023

## TL;DR

```shell
# Récupérer les sources du projet :
git clone https://github.com/sudweb/2023.git sudweb-2023
cd sudweb-2023

# S'assurer d'avoir la bonne version de node :
nvm use

# Installer les dépendances :
npm ci
```

### Mode développement, sans les fonctions (AWS Lambda)

```shell
npm start
```

### Mode développement, avec les fonctions (AWS Lambda)

*Nécessite d'avoir accès et d'être identifié au compte sur Netlify*

```shell
# Installer globalement le client Netlify :
npm i -g netlify-cli

netlify develop
```

### Générer le site static

```shell
npm run build
```

## Plus en détails

1. S'assurer d'être en **node 18**  
   *(sinon [utiliser nvm](https://github.com/nvm-sh/nvm) pour gérer différentes
   version, et passer sur la 18)*
2. Ne jamais utiliser `npm i`/`npm install` pour autre chose qu'ajouter un
   nouvelle dépendance. Quand on veut installer les dépendances déjà déclarée,
   utiliser `npm ci`.
3. Ajouter l'option `-legacy-peer-deps` (et non `-force`) car certaines
   dépendances sont un peu à la traîne.
4. `npm run build` permet de générer l'ensemble du site statique dans le dossier
   `/public` ensuite `npm run serve` permet de le servir sur `localhost:9000`
5. Pour le mode de développement (rafraîchissements automatiques), il faut
   lancer `npm start` ou bien `npm run develop` et le mode dev se lance sur
   `localhost:8000`. Tout devrait fonctionner sauf l'envoi des formulaires.
6. Pour que les formulaires fonctionnent :
   - Il faut installer globalement `netlify-cli` → `npm i -g netlify-cli`,
   - Avoir les variables d'environnement avec les bons tokens *(soit en
   identifiant netlify-cli avec `netlify login` qui récupérera les variables en
   ligne, soit en [fournissant directement à
   l'environnement](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/))*
   - Lancer le mode dev avec `netlify dev` qui va lancer le Gatsby lui même, et
     nous servir ça sur `localhost:8888`, et là, même l'envoi des formulaires
     sera fonctionnel.
7. Pousser sur la branche `main` du dépôt déploie automatiquement
   l’environnement de production (en environ 1 minute)
