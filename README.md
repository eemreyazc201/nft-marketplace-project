# nft-marketplace-project

github'ı pull ettikten sonra .env.example yerine .env'yi şöyle doldurun:

```
REACT_APP_PROJECT_ID=87b19285bd7e81f2a2dc76728f6eb331
PRIVATE_KEY=dca69df7e07e190f291d8a03f903c701c987025e24c12015b0d27521cacecd6f
ALCHEMY_API_KEY=nMv0zIx01zhL2MLPMFtybc3hrZPhLe2X
ETHERSCAN_API_KEY=AGA9WFB74T2D84V8QG6GK43HD797SUQ3H7
```

### Hardhat Üzerinde Deploy Etmek İçin

```
yarn chain
yarn deploy
```
### Sepolia Üzerinde Deploy Etmek İçin

hardhat.config.js dosyasında "defaultNetwork: sepolia" yap. Arıdından terminalde "yarn deploy" yapman yeterli

ya da

```
hardhat run ./src/backend/scripts/deploy.js --network sepolia
```