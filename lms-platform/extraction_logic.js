
const fs = require('fs');

const allQuestions = {};

console.log("\n--- Question Count Verification ---");
COURSES.forEach(course => {
    let courseTotal = 0;
    console.log(`Course: ${course.title}`);
    allQuestions[course.title] = [];
    course.modules.forEach(module => {
        const qCount = module.questions ? module.questions.length : 0;
        courseTotal += qCount;
        console.log(`  Module: ${module.title} - Questions: ${qCount}`);
        if (qCount !== 10) {
            console.warn(`  WARNING: Module ${module.title} has ${qCount} questions (Expected: 10)`);
        }
        if (module.questions) {
            allQuestions[course.title].push({
                module: module.title,
                questions: module.questions
            });
        }
    });
    console.log(`  > Total Course Questions: ${courseTotal}`);
    if (courseTotal < 50) {
        console.warn(`  WARNING: Course ${course.title} has ${courseTotal} questions (Expected: >= 50)`);
    }
});

fs.writeFileSync('questions.json', JSON.stringify(allQuestions, null, 2));
console.log('questions.json generated successfully.');
