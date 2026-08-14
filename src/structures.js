// Single source of truth for what we can generate. Adding a structure means
// adding an entry here and a folder in templates/ — nothing else should change.
export const structures = [
  {
    value: 'beginner',
    name: 'beginner',
    description: 'Fewer files, heavily commented. Start here if backends are new to you.',
  },
  {
    value: 'classic',
    name: 'classic',
    description: 'Standard MVC layout — routes, controllers, models. What most jobs use.',
  },
];
