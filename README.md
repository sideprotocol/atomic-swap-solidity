# inchain-atomic-swap-solidity

## Set up environment.

Based on .env.example file, please create env file and add values.

## Build/Deploy

- `yarn hh:build`
- `yarn hh --network sepolia deploy:inter-chain:lib --f true`
- `yarn hh --network sepolia deploy:inter-chain:contract --f true`
- `yarn hh --network sepolia deploy:inter-chain:setTrustRemote --remote bnb`
- `yarn hh --network bnb deploy:inter-chain:setTrustRemote --remote sepolia`

## Testing

- `yarn hh:test`
