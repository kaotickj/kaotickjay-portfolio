/** Pure, tested helpers. This is a portfolio navigator, never an actual shell. */
export const FILTERS = Object.freeze(['all', 'tools', 'research', 'guides']);
export const COMMANDS = Object.freeze(['help', 'whoami', 'work', 'tools', 'research', 'guides', 'credentials', 'connect', 'clear']);
export function normalizeCommand(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}
export function resolveCommand(value) {
  const command = normalizeCommand(value);
  const sections = {whoami:'about', work:'work', tools:'work', research:'work', guides:'work', credentials:'credentials', connect:'connect'};
  if (!command) return {type:'empty'};
  if (command === 'help') return {type:'help'};
  if (command === 'clear') return {type:'clear'};
  if (Object.hasOwn(sections, command)) return {type:'navigate', section:sections[command], filter:FILTERS.includes(command) ? command : command === 'work' ? 'all' : null};
  return {type:'unknown', command};
}
export function matchesFilter(category, filter) {
  return filter === 'all' || category === filter;
}
