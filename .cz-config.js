module.exports = {
  types: [
    {value: "feat", name: "feat:     New feature"},
    {value: "fix", name: "fix:      Bug fix"},
    {value: "style", name: "style:    Minor code change"},
    {value: "refactor", name: "refactor: Refactor"},
    {value: "perf", name: "perf:     Performance"},
    {value: "revert", name: "revert:   Revert"},
    {value: "chore", name: "chore:    Other"},
  ],
  messages: {
    subject: "Write a short description of the change:\n",
    confirmCommit: "Can you confirm?",
  },
  skipQuestions: ["scope", "body", "breaking", "footer"],
}
