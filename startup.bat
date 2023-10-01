@echo off
setLocal enabledelayedexpansion

REM List of directories to navigate into
set "directories=server client socket"

REM command to run
set "command_to_run=npm run dev"

REM Command to run in each directory
for %%d in (%directories%) do (
  REM Check if the directory exists
  if exist %%d (
    REM navigate into the directory
    cd "%%d"

    REM run command
    echo Running "!command_to_run!" in %%d
    start cmd /k !command_to_run!

    REM Navigate back to the original directory (optional)
    cd ..
  ) else (
    echo Directory "%%d" does not exist.
  )
)

endlocal