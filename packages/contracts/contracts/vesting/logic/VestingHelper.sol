// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {IAtomicSwapBase} from "../../abstracts/interfaces/IAtomicSwapBase.sol";
import {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import {TransferHelperWithVault} from "../../abstracts/libs/TransferHelperWithVault.sol";
library VestingHelper { 
      /// @notice Validates vesting parameters for an atomic swap.
    /// @param releases Array of release schedules for the vesting.
    /// @dev Ensures the total percentage of releases equals 100% and the number of releases is within limits.
    function validateVestingParams(IAtomicSwapBase.Release[] memory releases) internal pure {
        if (releases.length == 0) {
            revert IAtomicSwapBase.ZeroReleaseSchedule();
        }

        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < releases.length; i++) {
            uint256 percentage = releases[i].percentage;
            if (percentage == 0) {
                revert IAtomicSwapBase.InvalidReleasePercentage();
            }
            totalPercentage += percentage;
        }

        if (totalPercentage != 10000) {
            revert IAtomicSwapBase.InvalidTotalPercentage();
        }

        if (releases.length > 150) {
            revert IAtomicSwapBase.OverMaximumReleaseStep();
        }
    }

    function transferFrom(
        address vault,
        address token, 
        uint amount,
        bool isWithdraw
    ) internal {
        if(!isWithdraw) {
            TransferHelperWithVault.safeTransferFrom(
                vault,
                token,
                msg.sender, 
                address(this), 
                amount
            );
        }else{
            if (token == address(0)) {
                if (msg.value != amount) {
                    revert IAtomicSwapBase.NotEnoughFund(amount, msg.value);
                }
            } else {
                TransferHelper.safeTransferFrom(
                    token,
                    msg.sender, address(this), amount
                );
            }
        }
    }
}