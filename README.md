# Module Federation in WP5

> We use a yarn workspace so you will need yarn to run this. I am going to switch to using Lerna in a later check in.
> For now from the root dir `wp5` we should run:
> `yarn instal`

## Microsites Paradigm

The main concept to understand here is that we have host applications and remotes. Remotes can use other remotes and thus become hosts. (Consumers)
This relationship is defined in webpack config through the configuration object `{...}` that we pass to the new `ModuleFederationPlugin({...})`.
And for the most part is a fixed relationship as the `home` app includes a compile time reference to the the remote `Header` module or any other remotes that needs to fullfil its work. All the setup is done through the configuration object. Open a `webpack.config.js` to see the `ModuleFederationPlugin({...})` configurations that defines what we _expose as modules_, _under which url and scope_ and what _remote dependencies_ we have.

## How module federation works in Webpack

## Resilient Sharing of React components and Error handling

## State Sharing

## Function, Services and Data sharing using module federation

## Federation of WP4 and WP5

## AB testing by loading from different urls

Module Federation can share any type of Javascript code and this allows for:

- A/B testing code - Code for different test variants that you can load on the fly using asynchronous imports
- Feature flags - Javascript objects containing feature flags or settings
- i18n strings - The localization strings for different languages, lazily loaded

  `// imagine we had a method to get language from cookies or other storage const language = detectVisitorLanguage(); import(`locale/\${language}.json`).then(module => { // do something with the translations });`

- Persistent state management or analytics - Javascript code to manage and store persistent state in local storage on the client

## Live preview between applications that one affects the others data

## Fully federated microsites using Router e.g. Home, Racecard, PoolSelection

## Module Federation Dashboard
