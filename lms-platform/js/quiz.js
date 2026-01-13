import Auth from './auth.js';
import { CourseService } from './course-data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    const moduleId = urlParams.get('moduleId');
    const type = urlParams.get('type'); // 'module' or 'final'

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    let userAnswers = [];
    let isReviewMode = false;

    // UI Elements
    const quizTitleEl = document.getElementById('quiz-title');
    const questionCountEl = document.getElementById('question-count');
    const progressBarEl = document.getElementById('progress-bar');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainerEl = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    const reviewBtn = document.getElementById('review-btn');
    const quizContentEl = document.getElementById('quiz-content');
    const resultsSectionEl = document.getElementById('results-section');

    // Load Data
    const course = await CourseService.getById(courseId);
    if (!course) {
        alert('Course not found');
        window.location.href = 'courses.html';
        return;
    }

    if (type === 'final') {
        quizTitleEl.textContent = `Final Exam: ${course.title}`;
        // Aggregate all questions
        let allQuestions = [];
        course.modules.forEach(mod => {
            if (mod.questions) {
                allQuestions = [...allQuestions, ...mod.questions];
            }
        });
        // Shuffle and pick 50
        questions = shuffleArray(allQuestions).slice(0, 50);
    } else {
        // Module Quiz
        const module = course.modules.find(m => m.id === moduleId);
        if (!module) {
            alert('Module not found');
            return;
        }
        quizTitleEl.textContent = `Quiz: ${module.title}`;
        questions = module.questions || [];
    }

    if (questions.length === 0) {
        quizContentEl.innerHTML = '<div class="text-center py-10"><p class="text-xl text-gray-600">No questions available for this quiz yet.</p><a href="javascript:history.back()" class="btn btn-primary mt-4">Go Back</a></div>';
        return;
    }

    // Initialize Quiz
    loadQuestion(currentQuestionIndex);

    // Timer Logic
    const TIME_PER_QUESTION = 60; // seconds
    let totalTime = questions.length * TIME_PER_QUESTION;
    const timerEl = document.getElementById('timer');
    timerEl.classList.remove('hidden');

    function updateTimerDisplay() {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        timerEl.innerHTML = `<i class="fas fa-clock mr-1"></i> ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (totalTime <= 300) { // Alert when 5 mins left (or less)
            timerEl.classList.add('text-red-600', 'font-bold');
        }
    }

    const timerInterval = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            // alert('Time is up! Submitting your quiz.'); // Removed intrusive alert
            submitQuiz(true); // create submitQuiz with boolean param for timedOut
            return;
        }
        totalTime--;
        updateTimerDisplay();
    }, 1000);

    updateTimerDisplay(); // Initial call

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    submitBtn.addEventListener('click', () => submitQuiz(false));

    if (reviewBtn) {
        reviewBtn.addEventListener('click', startReviewMode);
    }

    function loadQuestion(index) {
        const question = questions[index];
        questionTextEl.textContent = `${index + 1}. ${question.text}`;

        // Update Progress
        const progress = ((index + 1) / questions.length) * 100;
        progressBarEl.style.width = `${progress}%`;
        questionCountEl.textContent = `Question ${index + 1} of ${questions.length}`;

        // Render Options
        optionsContainerEl.innerHTML = '';
        question.options.forEach((option, i) => {
            const label = document.createElement('label');
            let baseClasses = 'p-4 border rounded-lg cursor-pointer transition-colors flex items-center gap-3';

            // Visual Styling Logic
            if (isReviewMode) {
                const isSelected = userAnswers[index] === i;
                const isCorrect = question.correctAnswer === i;

                if (isCorrect) {
                    baseClasses += ' bg-green-100 border-green-500';
                } else if (isSelected && !isCorrect) {
                    baseClasses += ' bg-red-100 border-red-500';
                } else {
                    baseClasses += ' border-gray-200 opacity-60';
                }
            } else {
                // Normal Quiz Mode
                baseClasses += userAnswers[index] === i ? ' border-primary bg-blue-50' : ' border-gray-200 hover:bg-gray-50';
            }

            label.className = baseClasses;

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'quiz-option';
            input.value = i;
            input.checked = userAnswers[index] === i;
            input.disabled = isReviewMode; // Disable in review mode
            input.className = 'w-5 h-5 text-primary focus:ring-primary border-gray-300';
            input.style.accentColor = 'var(--primary-color)';

            if (!isReviewMode) {
                // Event listener for selection only in quiz mode
                input.addEventListener('change', () => selectOption(index, i));
            }

            const span = document.createElement('span');
            span.textContent = option;
            span.className = 'text-gray-700 font-medium';

            // Add icon for review mode
            if (isReviewMode) {
                if (question.correctAnswer === i) {
                    span.innerHTML += ' <i class="fas fa-check text-green-600 ml-2"></i>';
                } else if (userAnswers[index] === i) {
                    span.innerHTML += ' <i class="fas fa-times text-red-600 ml-2"></i>';
                }
            }

            label.appendChild(input);
            label.appendChild(span);
            optionsContainerEl.appendChild(label);
        });

        // Button States
        prevBtn.classList.toggle('hidden', index === 0);

        if (isReviewMode) {
            nextBtn.classList.toggle('hidden', index === questions.length - 1);
            submitBtn.classList.add('hidden'); // Never show submit in review

            // If last question in review, maybe show a "Exit Review" or similar?
            // For now just hide next button.
        } else {
            if (index === questions.length - 1) {
                nextBtn.classList.add('hidden');
                submitBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                submitBtn.classList.add('hidden');
            }
        }
    }

    function selectOption(qIndex, oIndex) {
        userAnswers[qIndex] = oIndex;
        loadQuestion(qIndex); // Re-render to show selection
    }

    function submitQuiz(timedOut = false) {
        clearInterval(timerInterval);
        timerEl.classList.add('hidden'); // Hide timer on finish
        score = 0;
        questions.forEach((q, i) => {
            if (userAnswers[i] === q.correctAnswer) {
                score++;
            }
        });

        const percentage = Math.round((score / questions.length) * 100);

        // Show Results
        quizContentEl.classList.add('hidden');
        resultsSectionEl.classList.remove('hidden');

        document.getElementById('score-text').textContent = `${percentage}%`;
        document.getElementById('total-questions').textContent = questions.length;
        document.getElementById('correct-answers').textContent = score;

        const resultMessage = document.getElementById('result-message');

        if (timedOut) {
            resultMessage.innerHTML = "<span class='text-red-600 block mb-2'>Time's Up!</span>";
        } else {
            resultMessage.innerHTML = "";
        }

        if (percentage >= 70) {
            // Save Completion Status FIRST
            if (type === 'final') {
                // Final Exam - Save course completion
                const user = await Auth.getCurrentUser();
                if (user) {
                    if (!user.completedCourses) {
                        user.completedCourses = [];
                    }
                    const courseKey = course._id || courseId;
                    if (!user.completedCourses.includes(courseKey)) {
                        user.completedCourses.push(courseKey);
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                }

                // Show success message for final exam
                resultMessage.innerHTML += " Congratulations! You've successfully completed the course and passed the final exam!";
                resultMessage.className = "text-green-600 font-medium";

                // Show Certificate Button (ONLY for final exams)
                const certBtn = document.getElementById('certificate-btn');
                if (certBtn) {
                    certBtn.classList.remove('hidden');
                    certBtn.onclick = () => {
                        window.location.href = `certificate.html?courseId=${courseId}&score=${percentage}`;
                    };
                }
            } else {
                // Module Quiz - Save module completion
                const user = await Auth.getCurrentUser();
                if (user) {
                    if (!user.completedModules) {
                        user.completedModules = [];
                    }
                    // Use composite key: courseId_moduleId
                    const compositeKey = `${course._id || courseId}_${moduleId}`;

                    if (!user.completedModules.includes(compositeKey)) {
                        user.completedModules.push(compositeKey);
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                }

                // Show success message for module (no certificate)
                resultMessage.innerHTML += " Excellent! You've mastered this module. Continue to the next module or take the final exam to earn your certificate.";
                resultMessage.className = "text-green-600 font-medium";
            }

        } else if (percentage >= 60) {
            resultMessage.textContent = "Good job! You passed.";
            resultMessage.className = "text-blue-600 font-medium";
        } else {
            resultMessage.textContent = "Keep practicing. You can do better!";
            resultMessage.className = "text-red-600 font-medium";
        }
    }


    function startReviewMode() {
        isReviewMode = true;
        currentQuestionIndex = 0;

        // Hide Results, Show Quiz Content
        resultsSectionEl.classList.add('hidden');
        quizContentEl.classList.remove('hidden');

        // Update Title
        quizTitleEl.textContent += " (Review)";

        // Disable timer if distinct, but we hid it already

        loadQuestion(currentQuestionIndex);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
