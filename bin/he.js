#!/usr/bin/env node
import he from '../lib/he.js';

const strings = process.argv.slice(2);
const stdin = process.stdin;
const log = console.log;
let action;
let timeout;
const options = {};

function main() {
  const option = strings[0];
  let count = 0;

  if (/^(?:-h|--help|undefined)$/.test(String(option))) {
    log('he v%s - https://mths.be/he', he.version);
    log(
      [
        '\nUsage:\n',
        '\the [--escape] string',
        '\the [--encode] [--use-named-refs] [--everything] [--allow-unsafe] [--decimal] string',
        '\the [--decode] [--attribute] [--strict] string',
        '\the [-v | --version]',
        '\the [-h | --help]',
        '\nExamples:\n',
        "\the --escape \\<img\\ src\\=\\'x\\'\\ onerror\\=\\\"prompt\\(1\\)\\\"\\>",
        "\techo '&copy; &#x1D306;' | he --decode",
      ].join('\n')
    );
    return process.exit(option ? 0 : 1);
  }

  if (/^(?:-v|--version)$/.test(option)) {
    log('v%s', he.version);
    return process.exit(0);
  }

  strings.forEach((string) => {
    if (string === '--escape') return void (action = 'escape');
    if (string === '--encode') return void (action = 'encode');
    if (string === '--use-named-refs') {
      action = 'encode';
      options.useNamedReferences = true;
      return;
    }
    if (string === '--everything') {
      action = 'encode';
      options.encodeEverything = true;
      return;
    }
    if (string === '--allow-unsafe') {
      action = 'encode';
      options.allowUnsafeSymbols = true;
      return;
    }
    if (string === '--decimal') {
      action = 'encode';
      options.decimal = true;
      return;
    }
    if (string === '--decode') return void (action = 'decode');
    if (string === '--attribute') {
      action = 'decode';
      options.isAttributeValue = true;
      return;
    }
    if (string === '--strict') {
      action = 'decode';
      options.strict = true;
      return;
    }

    if (!action) {
      log('Error: he requires at least one option and a string argument.');
      log('Try `he --help` for more information.');
      return process.exit(1);
    }
    try {
      log(he[action](string, options));
      count++;
    } catch (error) {
      log(error.message + '\n');
      log('Error: failed to %s.', action);
      log('If you think this is a bug in he, please report it:');
      log('https://github.com/bybraveHQ/he2/issues/new');
      log('\nStack trace using @bybrave/he2@%s:\n', he.version);
      log(error.stack);
      return process.exit(1);
    }
  });

  if (!count) {
    log('Error: he requires a string argument.');
    log('Try `he --help` for more information.');
    return process.exit(1);
  }
  return process.exit(0);
}

if (stdin.isTTY) {
  main();
} else {
  if (!process.stdout.isTTY) {
    timeout = setTimeout(main, 60000);
  }
  let data = '';
  stdin.on('data', (chunk) => {
    clearTimeout(timeout);
    data += chunk;
  });
  stdin.on('end', () => {
    strings.push(data.trim());
    main();
  });
  stdin.resume();
}
