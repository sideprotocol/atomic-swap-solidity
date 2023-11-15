# Vesting Contract Specification

### Motivation

To provide a decentralized, secure, and flexible mechanism for managing token vesting on the Ethereum blockchain. This contract aims to facilitate the vesting of tokens in a manner that aligns with the interests of stakeholders, ensuring a controlled and predictable release of tokens.

### Definitions

- `Vesting`: The process by which a beneficiary gradually gains access to a certain amount of tokens.
- `Vesting Schedule`: A predefined timeline that outlines when and how much of the vested tokens become accessible to the beneficiary.
- `Beneficiary`: The individual or entity that is eligible to receive the vested tokens.
- `Releases`: Periodic events where a certain percentage of vested tokens become available to the beneficiary.

### Objectives

- `Decentralized Administration`: The contract operates without central authority control.
- `Security`: Ensures that the vested tokens are secure and only released according to the predefined schedule.
- `Flexibility`: Allows for various vesting schedules to accommodate different requirements.
- `Transparency`: All vesting schedules and releases are recorded on the blockchain, providing clear and accessible information.

### User Roles

- `Admin`: Responsible for initializing the contract with necessary parameters.
- `Beneficiary`: Receives the vested tokens according to the vesting schedule.

### Vesting Process

#### Setting Up Vesting

1. Admin initializes the contract with treasury and seller fee details.
2. A vesting schedule is created for each beneficiary, specifying the token type, total amount, and release information.

#### Releasing Tokens

1. Upon reaching a release date, the beneficiary can claim their vested tokens.
2. The contract calculates the amount of tokens to be released and transfers them to the beneficiary.
3. Fees are deducted and transferred to the treasury.

#### Vesting Schedule Data Structure

```solidity
struct VestingSchedule {
  address from;
  uint256 start;
  address token;
  uint256 totalAmount;
  uint256 amountReleased;
  uint lastReleasedStep;
}
```

### Fees

- **Seller Fee**: A predefined percentage fee deducted from each token release, transferred to the treasury.

### Escrow Mechanism

- `Token Locking`: Tokens are locked in the contract until the vesting schedule allows for their release.

### Implementation Details

#### Initialization

The contract is initialized with the admin, treasury, and seller fee.

#### Starting Vesting

Vesting for a beneficiary is initiated with specific token and vesting details.

#### Releasing Tokens

Beneficiaries claim their vested tokens through the `release` function, which handles the calculation and transfer of tokens.

### Handling Data for Query

- Users can query the vesting schedules and release information for each beneficiary.

### Future Improvements

- Integration with other DeFi protocols and governance models.
- Enhanced security features and flexible vesting options.

### Conclusion

The Vesting Contract provides a secure, transparent, and flexible way to manage token vesting, ensuring a fair and predictable release of assets.
