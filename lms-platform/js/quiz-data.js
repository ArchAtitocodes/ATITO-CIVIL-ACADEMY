/**
 * Quiz Data - Comprehensive Construction & CAD Mastery LMS
 * Contains quiz questions for all courses
 */

const QUIZZES = {
    'c1': { // Building Construction Technology
        title: 'Building Construction Technology Assessment',
        questions: [
            {
                id: 1,
                question: 'What is the primary purpose of a foundation in a building structure?',
                options: [
                    'To provide aesthetic appeal',
                    'To transfer building loads to the ground',
                    'To create basement space',
                    'To prevent water infiltration'
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                question: 'Which test is commonly performed on fresh concrete to check workability?',
                options: [
                    'Tensile test',
                    'Slump test',
                    'Impact test',
                    'Fatigue test'
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                question: 'What is the standard curing period for concrete to achieve design strength?',
                options: [
                    '7 days',
                    '14 days',
                    '28 days',
                    '56 days'
                ],
                correctAnswer: 2
            },
            {
                id: 4,
                question: 'Which type of steel reinforcement is most commonly used in concrete construction?',
                options: [
                    'Mild steel',
                    'High-tensile steel bars (rebar)',
                    'Stainless steel',
                    'Cast iron'
                ],
                correctAnswer: 1
            },
            {
                id: 5,
                question: 'What does PPE stand for in construction safety?',
                options: [
                    'Personal Protection Equipment',
                    'Personal Protective Equipment',
                    'Professional Protection Element',
                    'Practical Protective Equipment'
                ],
                correctAnswer: 1
            },
            {
                id: 6,
                question: 'In a Bill of Quantities (BOQ), what unit is typically used for measuring excavation work?',
                options: [
                    'Square meters (m²)',
                    'Cubic meters (m³)',
                    'Linear meters (m)',
                    'Kilograms (kg)'
                ],
                correctAnswer: 1
            },
            {
                id: 7,
                question: 'Which type of bond pattern in masonry provides the strongest wall?',
                options: [
                    'Stretcher bond',
                    'Header bond',
                    'English bond',
                    'Flemish bond'
                ],
                correctAnswer: 2
            },
            {
                id: 8,
                question: 'What is the main difference between a one-way and two-way slab?',
                options: [
                    'Thickness of the slab',
                    'Direction of load transfer',
                    'Type of reinforcement used',
                    'Construction method'
                ],
                correctAnswer: 1
            },
            {
                id: 9,
                question: 'Which drawing shows a vertical cut through a building?',
                options: [
                    'Floor plan',
                    'Elevation',
                    'Section',
                    'Site plan'
                ],
                correctAnswer: 2
            },
            {
                id: 10,
                question: 'What is the primary purpose of a damp proof course (DPC) in construction?',
                options: [
                    'To strengthen the wall',
                    'To prevent moisture from rising through walls',
                    'To improve thermal insulation',
                    'To enhance aesthetic appearance'
                ],
                correctAnswer: 1
            }
        ]
    },
    'c2': { // AutoCAD Training
        title: 'AutoCAD Proficiency Assessment',
        questions: [
            {
                id: 1,
                question: 'What is the command shortcut for the LINE command in AutoCAD?',
                options: [
                    'LI',
                    'L',
                    'LN',
                    'LINE'
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                question: 'Which space is used for creating and editing drawing objects?',
                options: [
                    'Paper Space',
                    'Model Space',
                    'Layout Space',
                    'Design Space'
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                question: 'What does the OFFSET command do?',
                options: [
                    'Moves objects to a new location',
                    'Creates parallel copies of objects at a specified distance',
                    'Rotates objects around a point',
                    'Scales objects to a new size'
                ],
                correctAnswer: 1
            },
            {
                id: 4,
                question: 'Which object snap mode would you use to snap to the midpoint of a line?',
                options: [
                    'END',
                    'CEN',
                    'MID',
                    'INT'
                ],
                correctAnswer: 2
            },
            {
                id: 5,
                question: 'What is the purpose of layers in AutoCAD?',
                options: [
                    'To create 3D models',
                    'To organize drawing objects with different properties',
                    'To print multiple copies',
                    'To save different versions of a drawing'
                ],
                correctAnswer: 1
            },
            {
                id: 6,
                question: 'Which command is used to create a block in AutoCAD?',
                options: [
                    'BLOCK',
                    'MAKE',
                    'CREATE',
                    'GROUP'
                ],
                correctAnswer: 0
            },
            {
                id: 7,
                question: 'What file format is used for AutoCAD templates?',
                options: [
                    '.dwg',
                    '.dxf',
                    '.dwt',
                    '.bak'
                ],
                correctAnswer: 2
            },
            {
                id: 8,
                question: 'Which command would you use to create a circular array of objects?',
                options: [
                    'COPY',
                    'ARRAY',
                    'CIRCLE',
                    'POLAR'
                ],
                correctAnswer: 1
            },
            {
                id: 9,
                question: 'What does the TRIM command do?',
                options: [
                    'Extends objects to meet other objects',
                    'Cuts objects at specified cutting edges',
                    'Scales objects proportionally',
                    'Moves objects to grid points'
                ],
                correctAnswer: 1
            },
            {
                id: 10,
                question: 'In 3D modeling, which command creates a 3D solid by rotating a 2D profile?',
                options: [
                    'EXTRUDE',
                    'REVOLVE',
                    'SWEEP',
                    'LOFT'
                ],
                correctAnswer: 1
            }
        ]
    },
    'c3': { // Revit Architecture
        title: 'Revit Architecture Assessment',
        questions: [
            {
                id: 1,
                question: 'What does BIM stand for?',
                options: [
                    'Basic Information Modeling',
                    'Building Information Modeling',
                    'Building Integrated Management',
                    'Blueprint Information Method'
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                question: 'In Revit, what is a family?',
                options: [
                    'A group of users',
                    'A parametric building component',
                    'A set of view templates',
                    'A collection of materials'
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                question: 'Which view type shows a horizontal cut through the building?',
                options: [
                    'Elevation',
                    'Section',
                    'Floor Plan',
                    '3D View'
                ],
                correctAnswer: 2
            },
            {
                id: 4,
                question: 'What is the purpose of levels in Revit?',
                options: [
                    'To create layers like AutoCAD',
                    'To define horizontal datums for building floors',
                    'To set user permissions',
                    'To organize project phases'
                ],
                correctAnswer: 1
            },
            {
                id: 5,
                question: 'Which tool would you use to create a parametric wall in Revit?',
                options: [
                    'Line tool',
                    'Wall tool',
                    'Sketch tool',
                    'Component tool'
                ],
                correctAnswer: 1
            },
            {
                id: 6,
                question: 'What is worksharing in Revit?',
                options: [
                    'Sharing worksheets between projects',
                    'Collaboration feature allowing multiple users to work on the same project',
                    'Exporting work to other software',
                    'Creating work schedules'
                ],
                correctAnswer: 1
            },
            {
                id: 7,
                question: 'Which schedule type would you create to list all doors in a project?',
                options: [
                    'Room Schedule',
                    'Door Schedule',
                    'Material Schedule',
                    'Key Schedule'
                ],
                correctAnswer: 1
            },
            {
                id: 8,
                question: 'What is the difference between a Central File and a Local File in worksharing?',
                options: [
                    'File size',
                    'Central is the master; Local is a working copy',
                    'File format',
                    'Location on computer'
                ],
                correctAnswer: 1
            },
            {
                id: 9,
                question: 'Which rendering engine is built into Revit?',
                options: [
                    'V-Ray',
                    'Corona',
                    'Revit Rendering',
                    'Mental Ray (in older versions)'
                ],
                correctAnswer: 2
            },
            {
                id: 10,
                question: 'What is a view template used for in Revit?',
                options: [
                    'Creating new project templates',
                    'Standardizing view properties across multiple views',
                    'Designing custom families',
                    'Managing user permissions'
                ],
                correctAnswer: 1
            }
        ]
    },
    'c4': { // ArchiCAD
        title: 'ArchiCAD Proficiency Assessment',
        questions: [
            {
                id: 1,
                question: 'What file format does ArchiCAD primarily use?',
                options: [
                    '.dwg',
                    '.pln',
                    '.rvt',
                    '.3dm'
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                question: 'What are Stories in ArchiCAD equivalent to in other BIM software?',
                options: [
                    'Layers',
                    'Levels or Floors',
                    'Phases',
                    'Worksets'
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                question: 'Which tool is used to create walls in ArchiCAD?',
                options: [
                    'Line Tool',
                    'Wall Tool',
                    'Slab Tool',
                    'Beam Tool'
                ],
                correctAnswer: 1
            },
            {
                id: 4,
                question: 'What is BIMx used for in ArchiCAD?',
                options: [
                    'Building calculations',
                    'Creating presentations and interactive 3D models',
                    'Cost estimation',
                    'Structural analysis'
                ],
                correctAnswer: 1
            },
            {
                id: 5,
                question: 'What does GDL stand for in ArchiCAD?',
                options: [
                    'Geometric Drawing Language',
                    'Geometric Description Language',
                    'General Design Library',
                    'Graphic Data Language'
                ],
                correctAnswer: 1
            },
            {
                id: 6,
                question: 'Which collaboration feature in ArchiCAD is similar to Revit\'s Worksharing?',
                options: [
                    'Teamwork',
                    'Collaboration',
                    'Network Sharing',
                    'Multi-user Mode'
                ],
                correctAnswer: 0
            },
            {
                id: 7,
                question: 'What is the Layout Book in ArchiCAD?',
                options: [
                    'A library of objects',
                    'A collection of construction documents and sheets',
                    'A rendering settings panel',
                    'A material library'
                ],
                correctAnswer: 1
            },
            {
                id: 8,
                question: 'Which exchange format is commonly used for BIM collaboration?',
                options: [
                    'PDF',
                    'IFC (Industry Foundation Classes)',
                    'JPG',
                    'DWF'
                ],
                correctAnswer: 1
            },
            {
                id: 9,
                question: 'What is the Morph tool used for in ArchiCAD?',
                options: [
                    'Creating parametric objects',
                    'Free-form modeling and complex geometries',
                    'Editing text',
                    'Managing layers'
                ],
                correctAnswer: 1
            },
            {
                id: 10,
                question: 'Which view type shows a vertical cut through the building in ArchiCAD?',
                options: [
                    'Floor Plan',
                    'Elevation',
                    'Section',
                    'Interior Elevation'
                ],
                correctAnswer: 2
            }
        ]
    },
    'c5': { // Structural CAD
        title: 'Structural CAD & Detailing Assessment',
        questions: [
            {
                id: 1,
                question: 'What is the purpose of reinforcement in concrete structures?',
                options: [
                    'To add weight',
                    'To resist tensile stresses',
                    'To improve aesthetics',
                    'To reduce cost'
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                question: 'What does BBS stand for in structural detailing?',
                options: [
                    'Building Base System',
                    'Bar Bending Schedule',
                    'Beam Balance Sheet',
                    'Basic Building Standard'
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                question: 'What is the minimum concrete cover for reinforcement protection?',
                options: [
                    'It varies based on exposure conditions and structural element',
                    'Always 25mm',
                    'Always 50mm',
                    'No cover is needed'
                ],
                correctAnswer: 0
            },
            {
                id: 4,
                question: 'Which type of foundation is suitable for weak soil conditions?',
                options: [
                    'Isolated footing',
                    'Pile foundation',
                    'Strip footing',
                    'Raft foundation can also be suitable'
                ],
                correctAnswer: 1
            },
            {
                id: 5,
                question: 'What is lapping in reinforcement detailing?',
                options: [
                    'Cutting bars to length',
                    'Overlapping two bars to transfer stress',
                    'Bending bars at angles',
                    'Welding bars together'
                ],
                correctAnswer: 1
            },
            {
                id: 6,
                question: 'In a structural drawing, what does the symbol ⌀ represent?',
                options: [
                    'Concrete grade',
                    'Bar diameter',
                    'Spacing',
                    'Length'
                ],
                correctAnswer: 1
            },
            {
                id: 7,
                question: 'What is the main purpose of stirrups in a beam?',
                options: [
                    'To resist bending moments',
                    'To resist shear forces',
                    'To provide aesthetic finish',
                    'To reduce beam weight'
                ],
                correctAnswer: 1
            },
            {
                id: 8,
                question: 'Which load is considered a permanent load on a structure?',
                options: [
                    'Live load',
                    'Dead load',
                    'Wind load',
                    'Seismic load'
                ],
                correctAnswer: 1
            },
            {
                id: 9,
                question: 'What is development length in reinforcement?',
                options: [
                    'Total length of a bar',
                    'Length required to develop full strength of the bar through bond',
                    'Distance between bars',
                    'Bending radius'
                ],
                correctAnswer: 1
            },
            {
                id: 10,
                question: 'In a two-way slab, how is the reinforcement typically placed?',
                options: [
                    'Only in one direction',
                    'In both directions (perpendicular to each other)',
                    'Diagonally',
                    'Randomly'
                ],
                correctAnswer: 1
            }
        ]
    }
};

// Quiz Service
const QuizService = {
    getQuizByCourseId: (courseId) => QUIZZES[courseId] || null,
    checkAnswer: (quizId, questionId, selectedAnswer) => {
        const quiz = QUIZZES[quizId];
        if (!quiz) return false;
        const question = quiz.questions.find(q => q.id === questionId);
        return question && question.correctAnswer === selectedAnswer;
    },
    calculateScore: (quizId, answers) => {
        const quiz = QUIZZES[quizId];
        if (!quiz) return 0;
        let correct = 0;
        answers.forEach((answer, index) => {
            if (quiz.questions[index] && quiz.questions[index].correctAnswer === answer) {
                correct++;
            }
        });
        return (correct / quiz.questions.length) * 100;
    }
};
