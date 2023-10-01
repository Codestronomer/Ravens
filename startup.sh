#!/bin/bash

# List of directories to navigate to
directories=("client socket server")

# Command
command_to_run="npm run dev"

#Loop through the directories
for dir in "${directories[@]}"; do
  # check if directory exists
  if [-d "$dir" ]; then
    # navigate to the directory
    cd "${dir}"

    # run the command
    echo "Running '${cmmand_to_run}' in ${dir}"
    xterm -e $command_to_run

  else
    echo "Directory '$dir' does not exist."
  fi
done