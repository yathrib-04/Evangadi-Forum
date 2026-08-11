# Starts the project's private MySQL instance.
#
# Why this exists: the machine-wide "MySQL80" Windows service needs admin rights
# to start and its root password is unknown, so the project uses its own MySQL
# instance instead - same mysqld binary, but a data directory owned by the
# current user and port 3307 so it can never collide with the service.
#
# This is a normal foreground process, not a service, so it does NOT come back
# automatically after a reboot. Run this script (or `npm run db`) to start it,
# and press Ctrl+C in that window to stop it.

$ErrorActionPreference = "Stop"

$Basedir = "C:\Program Files\MySQL\MySQL Server 8.0"
$Datadir = "C:\Users\hp\evangadi-mysql\data"
$Tmpdir  = "C:\Users\hp\evangadi-mysql\tmp"
$Port    = 3307

if (-not (Test-Path "$Basedir\bin\mysqld.exe")) {
  throw "mysqld.exe not found at $Basedir\bin - update `$Basedir in this script."
}
if (-not (Test-Path $Datadir)) {
  throw "Data directory $Datadir is missing. Re-initialise with:`n" +
        "  & '$Basedir\bin\mysqld.exe' --initialize-insecure --basedir='$Basedir' --datadir='$Datadir'"
}

Write-Host "Starting MySQL on port $Port (Ctrl+C to stop)..."
& "$Basedir\bin\mysqld.exe" `
  --no-defaults `
  --basedir="$Basedir" `
  --datadir="$Datadir" `
  --tmpdir="$Tmpdir" `
  --port=$Port `
  --bind-address=127.0.0.1 `
  --console
