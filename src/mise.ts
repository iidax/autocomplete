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
          description: "Install a plugin'",
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
        },
        {
          name: ["link", "ln"],
          description: "Symlinks a plugin into mise",
        },
        {
          name: ["uninstall", "remove", "rm"],
          description: "Removes a plugin",
          args: {
            name: "PLUGIN",
            description: "Plugin(s) to remove",
            isOptional: true,
          },
        },
        {
          name: ["update", "up", "upgrade"],
          description: "Updates a plugin to the latest version",
          args: {
            name: "PLUGIN",
            description: "Plugin(s) to update",
            isOptional: true,
          },
        },
        {
          name: ["ls", "list"],
          description: "List installed plugins",
        },
        {
          name: ["ls-remote", "list-remote", "list-all"],
          description: "List all available remote plugins",
        },
        {
          name: "help",
          description:
            "Print this message or the help of the given subcommand(s)",
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
      name: ["--help", "-h"],
      description: "Print help (see more with '--help')",
    },
    {
      name: ["--version", "-V"],
      description: "Print version",
    },
    {
      name: ["--verbose", "-v"],
      description: "Show extra output (use -vv for even more)",
    },
    {
      name: ["--quiet", "-q"],
      description: "Suppress non-error messages",
    },
    {
      name: ["--profile", "-P"],
      description: "Set the profile (environment)",
    },
    {
      name: ["--cd", "-C"],
      description: "Change directory before running command",
    },
  ],
  // Only uncomment if mise takes an argument
  // args: {}
};
export default completionSpec;
