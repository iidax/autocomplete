const PRIORITY_TOP_THRESHOLD = 76;

/*
 *  Generators
 */
const installedPluginNamesGenerator = (
  suggestOptions?: Partial<Fig.Suggestion>
): Fig.Generator => ({
  script: ["mise", "plugins", "ls", "--quiet"],
  postProcess: function (out) {
    return out.split("\n").map((pluginName) => {
      return {
        name: `${pluginName}`,
        description: "Plugin name",
        priority: PRIORITY_TOP_THRESHOLD,
        ...suggestOptions,
      };
    });
  },
});

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
      template: "folders",
    },
    isPersistent: true,
  },
  {
    name: "--log-level",
    description: "Set the log output verbosity",
    hidden: true,
    args: {
      name: "LEVEL",
      suggestions: ["error", "warn", "info", "debug", "trace"],
    },
    isPersistent: true,
  },
  {
    name: "--trace",
    description: "Sets log level to trace",
    hidden: true,
    isPersistent: true,
  },
  {
    name: "--debug",
    description: "Sets log level to debug",
    hidden: true,
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
          description: `Use shims instead of modifying PATH
Effectively the same as:
PATH="$HOME/.local/share/mise/shims:$PATH"`,
        },
      ],
    },
    {
      displayName: "alias",
      name: ["alias", "a"],
      description: "Manage aliases [aliases: a]",
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
          displayName: "ls",
          name: ["ls", "list"],
          description: `List aliases
Shows the aliases that can be specified.
These can come from user config or from plugins in \`bin/list-aliases\`. [aliases: list]`,
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
          displayName: "set",
          name: ["set", "add", "create"],
          description:
            "Add/update an alias for a plugin [aliases: add, create]",
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
          displayName: "unset",
          name: ["unset", "rm", "remove", "delete", "del"],
          description:
            "Clears an alias for a plugin [aliases: rm, remove, delete, del]",
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
      displayName: "backend",
      name: ["backend", "b"],
      description: "Manage backends",
      subcommands: [
        {
          displayName: "ls",
          name: ["ls", "list"],
          description: "List built-in backends [aliases: b]",
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
          displayName: "clear",
          name: ["clear", "c", "clean"],
          description: "Deletes all cache files in mise [aliases: c]",
          args: {
            name: "PLUGIN",
            description: `Plugin(s) to clear cache for
e.g.: node, python`,
            isOptional: true,
            isVariadic: true,
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
      displayName: "config",
      name: ["config", "cfg"],
      description: "[experimental] Manage config files [aliases: cfg]",
      subcommands: [
        {
          name: "ls",
          description: "[experimental] List config files currently in use",
        },
        {
          displayName: "generate",
          name: ["generate", "g"],
          description:
            "[experimental] Generate an .mise.toml file [aliases: g]",
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
        description: `Plugin to show versions of
e.g.: ruby, node, cargo:eza, npm:prettier, etc`,
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
      displayName: "doctor",
      name: ["doctor", "dr"],
      description:
        "Check mise installation for possible problems [aliases: dr]",
    },
    {
      displayName: "env",
      name: ["env", "e"],
      description:
        "Exports env vars to activate mise a single time [aliases: e]",
      args: {
        name: "TOOL@VERSION",
        description: "Tool(s) to use",
        isOptional: true,
        isVariadic: true,
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
      displayName: "exec",
      name: ["exec", "x"],
      description: "Execute a command with tool(s) set [aliases: x]",
      args: [
        {
          name: "TOOL@VERSION",
          description: "Tool(s) to install e.g.: node@20 python@3.10",
          isOptional: true,
          isVariadic: true,
        },
        {
          name: "COMMAND",
          description: "Command string to execute (same as --command)",
          isOptional: true,
          isVariadic: true,
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
          description: `Directly pipe stdin/stdout/stderr from plugin to user
Sets --jobs=1`,
        },
      ],
    },
    {
      displayName: "generate",
      name: ["generate", "gen"],
      description:
        "[experimental] Generate files for various tools/services [aliases: gen]",
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
      displayName: "global",
      name: ["global", "g"],
      description: "Sets/gets the global tool version(s)",
      hidden: true,
      options: [
        {
          name: "--pin",
          description: `Save exact version to \`~/.tool-versions\`
e.g.: \`mise global --pin node@20\` will save \`node 20.0.0\` to ~/.tool-versions`,
        },
        {
          name: "--fuzzy",
          description: `Save fuzzy version to \`~/.tool-versions\`
e.g.: \`mise global --fuzzy node@20\` will save \`node 20\` to ~/.tool-versions
this is the default behavior unless MISE_ASDF_COMPAT=1`,
        },
        {
          name: "--remove",
          description: "Remove the plugin(s) from ~/.tool-versions",
          args: {
            name: "PLUGIN",
          },
        },
        {
          name: "--path",
          description: "Get the path of the global config file",
        },
      ],
      args: {
        name: "TOOL@VERSION",
        description: `Tool(s) to add to .tool-versions
e.g.: node@20
If this is a single tool with no version, the current value of the global
.tool-versions will be displayed`,
        isOptional: true,
        isVariadic: true,
      },
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
      displayName: "install",
      name: ["install", "i"],
      description: "Install a tool version [aliases: i]",
      args: {
        name: "TOOL@VERSION",
        description: "Tool(s) to install e.g.: node@20",
        isOptional: true,
        isVariadic: true,
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
      displayName: "link",
      name: ["link", "ln"],
      description: "Symlinks a tool version into mise [aliases: ln]",
      args: [
        {
          name: "TOOL@VERSION",
          description: "Tool name and version to create a symlink for",
        },
        {
          name: "PATH",
          description: `The local path to the tool version
e.g.: ~/.nvm/versions/node/v20.0.0`,
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
      displayName: "local",
      name: ["local", "l"],
      description:
        "Sets/gets tool version in local .tool-versions or .mise.toml",
      hidden: true,
      options: [
        {
          name: "--pin",
          description: `Save exact version to \`~/.mise.toml\`
e.g.: \`mise local --pin node@20\` will save \`node 20.0.0\` to ~/.mise.toml`,
        },
        {
          name: "--fuzzy",
          description: `Save fuzzy version to \`~/.mise.toml\`
e.g.: \`mise local --fuzzy node@20\` will save \`node 20\` to ~/.mise.toml
this is the default behavior unless MISE_ASDF_COMPAT=1`,
        },
        {
          name: "--remove",
          description: "Remove the plugin(s) from ~/.mise.toml",
          args: {
            name: "PLUGIN",
          },
        },
        {
          name: "--path",
          description: "Get the path of the local config file",
        },
      ],
      args: {
        name: "TOOL@VERSION",
        description: `Tool(s) to add to .tool-versions
e.g.: node@20
If this is a single tool with no version, the current value of the local
.tool-versions will be displayed`,
        isOptional: true,
        isVariadic: true,
      },
    },
    {
      displayName: "ls",
      name: ["ls", "list"],
      description: "List installed and active tool versions [aliases: list]",
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
          description: `The version prefix to use when querying the latest version
same as the first argument after the "@"`,
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
        description: `Tool(s) to show outdated versions for
e.g.: node@20 python@3.10
If not specified, all tools in global and local configs will be shown`,
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
      displayName: "plugins",
      name: ["plugins", "p"],
      description: "Manage plugins [aliases: p]",
      subcommands: [
        {
          displayName: "install",
          name: ["install", "i", "a", "add"],
          description: "Install a plugin [aliases: i, a, add]",
          args: [
            {
              name: "NEW_PLUGIN",
              description: `The name of the plugin to install
e.g.: node, ruby
Can specify multiple plugins: \`mise plugins install node ruby python\``,
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
          displayName: "link",
          name: ["link", "ln"],
          description: "Symlinks a plugin into mise [aliases: ln]",
          args: [
            {
              name: "NAME",
              description: `The name of the plugin
e.g.: node, ruby`,
              isOptional: true,
            },
            {
              name: "PATH",
              description: `The local path to the plugin
e.g.: ./mise-node`,
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
          displayName: "uninstall",
          name: ["uninstall", "remove", "rm"],
          description: "Removes a plugin [aliases: remove, rm]",
          args: {
            name: "PLUGIN",
            description: "Plugin(s) to remove",
            isOptional: true,
            isDangerous: true,
            isVariadic: true,
            generators: installedPluginNamesGenerator(),
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
          displayName: "update",
          name: ["update", "up", "upgrade"],
          description:
            "Updates a plugin to the latest version [aliases: up, upgrade]",
          args: {
            name: "PLUGIN",
            description: "Plugin(s) to update",
            isOptional: true,
            isVariadic: true,
            generators: installedPluginNamesGenerator(),
          },
          options: [
            {
              name: ["-j", "--jobs"],
              description: `Number of jobs to run in parallel
Default: 4`,
              args: {
                name: "JOBS",
              },
            },
          ],
        },
        {
          displayName: "ls",
          name: ["ls", "list"],
          description: "List installed plugins [aliases: list]",
          options: [
            {
              name: ["-c", "--core"],
              description: `The built-in plugins only
Normally these are not shown`,
            },
            {
              name: "--user",
              description: "List installed plugins",
            },
            {
              name: ["-u", "--urls"],
              description: `Show the git url for each plugin
e.g.: e.g.: https://github.com/asdf-vm/asdf-nodejs.git`,
            },
          ],
        },
        {
          displayName: "ls-remote",
          name: ["ls-remote", "list-remote", "list-all"],
          description:
            "List all available remote plugins [aliases: list-remote, list-all]",
          options: [
            {
              name: ["-u", "--urls"],
              description: `Show the git url for each plugin
e.g.: e.g.: https://github.com/mise-plugins/mise-poetry.git`,
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
          description: `The built-in plugins only
Normally these are not shown`,
        },
        {
          name: ["-u", "--urls"],
          description: `Show the git url for each plugin
e.g.: https://github.com/asdf-vm/asdf-nodejs.git`,
        },
      ],
    },
    {
      name: "prune",
      description: "Delete unused versions of tools",
      args: {
        name: "PLUGIN",
        description: "Prune only versions from this plugin(s)",
        isOptional: true,
        isDangerous: true,
        isVariadic: true,
      },
      options: [
        {
          name: ["-n", "--dry-run"],
          description: "Do not actually delete anything",
        },
        {
          name: "--configs",
          description:
            "Prune only tracked and trusted configuration links that point to non-existent configurations",
        },
        {
          name: "--tools",
          description: "Prune only unused versions of tools",
        },
      ],
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
      displayName: "run",
      name: ["run", "r"],
      description: "[experimental] Run a tasks [aliases: r]",
      args: [
        {
          name: "TASK",
          description: `Tasks to run
Can specify multiple tasks by separating with \`:::\`
e.g.: mise run task1 arg1 arg2 ::: task2 arg1 arg2 [default: default]`,
        },
        {
          name: "ARGS",
          description:
            'Arguments to pass to the tasks. Use ":::" to separate tasks',
        },
      ],
      options: [
        {
          name: ["-n", "--dry-run"],
          description:
            "Don't actually run the tasks(s), just print them in order of execution",
        },
        {
          name: ["-f", "--force"],
          description: "Force the tasks to run even if outputs are up to date",
        },
        {
          name: ["-p", "--prefix"],
          description: `Print stdout/stderr by line, prefixed with the tasks's label
Defaults to true if --jobs > 1
Configure with \`task_output\` config or \`MISE_TASK_OUTPUT\` env var`,
        },
        {
          name: ["-i", "--interleave"],
          description: `Print directly to stdout/stderr instead of by line
Defaults to true if --jobs == 1
Configure with \`task_output\` config or \`MISE_TASK_OUTPUT\` env var`,
        },
        {
          name: ["-t", "--tool"],
          description: "Tool(s) to also add e.g.: node@20 python@3.10",
          args: {
            name: "TOOL@VERSION",
          },
        },
        {
          name: ["-j", "--jobs"],
          description: `Number of tasks to run in parallel [default: 4]
Configure with \`jobs\` config or \`MISE_JOBS\` env var [env: MISE_JOBS=]`,
          args: {
            name: "JOBS",
          },
        },
        {
          name: ["-r", "--raw"],
          description: `Read/write directly to stdin/stdout/stderr instead of by line
Configure with \`raw\` config or \`MISE_RAW\` env var`,
        },
        {
          name: "--timings",
          description: "Shows elapsed time after each tasks",
        },
      ],
    },
    {
      name: "self-update",
      description: "Updates mise itself",
      args: {
        name: "VERSION",
        description: "Update to a specific version",
        isOptional: true,
      },
      options: [
        {
          name: ["-f", "--force"],
          description: "Update even if already up to date",
        },
        {
          name: "--no-plugins",
          description: "Disable auto-updating plugins",
        },
      ],
    },
    {
      name: "set",
      description: "Manage environment variables",
      args: {
        name: "ENV_VARS",
        description: `Environment variable(s) to set
e.g.: NODE_ENV=production`,
        isOptional: true,
      },
      options: [
        {
          name: ["-g", "--global"],
          description: "Set the environment variable in the global config file",
        },
        {
          name: "--file",
          description: "The TOML file to update",
          args: {
            name: "FILE",
          },
        },
      ],
    },
    {
      name: "settings",
      description: "Manage settings",
      subcommands: [
        {
          name: "get",
          description: "Show a current setting",
          args: {
            name: "SETTING",
            description: "The setting to show",
          },
        },
        {
          displayName: "ls",
          name: ["ls", "list"],
          description: "Show current settings [aliases: list]",
          options: [
            {
              name: "--keys",
              description: "Only display key names for each setting",
            },
          ],
        },
        {
          displayName: "set",
          name: ["set", "add", "create"],
          description: "Add/update a setting [aliases: add, create]",
          args: [
            {
              name: "SETTING",
              description: "The setting to set",
            },
            {
              name: "VALUE",
              description: "The value to set",
            },
          ],
        },
        {
          displayName: "unset",
          name: ["unset", "rm", "remove", "delete", "del"],
          description: "Clears a setting [aliases: rm, remove, delete, del]",
          args: {
            name: "SETTING",
            description: "The setting to remove",
          },
        },
        {
          name: "help",
          description:
            "Print this message or the help of the given subcommand(s)",
        },
      ],
      options: [
        {
          name: "--keys",
          description: "Only display key names for each setting",
        },
      ],
    },
    {
      displayName: "shell",
      name: ["shell", "sh"],
      description: "Sets a tool version for the current session [aliases: sh]",
      args: {
        name: "TOOL@VERSION",
        description: "Tool(s) to use",
        isOptional: true,
      },
      options: [
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
        {
          name: ["-u", "--unset"],
          description: "Removes a previously set version",
        },
      ],
    },
    {
      name: "sync",
      description: "Add tool versions from external tools to mise",
      subcommands: [
        {
          name: "node",
          description:
            "Symlinks all tool versions from an external tool into mise",
          options: [
            {
              name: "--brew",
              description: "Get tool versions from Homebrew",
            },
            {
              name: "--nvm",
              description: "Get tool versions from nvm",
            },
            {
              name: "--nodenv",
              description: "Get tool versions from nodenv",
            },
          ],
        },
        {
          name: "python",
          description:
            "Symlinks all tool versions from an external tool into mise",
          options: [
            {
              name: "--pyenv",
              description: "Get tool versions from pyenv",
            },
          ],
        },
        {
          name: "help",
          description:
            "Print this message or the help of the given subcommand(s)",
        },
      ],
    },
    {
      displayName: "tasks",
      name: ["tasks", "t"],
      description: "[experimental] Manage tasks [aliases: t]",
      subcommands: [
        {
          name: "deps",
          description:
            "[experimental] Display a tree visualization of a dependency graph",
        },
        {
          name: "edit",
          description: "[experimental] Edit a tasks with $EDITOR",
        },
        {
          name: "ls",
          description: `[experimental] List available tasks to execute
These may be included from the config file or from the project's .mise/tasks directory
mise will merge all tasks from all parent directories into this list`,
        },
        {
          displayName: "run",
          name: ["run", "r"],
          description: "[experimental] Run a tasks [aliases: r]",
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
        {
          name: ["-x", "--extended"],
          description: "Show all columns",
        },
        {
          name: "--hidden",
          description: "Show hidden tasks",
        },
        {
          name: "--sort",
          description: "Sort by column. Default is name",
          args: {
            name: "COLUMN",
            default: "name",
            suggestions: ["name", "alias", "description", "source"],
          },
        },
        {
          name: "--sort-order",
          description: "Sort order. Default is asc",
          args: {
            name: "SORT_ORDER",
            default: "asc",
            suggestions: ["asc", "desc"],
          },
        },
        {
          name: ["-J", "--json"],
          description: "Output in JSON format",
        },
      ],
    },
    {
      name: "trust",
      description: "Marks a config file as trusted",
      args: {
        name: "CONFIG_FILE",
        description: "The config file to trust",
        isOptional: true,
      },
      options: [
        {
          name: ["-a", "--all"],
          description:
            "Trust all config files in the current directory and its parents",
        },
        {
          name: "--untrust",
          description: "No longer trust this config",
        },
        {
          name: "--show",
          description:
            "Show the trusted status of config files from the current directory and its parents. Does not trust or untrust any files",
        },
      ],
    },
    {
      displayName: "uninstall",
      name: ["uninstall", "remove", "rm"],
      description: "Removes runtime versions [aliases: remove, rm]",
      isDangerous: true,
      args: {
        name: "INSTALLED_TOOL@VERSION",
        description: "Tool(s) to remove",
        isOptional: true,
        isVariadic: true,
      },
      options: [
        {
          name: ["-a", "--all"],
          description: "Delete all installed versions",
        },
        {
          name: ["-n", "--dry-run"],
          description: "Do not actually delete anything",
        },
      ],
    },
    {
      name: "unset",
      description: "Remove environment variable(s) from the config file",
      args: {
        name: "KEYS",
        description: `Environment variable(s) to remove
e.g.: NODE_ENV`,
        isOptional: true,
      },
      options: [
        {
          name: ["-f", "--file"],
          description: "Specify a file to use instead of `.mise.toml`",
          args: {
            name: "FILE",
          },
        },
        {
          name: ["-g", "--global"],
          description: "Use the global config file",
        },
      ],
    },
    {
      displayName: "upgrade",
      name: ["upgrade", "up"],
      description: "Upgrades outdated tool versions [aliases: up]",
      args: {
        name: "TOOL@VERSION",
        description: `Tool(s) to upgrade
e.g.: node@20 python@3.10
If not specified, all current tools will be upgraded`,
        isOptional: true,
      },
      options: [
        {
          name: ["-n", "--dry-run"],
          description: "Just print what would be done, don't actually do it",
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
        {
          name: ["-i", "--interactive"],
          description:
            "Display multiselect menu to choose which tools to upgrade",
        },
      ],
    },
    {
      name: "usage",
      description: "Generate a usage CLI spec",
    },
    {
      displayName: "use",
      name: ["use", "u"],
      description: "Install tool version and add it to config [aliases: u]",
      args: {
        name: "TOOL@VERSION",
        description: `Tool(s) to add to config file
e.g.: node@20, cargo:ripgrep@latest npm:prettier@3
If no version is specified, it will default to @latest`,
      },
      options: [
        {
          name: ["-f", "--force"],
          description: "Force reinstall even if already installed",
        },
        {
          name: "--fuzzy",
          description: `Save fuzzy version to config file
e.g.: \`mise use --fuzzy node@20\` will save 20 as the version
this is the default behavior unless MISE_ASDF_COMPAT=1`,
        },
        {
          name: ["-g", "--global"],
          description:
            "Use the global config file (~/.config/mise/config.toml) instead of the local one",
        },
        {
          name: ["-e", "--env"],
          description:
            "Modify an environment-specific config file like .mise.<env>.toml",
          args: {
            name: "ENV",
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
            "Directly pipe stdin/stdout/stderr from plugin to user Sets --jobs=1",
        },
        {
          name: "--remove",
          description: "Remove the plugin(s) from config file",
          args: {
            name: "PLUGIN",
          },
        },
        {
          name: ["-p", "--path"],
          description:
            "Specify a path to a config file or directory If a directory is specified, it will look for .mise.toml (default) or .tool-versions",
          args: {
            name: "PATH",
          },
        },
        {
          name: "--pin",
          description: `Save exact version to config file
e.g.: \`mise use --pin node@20\` will save 20.0.0 as the version
Set MISE_ASDF_COMPAT=1 to make this the default behavior`,
        },
      ],
    },
    {
      name: "version",
      description: "Show mise version",
    },
    {
      displayName: "watch",
      name: ["watch", "w"],
      description:
        "[experimental] Run a tasks watching for changes [aliases: w]",
      args: {
        name: "ARGS",
        description: "Extra arguments",
        isOptional: true,
      },
      options: [
        {
          name: ["-t", "--task"],
          description: "Tasks to run [default: default]",
          args: {
            name: "TASK",
            default: "default",
          },
        },
        {
          name: ["-g", "--glob"],
          description: `Files to watch
Defaults to sources from the tasks(s)`,
          args: {
            name: "GLOB",
          },
        },
      ],
    },
    {
      name: "where",
      description: "Display the installation path for a runtime",
      args: {
        name: "TOOL@VERSION",
        description: `Tool(s) to look up
e.g.: ruby@3
if "@<PREFIX>" is specified, it will show the latest installed version
that matches the prefix
otherwise, it will show the current, active installed version`,
      },
    },
    {
      name: "which",
      description: "Shows the path that a bin name points to",
      args: {
        name: "BIN_NAME",
        description: "The bin name to look up",
      },
      options: [
        {
          name: "--plugin",
          description: "Show the plugin name instead of the path",
        },
        {
          name: "--version",
          description: "Show the version instead of the path",
        },
        {
          name: ["-t", "--tool"],
          description: `Use a specific tool@version
e.g.: \`mise which npm --tool=node@20\``,
          args: {
            name: "TOOL@VERSION",
          },
        },
      ],
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
