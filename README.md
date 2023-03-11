# SudWeb 2023

## Développement

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