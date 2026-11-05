import {COMMANDS, FILTERS, matchesFilter, resolveCommand} from './core.js';

const root = document.documentElement;
root.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
menuButton.hidden = false;
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

const filterControls = document.querySelector('.filter-controls');
const filterButtons = [...filterControls.querySelectorAll('button')];
const projects = [...document.querySelectorAll('[data-category]')];
filterControls.hidden = false;
function filterProjects(filter) {
  if (!FILTERS.includes(filter)) return;
  let visibleCount = 0;
  projects.forEach(project => {
    project.hidden = !matchesFilter(project.dataset.category, filter);
    if (!project.hidden) visibleCount++;
  });
  filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  document.querySelector('.result-count').textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}`;
}
filterControls.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (button) filterProjects(button.dataset.filter);
});

const motionButton = document.querySelector('#motion-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let pauseMotion = motionPreference.matches;
function setMotion() {
  root.dataset.motion = pauseMotion ? 'off' : 'on';
  motionButton.setAttribute('aria-pressed', String(pauseMotion));
  motionButton.textContent = pauseMotion ? 'Resume motion' : 'Pause motion';
}
motionButton.hidden = motionPreference.matches;
setMotion();
motionButton.addEventListener('click', () => {pauseMotion = !pauseMotion; setMotion();});
motionPreference.addEventListener('change', event => {
  pauseMotion = event.matches;
  motionButton.hidden = event.matches;
  setMotion();
});

const terminal = document.querySelector('#terminal-dialog');
const terminalInput = document.querySelector('#terminal-input');
const output = document.querySelector('#terminal-output');
const terminalTrigger = document.querySelector('.terminal-trigger');
const terminalForm = document.querySelector('#terminal-form');
let returnFocus = null;
const history = [];
let historyPosition = 0;
function openTerminal() {
  if (terminal.open || typeof terminal.showModal !== 'function') return;
  returnFocus = document.activeElement;
  terminal.showModal();
  terminalInput.focus();
}
function closeTerminal() {
  terminal.close();
}
terminal.addEventListener('close', () => {
  terminalInput.value = '';
  if (returnFocus instanceof HTMLElement && returnFocus.isConnected) returnFocus.focus();
});
if (typeof terminal.showModal === 'function') {
  terminalTrigger.hidden = false;
  terminalTrigger.addEventListener('click', openTerminal);
}
document.querySelector('#close-terminal').addEventListener('click', closeTerminal);
terminal.addEventListener('click', event => {
  if (event.target !== terminal) return;
  const bounds = terminal.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeTerminal();
});
function appendOutput(text) {
  const line = document.createElement('p');
  line.textContent = text;
  output.append(line);
  while (output.children.length > 30) output.firstElementChild.remove();
  output.scrollTop = output.scrollHeight;
}
function runCommand(raw) {
  const result = resolveCommand(raw);
  if (result.type === 'empty') return;
  history.push(raw.trim());
  if (history.length > 50) history.shift();
  historyPosition = history.length;
  terminalInput.value = '';
  if (result.type === 'clear') {
    output.replaceChildren();
    terminalInput.focus();
    return;
  }
  appendOutput(`visitor@kaotickjay:~$ ${raw.trim()}`);
  if (result.type === 'help') {
    appendOutput(`Available commands:\n${COMMANDS.join(' · ')}\n\nUse ↑ / ↓ for command history. This terminal only navigates this portfolio.`);
  } else if (result.type === 'unknown') {
    appendOutput(`Unknown command: ${result.command}\nType help to see the available navigation commands.`);
  } else if (result.type === 'navigate') {
    if (result.filter) filterProjects(result.filter);
    const section = document.getElementById(result.section);
    returnFocus = section;
    closeTerminal();
    // Normal hash navigation preserves Back/Forward behavior.
    window.location.hash = result.section;
    section.setAttribute('tabindex', '-1');
    section.focus({preventScroll:true});
    section.scrollIntoView({behavior:pauseMotion ? 'instant' : 'smooth', block:'start'});
    return;
  }
  terminalInput.focus();
}
terminalForm.addEventListener('submit', event => {event.preventDefault(); runCommand(terminalInput.value);});
document.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => runCommand(button.dataset.command)));
terminalInput.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp' && history.length) {
    event.preventDefault();
    historyPosition = Math.max(0, historyPosition - 1);
    terminalInput.value = history[historyPosition];
  } else if (event.key === 'ArrowDown' && history.length) {
    event.preventDefault();
    historyPosition = Math.min(history.length, historyPosition + 1);
    terminalInput.value = history[historyPosition] ?? '';
  }
});
document.addEventListener('keydown', event => {
  const target = event.target;
  const typing = target instanceof HTMLElement && (target.matches('input, textarea, select') || target.isContentEditable);
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
  if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey && !terminal.open) {
    event.preventDefault();
    openTerminal();
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
