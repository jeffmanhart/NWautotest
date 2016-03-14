function nwWrapper {
export LAUNCHURL=$1
`which nightwatch` --test $2
}
