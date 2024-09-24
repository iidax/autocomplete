const commonOptions: Fig.Option[] = [
  {
    name: ["-h", "--help"],
    description: "Print help (see more with '--help')",
    isPersistent: true,
  },
  {
    name: ["-v", "--verbose"],
    description: "Show extra output (use -vv for even more)",
    isPersistent: true,
  },
  {
    name: ["-q", "--quiet"],
    description: "Suppress non-error messages",
    isPersistent: true,
  },
  {
    name: ["-P", "--profile"],
    description: "Set the profile (environment)",
    args: {
      name: "PROFILE",
    },
    isPersistent: true,
  },
  {
    name: ["-C", "--cd"],
    description: "Change directory before running command",
    args: {
      name: "DIR",
    },
    isPersistent: true,
  },
];

const completionSpec: Fig.Spec = {
  name: "mise",
  description: "The front-end to your dev env",
  subcommands: [
    {
      name: "activate",
      description: "Initializes mise in the current shell session",
      args: {
        name: "SHELL_TYPE",
        description:
          "Shell type to generate the script for [possible values: bash, fish, nu, xonsh, zsh]",
        suggestions: ["bash", "fish", "nu", "xonsh", "zsh"],
      },
      options: [
        {
          name: "--shims",
          description:
            'Use shims instead of modifying PATH\nEffectively the same as:\nPATH="$HOME/.local/share/mise/shims:$PATH"',
        },
      ],
    },
    {
      name: ["alias", "a"],
      description: "Manage aliases",
      subcommands: [
        {
          name: "get",
          description: "Show an alias for a plugin",
          args: [
            {
              name: "ALIAS",
              description: "The alias to show",
            },
            {
              name: "PLUGIN",
              description: "The plugin to show the alias for",
            },
          ],
        },
        {
          name: ["ls", "list"],
          description:
            "List aliases\nShows the aliases that can be specified.\nThese can come from user config or from plugins in `bin/list-aliases`",
          args: {
            name: "PLUGIN",
            description: "Show aliases for <PLUGIN>",
          },
          options: [
            {
              name: "--no-header",
              description: "Don't show table header",
            },
          ],
        },
        {
          name: ["set", "add", "create"],
          description: "Add/update an alias for a plugin",
          args: [
            {
              name: "ALIAS",
              description: "The alias to set",
            },
            {
              name: "PLUGIN",
              description: "The plugin to set the alias for",
            },
            {
              name: "value",
              description: "The value to set the alias to",
            },
          ],
        },
        {
          name: ["unset", "rm", "remove", "delete", "del"],
          description: "Clears an alias for a plugin",
          args: [
            {
              name: "ALIAS",
              description: "The alias to remove",
            },
            {
              name: "PLUGIN",
              description: "The plugin to remove the alias from",
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
          name: ["-p", "--plugin"],
          description: "Filter aliases by plugin",
          args: {
            name: "PLUGIN",
            description: "Plugin to filter aliases by",
          },
        },
        {
          name: "--no-header",
          description: "Don't show table header",
        },
      ],
    },
    {
      name: ["backend", "b"],
      description: "Manage backends",
      subcommands: [
        {
          name: ["ls", "list"],
          description: "List built-in backends",
        },
        {
          name: "help",
          description:
            "Print this message or the help of the given subcommand(s)",
        },
      ],
    },
    {
      name: "bin-paths",
      description: "List all the active runtime bin paths",
    },
    {
      name: "cache",
      description: "Manage the mise cache",
      subcommands: [
        {
          name: ["clear", "c"],
          description: "Deletes all cache files in mise",
          args: {
            name: "PLUGIN",
            description: "Plugin(s) to clear cache for\ne.g.: node, python",
            isOptional: true,
          },
        },
        {
          name: "help",
          description:
            "Print this message or the help of the given subcommand(s)",
        },
      ],
    },
    {
      name: "completion",
      description: "Generate shell completions",
      args: {
        name: "SHELL",
        description:
          "Shell type to generate completions for [possible values: bash, fish, zsh]",
        suggestions: ["bash", "fish", "zsh"],
      },
    },
    {
      name: ["config", "cfg"],
      description: "[experimental] Manage config files",
      subcommands: [
        {
          name: "ls",
          description: "[experimental] List config files currently in use",
        },
        {
          name: ["generate", "g"],
          description: "[experimental] Generate an .mise.toml file",
        },
        {
          name: "help",
          description:
            "Print this message or the help of the given subcommand(s)",
        },
      ],
      options: [
        {
          name: "--no-header",
          description: "Do not print table header",
        },
      ],
    },
    {
      name: "current",
      description: "Shows current active and installed runtime versions",
      args: {
        name: "PLUGIN",
        description:
          "Plugin to show versions of \n e.g.: ruby, node, cargo:eza, npm:prettier, etc",
      },
    },
    {
      name: "deactivate",
      description: "Disable mise for current shell session",
    },
    {
      name: "direnv",
      description: "Output direnv function to use mise inside direnv",
      subcommands: [
        {
          name: "activate",
          description: "Output direnv function to use mise inside direnv",
        },
        {
          name: "help",
          description:
            "Print this message or the help of the given subcommand(s)",
        },
      ],
    },
    {
      name: ["doctor", "dr"],
      description: "Check mise installation for possible problems",
    },
    {
      name: ["env", "e"],
      description: "Exports env vars to activate mise a single time",
      args: {
        name: "TOOL@VERSION",
        description: "Tool(s) to install e.g.: node@20",
        isOptional: true,
      },
      options: [
        {
          name: ["-J", "--json"],
          description: "Output in JSON format",
        },
        {
          name: ["-s", "--shell"],
          description:
            "Shell type to generate environment variables for [possible values: bash, fish, nu, xonsh, zsh]",
          args: {
            name: "SHELL",
            suggestions: ["bash", "fish", "nu", "xonsh", "zsh"],
          },
        },
      ],
    },
    {
      name: ["exec", "x"],
      description: "Execute a command with tool(s) set",
      args: [
        {
          name: "TOOL@VERSION",
          description: "Tool(s) to install e.g.: node@20 python@3.10",
          isOptional: true,
        },
        {
          name: "COMMAND",
          description: "Command string to execute (same as --command)",
          isOptional: true,
        },
      ],
      options: [
        {
          name: ["-c", "--command"],
          description: "Command string to execute",
          args: {
            name: "C",
          },
        },
        {
          name: ["-j", "--jobs"],
          description:
            "Number of jobs to run in parallel [default: 4] [env: MISE_JOBS=]",
          args: {
            name: "JOBS",
          },
        },
        {
          name: "--raw",
          description:
            "Directly pipe stdin/stdout/stderr from plugin to user\nSets --jobs=1",
        },
      ],
    },
    {
      name: ["generate", "gen"],
      description: "[experimental] Generate files for various tools/services",
      subcommands: [
        {
          name: "git-pre-commit",
          description: "[experimental] Generate a git pre-commit hook",
        },
        {
          name: "github-action",
          description: "[experimental] Generate a GitHub Action workflow file",
        },
        {
          name: "help",
          description:
            "Print this message or the help of the given subcommand(s)",
        },
      ],
    },
    {
      name: "implode",
      description: "Removes mise CLI and all related data",
      options: [
        {
          name: ["-n", "--dry-run"],
          description:
            "List directories that would be removed without actually removing them",
        },
      ],
    },
    {
      name: ["install", "i"],
      description: "Install a tool version",
      args: {
        name: "TOOL@VERSION",
        description: "Tool(s) to install e.g.: node@20",
        isOptional: true,
      },
      options: [
        {
          name: ["-f", "--force"],
          description: "Force reinstall even if already installed",
        },
        {
          name: ["-j", "--jobs"],
          description:
            "Number of jobs to run in parallel [default: 4] [env: MISE_JOBS=]",
          args: {
            name: "JOBS",
          },
        },
        {
          name: "--raw",
          description:
            "Directly pipe stdin/stdout/stderr from plugin to user Sets --jobs=1",
        },
      ],
    },
    {
      name: "latest",
      description: "Gets the latest available version for a plugin",
      args: {
        name: "TOOL@VERSION",
        description: "Tool to get the latest version of",
        isOptional: true,
      },
      options: [
        {
          name: ["-i", "--installed"],
          description: "Show latest installed instead of available version",
        },
      ],
    },
    {
      name: ["link", "ln"],
      description: "Symlinks a tool version into mise",
      args: [
        {
          name: "TOOL@VERSION",
          description: "Tool name and version to create a symlink for",
        },
        {
          name: "PATH",
          description:
            "The local path to the tool version \n e.g.: ~/.nvm/versions/node/v20.0.0",
        },
      ],
      options: [
        {
          name: ["-f", "--force"],
          description: "Overwrite existing tool version",
        },
      ],
    },
    {
      name: ["ls", "list"],
      description: "List installed and active tool versions",
      args: {
        name: "PLUGIN",
        description: "Only show tool versions from [PLUGIN]",
        isOptional: true,
      },
      options: [
        {
          name: ["-c", "--current"],
          description:
            "Only show tool versions currently specified in a .tool-versions/.mise.toml",
        },
        {
          name: ["-g", "--global"],
          description:
            "Only show tool versions currently specified in a the global .tool-versions/.mise.toml",
        },
        {
          name: ["-i", "--installed"],
          description:
            "Only show tool versions that are installed (Hides tools defined in .tool-versions/.mise.toml but not installed)",
        },
        {
          name: ["-J", "--json"],
          description: "Output in JSON format",
        },
        {
          name: ["-m", "--missing"],
          description: "Display missing tool versions",
        },
        {
          name: "--prefix",
          description: "Display versions matching this prefix",
          args: {
            name: "PREFIX",
          },
        },
        {
          name: "--no-header",
          description: "Don't display headers",
        },
      ],
    },
    {
      name: "ls-remote",
      description: "List runtime versions available for install",
      args: [
        {
          name: "TOOL@VERSION",
          description: "Plugin to get versions for",
        },
        {
          name: "PREFIX",
          description:
            'The version prefix to use when querying the latest version \n same as the first argument after the "@"',
        },
      ],
      options: [
        {
          name: "--all",
          description: "Show all installed plugins and versions",
        },
      ],
    },
    {
      name: "outdated",
      description: "Shows outdated tool versions",
      args: {
        name: "TOOL@VERSION",
        description:
          "Tool(s) to show outdated versions for \n e.g.: node@20 python@3.10 \n If not specified, all tools in global and local configs will be shown",
        isOptional: true,
      },
      options: [
        {
          name: ["-J", "--json"],
          description: "Output in JSON format",
        },
      ],
    },
    {
      name: ["plugins", "p"],
      description: "Manage plugins",
      subcommands: [
        {
          name: ["install", "i", "a", "add"],
          description: "Install a plugin \n e.g.: node, ruby",
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
              name: ["-f", "--force"],
              description: "Reinstall even if plugin exists",
            },
            {
              name: ["-a", "--all"],
              description: "Install all missing plugins",
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
              name: ["-f", "--force"],
              description: "Overwrite existing plugin",
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
              name: ["-p", "--purge"],
              description:
                "Also remove the plugin's installs, downloads, and cache",
            },
            {
              name: ["-a", "--all"],
              description: "Remove all plugins",
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
              name: ["-j", "--jobs"],
              description: "Number of jobs to run in parallel\n Default: 4",
              args: {
                name: "JOBS",
              },
            },
          ],
        },
        {
          name: ["ls", "list"],
          description: "List installed plugins",
          options: [
            {
              name: ["-c", "--core"],
              description:
                "The built-in plugins only\nNormally these are not shown",
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
          ],
        },
        {
          name: ["ls-remote", "list-remote", "list-all"],
          description: "List all available remote plugins",
          options: [
            {
              name: ["-u", "--urls"],
              description:
                "Show the git url for each plugin\ne.g.: e.g.: https://github.com/mise-plugins/mise-poetry.git",
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
          name: ["-c", "--core"],
          description:
            "The built-in plugins only\nNormally these are not shown",
        },
        {
          name: ["-u", "--urls"],
          description:
            "Show the git url for each plugin\ne.g.: https://github.com/asdf-vm/asdf-nodejs.git",
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
    ...commonOptions,
    {
      name: ["-V", "--version"],
      description: "Print version",
    },
  ],
};
export default completionSpec;
