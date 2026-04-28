const fs = require('fs');

const filePath = '/Users/sesloan/repos/websites/thalamus-main/src/app/solutions/consulting/vendor-evaluations/page.tsx';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

console.log('=== Detailed Syntax Analysis of Target Sections ===\n');

// Smart quote characters (Unicode)
const smartQuotes = {
  leftDouble: '\u201C',   // "
  rightDouble: '\u201D',  // "
  leftSingle: '\u2018',   // '
  rightSingle: '\u2019',  // '
};

// Check for smart quotes in a string
function hasSmartQuotes(str) {
  return str.includes(smartQuotes.leftDouble) ||
         str.includes(smartQuotes.rightDouble) ||
         str.includes(smartQuotes.leftSingle) ||
         str.includes(smartQuotes.rightSingle);
}

// Find positions of smart quotes
function findSmartQuotePositions(str, lineNum) {
  const positions = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === smartQuotes.leftDouble) {
      positions.push({ line: lineNum, col: i + 1, type: 'Left double quote "', char });
    } else if (char === smartQuotes.rightDouble) {
      positions.push({ line: lineNum, col: i + 1, type: 'Right double quote "', char });
    } else if (char === smartQuotes.leftSingle) {
      positions.push({ line: lineNum, col: i + 1, type: 'Left single quote \'', char });
    } else if (char === smartQuotes.rightSingle) {
      positions.push({ line: lineNum, col: i + 1, type: 'Right single quote \'', char });
    }
  }
  return positions;
}

// Check for potential string issues
function checkStringIssues(str, lineNum) {
  const issues = [];
  
  // Look for double quotes inside double-quoted strings
  // Pattern: start with ", have content, then another " that might not be escaped
  let inString = false;
  let stringStart = -1;
  let escapeNext = false;
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const prevChar = i > 0 ? str[i - 1] : '';
    
    if (char === '\\' && !escapeNext) {
      escapeNext = true;
      continue;
    }
    
    if (char === '"' && !escapeNext) {
      if (!inString) {
        inString = true;
        stringStart = i;
      } else {
        // End of string
        const stringContent = str.substring(stringStart + 1, i);
        // Check for unescaped quotes inside
        const innerQuotes = stringContent.match(/(?<!\\)"/g);
        if (innerQuotes && innerQuotes.length > 0) {
          issues.push({
            line: lineNum,
            column: stringStart + 1,
            type: 'Unescaped double quote inside string',
            content: str.substring(stringStart, i + 1).substring(0, 60)
          });
        }
        inString = false;
      }
    }
    
    escapeNext = false;
  }
  
  // Check for unclosed strings (strings that start but don't end on same line)
  if (inString) {
    issues.push({
      line: lineNum,
      column: stringStart + 1,
      type: 'Potentially unclosed string',
      content: str.substring(stringStart, stringStart + 60)
    });
  }
  
  return issues;
}

// Check specific sections
const sections = [
  { name: 'Line 407 (faqItems)', start: 406, end: 407 },
  { name: 'Lines 450-478 (commonMisconceptions)', start: 449, end: 478 },
  { name: 'Lines 480-560 (whatToExpect)', start: 479, end: 560 }
];

let totalSmartQuotes = 0;
let totalStringIssues = 0;

sections.forEach(section => {
  console.log(`\n--- ${section.name} ---`);
  const sectionLines = lines.slice(section.start, section.end);
  
  // Check for smart quotes
  const smartQuoteIssues = [];
  const stringIssues = [];
  
  sectionLines.forEach((line, idx) => {
    const lineNum = section.start + idx + 1;
    const sq = findSmartQuotePositions(line, lineNum);
    smartQuoteIssues.push(...sq);
    
    const si = checkStringIssues(line, lineNum);
    stringIssues.push(...si);
  });
  
  if (smartQuoteIssues.length > 0) {
    console.log('\n  SMART QUOTES FOUND:');
    smartQuoteIssues.forEach(issue => {
      console.log(`    Line ${issue.line}, Col ${issue.col}: ${issue.type}`);
      const context = lines[issue.line - 1];
      console.log(`    Context: ${context.substring(0, 80)}${context.length > 80 ? '...' : ''}`);
    });
    totalSmartQuotes += smartQuoteIssues.length;
  } else {
    console.log('  No smart/fancy quotes found.');
  }
  
  if (stringIssues.length > 0) {
    console.log('\n  STRING ISSUES:');
    stringIssues.forEach(issue => {
      console.log(`    Line ${issue.line}, Col ${issue.column}: ${issue.type}`);
      console.log(`    Content: ${issue.content}`);
    });
    totalStringIssues += stringIssues.length;
  } else {
    console.log('  No string syntax issues found.');
  }
});

console.log('\n\n=== SUMMARY ===');
console.log(`Total smart quotes found: ${totalSmartQuotes}`);
console.log(`Total string issues found: ${totalStringIssues}`);

if (totalSmartQuotes === 0 && totalStringIssues === 0) {
  console.log('\n✅ No syntax errors detected in the specified sections!');
}

// Additional: Try to parse the data structures
console.log('\n\n=== Testing Data Structure Parsing ===');

// Extract faqItems array
const faqMatch = content.match(/const faqItems = \[([\s\S]*?)\];/);
if (faqMatch) {
  try {
    // Wrap in parens and eval to test
    const testParse = new Function('return ' + faqMatch[0].replace('const faqItems = ', ''));
    const result = testParse();
    console.log('✅ faqItems array parses successfully');
    console.log(`   Found ${result.length} FAQ items`);
  } catch (e) {
    console.log('❌ faqItems array has parse errors:', e.message);
  }
}

// Extract commonMisconceptions array
const cmMatch = content.match(/const commonMisconceptions = \[([\s\S]*?)\];/);
if (cmMatch) {
  try {
    const testParse = new Function('return ' + cmMatch[0].replace('const commonMisconceptions = ', ''));
    const result = testParse();
    console.log('✅ commonMisconceptions array parses successfully');
    console.log(`   Found ${result.length} misconceptions`);
  } catch (e) {
    console.log('❌ commonMisconceptions array has parse errors:', e.message);
  }
}

// Extract whatToExpect array
const wteMatch = content.match(/const whatToExpect = \[([\s\S]*?)\];/);
if (wteMatch) {
  try {
    const testParse = new Function('return ' + wteMatch[0].replace('const whatToExpect = ', ''));
    const result = testParse();
    console.log('✅ whatToExpect array parses successfully');
    console.log(`   Found ${result.length} phases`);
  } catch (e) {
    console.log('❌ whatToExpect array has parse errors:', e.message);
  }
}
