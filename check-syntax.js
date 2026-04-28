const fs = require('fs');

// Read the file
const filePath = '/Users/sesloan/repos/websites/thalamus-main/src/app/solutions/consulting/vendor-evaluations/page.tsx';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

console.log('=== TypeScript Syntax Error Analysis ===\n');

// Function to check for fancy/smart quotes
function findFancyQuotes(str, lineNum) {
  // Define smart quote characters using their Unicode code points
  const leftDoubleQuote = '\u201C';   // "
  const rightDoubleQuote = '\u201D';  // "
  const leftSingleQuote = '\u2018';   // '
  const rightSingleQuote = '\u2019';  // '
  const singleLow9Quote = '\u201A';   // ‚
  const doubleLow9Quote = '\u201E';   // „
  
  const fancyQuotes = [
    { char: leftDoubleQuote, name: 'Left double quotation mark' },
    { char: rightDoubleQuote, name: 'Right double quotation mark' },
    { char: leftSingleQuote, name: 'Left single quotation mark' },
    { char: rightSingleQuote, name: 'Right single quotation mark' },
    { char: singleLow9Quote, name: 'Single low-9 quotation mark' },
    { char: doubleLow9Quote, name: 'Double low-9 quotation mark' }
  ];
  
  const found = [];
  for (const quote of fancyQuotes) {
    let index = str.indexOf(quote.char);
    while (index !== -1) {
      found.push({
        line: lineNum,
        column: index + 1,
        char: quote.char,
        name: quote.name,
        context: str.substring(Math.max(0, index - 20), Math.min(str.length, index + 20))
      });
      index = str.indexOf(quote.char, index + 1);
    }
  }
  return found;
}

// Function to check for potential unescaped quotes in strings
function checkStringQuotes(str, lineNum) {
  const issues = [];
  
  // Check for patterns that might indicate unescaped quotes
  // Look for double quotes inside what appears to be a double-quoted string
  const doubleQuotePattern = /"[^"]*"[^"]*"/g;
  let match;
  while ((match = doubleQuotePattern.exec(str)) !== null) {
    const matchedStr = match[0];
    // Check if there are unescaped inner quotes
    const innerQuotes = matchedStr.match(/(?<!\\)"(?!$)/g);
    if (innerQuotes && innerQuotes.length > 2) {
      issues.push({
        line: lineNum,
        column: match.index + 1,
        type: 'Potential unescaped double quotes',
        match: matchedStr.substring(0, 50) + (matchedStr.length > 50 ? '...' : ''),
        quoteCount: innerQuotes.length
      });
    }
  }
  
  return issues;
}

// Check specific sections
console.log('--- Section 1: Line 407 (faqItems array) ---');
if (lines[406]) {
  const line = lines[406];
  console.log(`Line 407: ${line.substring(0, 100)}${line.length > 100 ? '...' : ''}`);
  
  const fancyQuotes = findFancyQuotes(line, 407);
  if (fancyQuotes.length > 0) {
    console.log('\n  Fancy quotes found:');
    fancyQuotes.forEach(q => {
      console.log(`    Line ${q.line}, Col ${q.column}: ${q.name} (${q.char})`);
      console.log(`    Context: "${q.context}"`);
    });
  }
  
  const unescaped = checkStringQuotes(line, 407);
  if (unescaped.length > 0) {
    console.log('\n  Potential unescaped quotes:');
    unescaped.forEach(u => {
      console.log(`    Line ${u.line}, Col ${u.column}: ${u.type}`);
      console.log(`    Match: ${u.match}`);
    });
  }
}

console.log('\n--- Section 2: Lines 450-478 (commonMisconceptions array) ---');
const fancyQuotes450_478 = [];
const unescaped450_478 = [];

for (let i = 449; i < 478 && i < lines.length; i++) {
  const line = lines[i];
  const lineNum = i + 1;
  
  const fancy = findFancyQuotes(line, lineNum);
  fancyQuotes450_478.push(...fancy);
  
  const unescaped = checkStringQuotes(line, lineNum);
  unescaped450_478.push(...unescaped);
}

if (fancyQuotes450_478.length > 0) {
  console.log('\n  Fancy quotes found:');
  fancyQuotes450_478.forEach(q => {
    console.log(`    Line ${q.line}, Col ${q.column}: ${q.name} (${q.char})`);
    console.log(`    Context: "${q.context}"`);
  });
} else {
  console.log('  No fancy quotes found.');
}

if (unescaped450_478.length > 0) {
  console.log('\n  Potential unescaped quotes:');
  unescaped450_478.forEach(u => {
    console.log(`    Line ${u.line}, Col ${u.column}: ${u.type}`);
    console.log(`    Match: ${u.match}`);
  });
} else {
  console.log('  No unescaped quote issues found.');
}

console.log('\n--- Section 3: Lines 480-560 (whatToExpect array) ---');
const fancyQuotes480_560 = [];
const unescaped480_560 = [];

for (let i = 479; i < 560 && i < lines.length; i++) {
  const line = lines[i];
  const lineNum = i + 1;
  
  const fancy = findFancyQuotes(line, lineNum);
  fancyQuotes480_560.push(...fancy);
  
  const unescaped = checkStringQuotes(line, lineNum);
  unescaped480_560.push(...unescaped);
}

if (fancyQuotes480_560.length > 0) {
  console.log('\n  Fancy quotes found:');
  fancyQuotes480_560.forEach(q => {
    console.log(`    Line ${q.line}, Col ${q.column}: ${q.name} (${q.char})`);
    console.log(`    Context: "${q.context}"`);
  });
} else {
  console.log('  No fancy quotes found.');
}

if (unescaped480_560.length > 0) {
  console.log('\n  Potential unescaped quotes:');
  unescaped480_560.forEach(u => {
    console.log(`    Line ${u.line}, Col ${u.column}: ${u.type}`);
    console.log(`    Match: ${u.match}`);
  });
} else {
  console.log('  No unescaped quote issues found.');
}

// Now try to parse with TypeScript compiler
console.log('\n\n=== TypeScript Compiler Analysis ===');

try {
  const ts = require('typescript');
  
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );
  
  const diagnostics = [];
  
  // Get all syntactic diagnostics
  const syntacticDiagnostics = sourceFile.parseDiagnostics || [];
  
  if (syntacticDiagnostics.length === 0) {
    console.log('No syntax errors detected by TypeScript compiler in the entire file!');
  } else {
    console.log(`Found ${syntacticDiagnostics.length} syntax errors:`);
    syntacticDiagnostics.forEach((diag, i) => {
      const line = sourceFile.getLineAndCharacterOfPosition(diag.start).line + 1;
      const col = sourceFile.getLineAndCharacterOfPosition(diag.start).character + 1;
      console.log(`\n${i + 1}. Line ${line}, Col ${col}:`);
      console.log(`   ${diag.messageText}`);
      if (diag.start !== undefined && diag.length !== undefined) {
        const context = content.substring(diag.start, diag.start + diag.length);
        console.log(`   Context: "${context.substring(0, 60)}${context.length > 60 ? '...' : ''}"`);
      }
    });
  }
} catch (e) {
  console.log('TypeScript compiler not available, using basic parsing...');
  console.log('Error:', e.message);
}

console.log('\n=== Analysis Complete ===');
