$sourceFile = "i:\2025-PLP-JULY-COHOT\AI-ML-DL\MY-VIBE-CODING-TEMPLATES\MY-PROJECTS\ATITO CIVIL ACADEMY\lms-platform\js\course-data.js"
$targetFile = "i:\2025-PLP-JULY-COHOT\AI-ML-DL\MY-VIBE-CODING-TEMPLATES\MY-PROJECTS\ATITO CIVIL ACADEMY\lms-platform\backend\subscription-tracker-api\seed.js"

$content = Get-Content $sourceFile -Raw

# Extract COURSES array
$pattern = "(?s)const COURSES = \[.*?\];"
$match = [regex]::Match($content, $pattern)

if ($match.Success) {
    $coursesData = $match.Value
    
    $imports = "import mongoose from 'mongoose';`r`nimport Course from './models/course.model.js';`r`nimport { DB_URI } from './config/env.js';`r`n`r`n"
    
    $seedLogic = "`r`n`r`nconst seedCourses = async () => {`r`n    try {`r`n        await mongoose.connect(DB_URI);`r`n        console.log('Connected to database');`r`n`r`n        await Course.deleteMany({});`r`n        console.log('Deleted existing courses');`r`n`r`n        await Course.insertMany(COURSES);`r`n        console.log('Seeded courses successfully');`r`n`r`n        process.exit(0);`r`n    } catch (error) {`r`n        console.error('Error seeding database:', error);`r`n        process.exit(1);`r`n    }`r`n};`r`n`r`nseedCourses();"
    
    $finalContent = $imports + $coursesData + $seedLogic
    
    Set-Content $targetFile -Value $finalContent -Encoding UTF8
    Write-Host "seed.js created successfully."
} else {
    Write-Error "Could not find COURSES array in source file."
}
