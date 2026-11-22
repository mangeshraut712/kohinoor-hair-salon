import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

test('CONTENT.md and Kiro specs exist', () => {
  assert.equal(existsSync(join(process.cwd(), 'CONTENT.md')), true);
  assert.equal(existsSync(join(process.cwd(), '.kiro/specs/kohinoor-website/tasks.md')), true);
});
