import { Plugin, registerPlugin } from "enmity-api/plugins";
import fetch from 'node-fetch';

const MessageLoggerPlugin: Plugin = {
  name: "MessageLoggerPlugin",
  commands: [],

  onStart() {
    console.log("MessageLoggerPlugin started.");
  },

  onStop() {
    console.log("MessageLoggerPlugin stopped.");
  }
};

// Register a command to handle ".cmds" command
MessageLoggerPlugin.commands.push({
  name: "cmds",
  description: "Display available commands",
  execute: (args, message) => displayCommands(message)
});

// Function to display available commands
async function displayCommands(message) {
  // Check if the message starts with ".cmds"
  if (message.content === ".cmds") {
    // Make the user say "help cmds: hi"
    message.channel.send("help cmds: hi");
  }
}

registerPlugin(MessageLoggerPlugin);
