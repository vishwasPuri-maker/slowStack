// Single source of truth for the languages the explanations come in. Adding one
// means adding an entry here and a templates/<value>/ folder — nothing else.
//
// `value` is the folder name, so it must match templates/<value>/ exactly.
export const languages = [
  {
    value: 'en',
    name: 'English',
    description: 'Plain English, written for someone who has never built a backend.',
  },
  {
    value: 'hi',
    name: 'Hinglish',
    description: 'Hindi explanations, English code and technical words. Roman script.',
  },
];
