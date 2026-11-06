// Source: Kids Tech Holiday Academy program proposal. Fees are NOT published:
// the proposal's prices are placeholders.
export const groups = [
  { name: 'Little Tech Explorers', ages: '6–8', tone: 'bg-tint-blue',
    text: 'Computer basics, drawing, typing, puzzles and visual logic. Short supervised activities with frequent breaks.' },
  { name: 'Junior Tech Creators', ages: '9–12', tone: 'bg-tint-sun',
    text: 'Scratch coding, games, robotics, animations and junior computer packages. Instructor-led projects.' },
  { name: 'Teen Tech Innovators', ages: '13–17', tone: 'bg-navy text-ice',
    text: 'Python, websites, digital creation, networking and cyber safety. Longer projects and more independent work.' },
];

export const bootcamps = [
  { name: 'Little Computer Explorers', ages: '6–8', length: '1 week', outcome: 'A showcase of digital drawing, basic typing and computer skills' },
  { name: 'Junior Coding & Game Creation', ages: '8–12', length: '2 weeks', outcome: 'A playable Scratch game' },
  { name: 'Kids Robotics & Inventors', ages: '9–14', length: '2 weeks', outcome: 'A simple programmed sensor or robotics demonstration' },
  { name: 'Junior Computer Packages', ages: '9–14', length: '3 weeks', outcome: 'A mini portfolio with a document, spreadsheet and presentation' },
  { name: 'Teen Coding & Website', ages: '13–17', length: '3 weeks', outcome: 'A personal multi-page website' },
];

export const kidsCourses = [
  ['KID 101', 'My First Computer', [6, 8]], ['KID 102', 'Keyboard & Typing Adventures', [6, 10]],
  ['KID 103', 'Digital Drawing & Creativity', [6, 10]], ['KID 104', 'Introduction to Coding for Kids', [7, 10]],
  ['KID 105', 'Scratch Programming for Kids', [8, 12]], ['KID 106', 'Build Your First Computer Game', [9, 13]],
  ['KID 107', 'Animation & Digital Storytelling', [8, 12]], ['KID 108', 'Computer Packages for Juniors', [9, 14]],
  ['KID 109', 'Robotics for Beginners', [9, 14]], ['KID 110', 'Introduction to Electronics & Circuits', [10, 15]],
  ['KID 111', 'Website Design for Kids', [11, 15]], ['KID 112', 'Python Programming for Teens', [13, 17]],
  ['KID 113', 'Introduction to Computer Networking', [13, 17]], ['KID 114', 'Cyber Safety & Digital Citizenship', [6, 17], 'Age adapted'],
  ['KID 115', 'Introduction to AI for Young Learners', [11, 17]], ['KID 116', 'Creative Video Editing', [10, 17]],
  ['KID 117', 'Computer Hardware Exploration', [11, 17]], ['KID 118', 'Ethical Hacking Concepts & Cyber Defense', [14, 17]],
].map(([code, title, range, label]) => ({ code, title, range, label: label || `Ages ${range[0]}–${range[1]}` }));

export const ageFilters = [

  { label: 'All ages', range: null },
  { label: '6–8', range: [6, 8] },
  { label: '9–12', range: [9, 12] },
  { label: '13–17', range: [13, 17] },
];

export const parentPoints = [
  ['Supervised', 'Every session is led and supervised by an instructor, with breaks built in.'],
  ['Parents register', 'Details are collected from a parent or guardian, never directly from a young child.'],
  ['Safe pick-up', 'Attendance registers and a verified drop-off and collection process.'],
  ['Controlled labs', 'Security and hardware demonstrations run only in supervised, authorised environments.'],
];

export const kidsFaqs = [
  ['Who can join?', 'Children and teens aged 6–17, grouped as Little Tech Explorers (6–8), Junior Tech Creators (9–12) and Teen Tech Innovators (13–17). Placement may also consider ability, experience and what parents tell us.'],
  ['When are the camps?', 'Camps are planned for the April, August and December school holidays, as 1–3 week programmes. Exact dates and venues are published once confirmed. Joining the waitlist means you hear first.'],
  ['Who registers my child?', 'A parent or legal guardian. We ask for parent contact details, the child’s age and permission for participation. We do not collect details directly from young children.'],
  ['How are children kept safe?', 'Camps run with supervised sessions, attendance registers and a verified drop-off and collection process. Before registration opens we will publish a written safeguarding policy and a named safeguarding contact.'],
  ['Do children get a certificate?', 'Learners receive a NgaziHub certificate of completion. It is not an accredited qualification.'],
  ['How much does it cost?', 'Fees are confirmed together with each camp’s dates, before registration opens.'],
];