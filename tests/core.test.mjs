import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeCommand, resolveCommand, matchesFilter, COMMANDS, FILTERS} from '../core.js';
test('normalizes command casing and whitespace',()=>assert.equal(normalizeCommand('  WHOAMI  '),'whoami'));
test('handles absent commands',()=>assert.equal(normalizeCommand(null),''));
test('collapses whitespace without accepting arguments',()=>assert.deepEqual(resolveCommand('work   now'),{type:'unknown',command:'work now'}));
test('empty command is a no-op',()=>assert.deepEqual(resolveCommand(' '),{type:'empty'}));
test('help returns command help',()=>assert.deepEqual(resolveCommand('help'),{type:'help'}));
test('clear is local output clearing',()=>assert.deepEqual(resolveCommand('clear'),{type:'clear'}));
for (const command of ['whoami','work','tools','research','guides','credentials','connect']) {
  test(`${command} navigates to an allowlisted section`,()=>{const result=resolveCommand(command);assert.equal(result.type,'navigate');assert.ok(['about','work','credentials','connect'].includes(result.section));});
}
test('work resets a previous filter',()=>assert.equal(resolveCommand('work').filter,'all'));
test('research selects the research filter',()=>assert.equal(resolveCommand('research').filter,'research'));
test('prototype properties cannot be commands',()=>assert.equal(resolveCommand('constructor').type,'unknown'));
test('script input remains inert text',()=>assert.equal(resolveCommand('<script>alert(1)</script>').type,'unknown'));
test('shell syntax remains inert text',()=>assert.equal(resolveCommand('work; rm -rf /').type,'unknown'));
test('all filter includes every project category',()=>FILTERS.slice(1).forEach(category=>assert.ok(matchesFilter(category,'all'))));
test('category filter only includes matching projects',()=>{assert.ok(matchesFilter('tools','tools'));assert.equal(matchesFilter('guides','tools'),false);});
test('command list is immutable',()=>assert.ok(Object.isFrozen(COMMANDS)));
test('filters are immutable',()=>assert.ok(Object.isFrozen(FILTERS)));
