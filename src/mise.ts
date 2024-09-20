const completionSpec: Fig.Spec = {
  name: "mise",
  description: "The front-end to your dev env",
  subcommands: [
    {
      name: "activate",
      description: "Initializes mise in the current shell session",
      subcommands: [
        {
          name: "my_nested_subcommand",
          description:
            "Nested subcommand, example usage: 'mise my_subcommand my_nested_subcommand'",
        },
      ],
    },
    {
      name: ["alias", "a"],
      description: "Manage aliases]",
    },
    {
      name: ["backend", "b"],
      description: "Manage backends",
    },
    {
      name: "bin-paths",
      description: "List all the active runtime bin paths",
    },
    {
      name: "cache",
      description: "Manage the mise cache",
    },
    {
      name: "completion",
      description: "Generate shell completions",
    },
    {
      name: ["config", "cfg"],
      description: "[experimental] Manage config files",
    },
    {
      name: "current",
      description: "Shows current active and installed runtime versions",
    },
    {
      name: "deactivate",
      description: "Disable mise for current shell session",
    },
    {
      name: "direnv",
      description: "Output direnv function to use mise inside direnv",
    },
    {
      name: ["doctor", "dr"],
      description: "Check mise installation for possible problems",
    },
    {
      name: ["env", "e"],
      description: "Exports env vars to activate mise a single time",
    },
    {
      name: ["exec", "x"],
      description: "Execute a command with tool(s) set",
    },
    {
      name: ["generate", "gen"],
      description: "[experimental] Generate files for various tools/services",
    },
    {
      name: "implode",
      description: "Removes mise CLI and all related data",
    },
    {
      name: ["install", "i"],
      description: "Install a tool version",
      args: {
        name: "TOOL@VERSION",
        description: "Tool(s) to install e.g.: node@20",
        isOptional: true,
      },
    },
    {
      name: "latest",
      description: "Gets the latest available version for a plugin",
    },
    {
      name: ["link", "ln"],
      description: "Symlinks a tool version into mise",
    },
    {
      name: ["ls", "list"],
      description: "List installed and active tool versions",
    },
    {
      name: "ls-remote",
      description: "List runtime versions available for install",
    },
    {
      name: "outdated",
      description: "Shows outdated tool versions",
    },
    {
      name: ["plugins", "p"],
      description: "Manage plugins",
      subcommands: [
        {
          name: ["install", "i", "a", "add"],
          description: "Install a plugin\ne.g.: node, ruby",
          args: [
            {
              name: "NEW_PLUGIN",
              description: "The name of the plugin to install",
              isOptional: true,
            },
            {
              name: "GIT_URL",
              description: "The git url of the plugin",
              isOptional: true,
            },
          ],
          options: [
            {
              name: ["-C", "--cd"],
              description: "Change directory before running command",
              args: {
                name: "DIR",
              },
            },
            {
              name: ["-f", "--force"],
              description: "Reinstall even if plugin exists",
            },
            {
              name: ["-a", "--all"],
              description: "Install all missing plugins",
            },
            {
              name: ["-P", "--profile"],
              description: "Set the profile (environment)",
              args: {
                name: "PROFILE",
              },
            },
            {
              name: ["-v", "--verbose"],
              description: "Show installation output",
            },
            {
              name: ["-q", "--quiet"],
              description: "Suppress non-error messages",
            },
            {
              name: ["-y", "--yes"],
              description: "Answer yes to all confirmation prompts",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see more with '--help')",
            },
          ],
        },
        {
          name: ["link", "ln"],
          description: "Symlinks a plugin into mise",
          args: [
            {
              name: "NAME",
              description: "The name of the plugin\ne.g.: node, ruby",
              isOptional: true,
            },
            {
              name: "PATH",
              description: "The local path to the plugin\ne.g.: ./mise-node",
              isOptional: true,
            },
          ],
          options: [
            {
              name: ["-C", "--cd"],
              description: "Change directory before running command",
              args: {
                name: "DIR",
              },
            },
            {
              name: ["-f", "--force"],
              description: "Overwrite existing plugin",
            },
            {
              name: ["-P", "--profile"],
              description: "Set the profile (environment)",
              args: {
                name: "PROFILE",
              },
            },
            {
              name: ["-q", "--quiet"],
              description: "Suppress non-error messages",
            },
            {
              name: ["-v", "--verbose"],
              description: "Show extra output (use -vv for even more)",
            },
            {
              name: ["-y", "--yes"],
              description: "Answer yes to all confirmation prompts",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see more with '--help')",
            },
          ],
        },
        {
          name: ["uninstall", "remove", "rm"],
          description: "Removes a plugin",
          args: {
            name: "PLUGIN",
            description: "Plugin(s) to remove",
            isOptional: true,
            isDangerous: true,
            generators: {
              script: ["mise", "plugins", "ls", "--quiet"],
              postProcess: (out) => {
                return out
                  .split("\n")
                  .filter(Boolean)
                  .map((pluginName) => ({
                    name: pluginName,
                  }));
              },
            },
          },
          options: [
            {
              name: ["-C", "--cd"],
              description: "Change directory before running command",
              args: {
                name: "DIR",
                template: "folders",
              },
            },
            {
              name: ["-p", "--purge"],
              description:
                "Also remove the plugin's installs, downloads, and cache",
            },
            {
              name: ["-a", "--all"],
              description: "Remove all plugins",
            },
            {
              name: ["-P", "--profile"],
              description: "Set the profile (environment)",
              args: {
                name: "PROFILE",
              },
            },
            {
              name: ["-q", "--quiet"],
              description: "Suppress non-error messages",
            },
            {
              name: ["-v", "--verbose"],
              description: "Show extra output (use -vv for even more)",
            },
            {
              name: ["-y", "--yes"],
              description: "Answer yes to all confirmation prompts",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see more with '--help')",
            },
          ],
        },
        {
          name: ["update", "up", "upgrade"],
          description: "Updates a plugin to the latest version",
          args: {
            name: "PLUGIN",
            description: "Plugin(s) to update",
            isOptional: true,
            isDangerous: true,
            generators: {
              script: ["mise", "plugins", "ls", "--quiet"],
              postProcess: (out) => {
                return out
                  .split("\n")
                  .filter(Boolean)
                  .map((pluginName) => ({
                    name: pluginName,
                  }));
              },
            },
          },
          options: [
            {
              name: ["-C", "--cd"],
              description: "Change directory before running command",
              args: {
                name: "DIR",
              },
            },
            {
              name: ["-j", "--jobs"],
              description: "Number of jobs to run in parallel\n Default: 4",
              args: {
                name: "JOBS",
              },
            },
            {
              name: ["-P", "--profile"],
              description: "Set the profile (environment)",
              args: {
                name: "PROFILE",
              },
            },
            {
              name: ["-q", "--quiet"],
              description: "Suppress non-error messages",
            },
            {
              name: ["-v", "--verbose"],
              description: "Show extra output (use -vv for even more)",
            },
            {
              name: ["-y", "--yes"],
              description: "Answer yes to all confirmation prompts",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see more with '--help')",
            },
          ],
        },
        {
          name: ["ls", "list"],
          description: "List installed plugins",
          options: [
            {
              name: ["-C", "--cd"],
              description: "Change directory before running command",
              args: {
                name: "DIR",
              },
            },
            {
              name: ["-c", "--core"],
              description:
                "The built-in plugins only\nNormally these are not shown",
            },
            {
              name: ["-P", "--profile"],
              description: "Set the profile (environment)",
              args: {
                name: "PROFILE",
              },
            },
            {
              name: "--user",
              description: "List installed plugins",
            },
            {
              name: ["-u", "--urls"],
              description:
                "Show the git url for each plugin\ne.g.: e.g.: https://github.com/asdf-vm/asdf-nodejs.git",
            },
            {
              name: ["-q", "--quiet"],
              description: "Suppress non-error messages",
            },
            {
              name: ["-v", "--verbose"],
              description: "Show extra output (use -vv for even more)",
            },
            {
              name: ["-y", "--yes"],
              description: "Answer yes to all confirmation prompts",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see more with '--help')",
            },
          ],
        },
        {
          name: ["ls-remote", "list-remote", "list-all"],
          description: "List all available remote plugins",
          options: [
            {
              name: ["-C", "--cd"],
              description: "Change directory before running command",
              args: {
                name: "DIR",
              },
            },
            {
              name: ["-u", "--urls"],
              description:
                "Show the git url for each plugin\ne.g.: e.g.: https://github.com/mise-plugins/mise-poetry.git",
            },
            {
              name: ["-P", "--profile"],
              description: "Set the profile (environment)",
              args: {
                name: "PROFILE",
              },
            },
            {
              name: ["-q", "--quiet"],
              description: "Suppress non-error messages",
            },
            {
              name: ["-v", "--verbose"],
              description: "Show extra output (use -vv for even more)",
            },
            {
              name: ["-y", "--yes"],
              description: "Answer yes to all confirmation prompts",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see more with '--help')",
            },
          ],
        },
        {
          name: "help",
          description:
            "Print this message or the help of the given subcommand(s)",
        },
      ],
      options: [
        {
          name: ["-h", "--help"],
          description: "Print help (see more with '--help')",
        },
        {
          name: ["-c", "--core"],
          description:
            "The built-in plugins only\nNormally these are not shown",
        },
        {
          name: ["-y", "--yes"],
          description: "Answer yes to all confirmation prompts",
        },
        {
          name: ["-u", "--urls"],
          description:
            "Show the git url for each plugin\ne.g.: https://github.com/asdf-vm/asdf-nodejs.git",
        },
        {
          name: ["-v", "--verbose"],
          description: "Show extra output (use -vv for even more)",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress non-error messages",
        },
        {
          name: ["-P", "--profile"],
          description: "Set the profile (environment)",
          args: {
            name: "PROFILE",
          },
        },
        {
          name: ["-C", "--cd"],
          description: "Change directory before running command",
          args: {
            name: "DIR",
          },
        },
      ],
    },
    {
      name: "prune",
      description: "Delete unused versions of tools",
    },
    {
      name: "registry",
      description: "[experimental] List available tools",
    },
    {
      name: "reshim",
      description: "Rebuilds the shim farm",
    },
    {
      name: ["run", "r"],
      description: "[experimental] Run a tasks",
    },
    {
      name: "self-update",
      description: "Updates mise itself",
    },
    {
      name: "set",
      description: "Manage environment variables",
    },
    {
      name: "settings",
      description: "Manage settings",
    },
    {
      name: ["shell", "sh"],
      description: "Sets a tool version for the current session",
    },
    {
      name: "sync",
      description: "Add tool versions from external tools to mise",
    },
    {
      name: ["tasks", "t"],
      description: "[experimental] Manage tasks",
    },
    {
      name: "trust",
      description: "Marks a config file as trusted",
    },
    {
      name: ["uninstall", "remove", "rm"],
      description: "Removes runtime versions",
    },
    {
      name: "unset",
      description: "Remove environment variable(s) from the config file",
    },
    {
      name: ["upgrade", "up"],
      description: "Upgrades outdated tool versions",
    },
    {
      name: "usage",
      description: "Generate a usage CLI spec",
    },
    {
      name: ["use", "u"],
      description: "Install tool version and add it to config",
    },
    {
      name: "version",
      description: "Show mise version",
    },
    {
      name: ["watch", "w"],
      description: "[experimental] Run a tasks watching for changes",
    },
    {
      name: "where",
      description: "Display the installation path for a runtime",
    },
    {
      name: "which",
      description: "Shows the path that a bin name points to",
    },
    {
      name: "help",
      description: "Print this message or the help of the given subcommand(s)",
    },
  ],
  options: [
    {
      name: ["-h", "--help"],
      description: "Print help (see more with '--help')",
    },
    {
      name: ["-V", "--version"],
      description: "Print version",
    },
    {
      name: ["-v", "--verbose"],
      description: "Show extra output (use -vv for even more)",
    },
    {
      name: ["-q", "--quiet"],
      description: "Suppress non-error messages",
    },
    {
      name: ["-P", "--profile"],
      description: "Set the profile (environment)",
      args: {
        name: "PROFILE",
      },
    },
    {
      name: ["-C", "--cd"],
      description: "Change directory before running command",
      args: {
        name: "DIR",
      },
    },
  ],
};
export default completionSpec;
