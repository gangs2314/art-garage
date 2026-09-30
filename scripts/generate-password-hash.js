#!/usr/bin/env node
/**
 * Generate a bcrypt hash for admin passwords
 * Usage: node scripts/generate-password-hash.js
 */

import bcryptjs from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateHash() {
  rl.question('Enter the password to hash: ', async (password) => {
    if (!password) {
      console.error('Password cannot be empty');
      rl.close();
      process.exit(1);
    }

    try {
      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(password, salt);
      console.log('\nGenerated bcrypt hash:');
      console.log(hash);
      console.log('\nAdd this to your .env.local or Vercel environment variables as:');
      console.log(`ADMIN_PASSWORD_HASH=${hash}`);
      rl.close();
    } catch (error) {
      console.error('Error generating hash:', error);
      rl.close();
      process.exit(1);
    }
  });
}

generateHash();
