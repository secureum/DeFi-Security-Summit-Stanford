for (( V=0; V<=3; V++ ))
do
    printf "Check if Challenge $V has been solved:\n"
    forge test -vv --match-path test/Challenge$V.t.sol
    printf "\n================================================\n\n"
done