// Source: Computer & IT Academy proposed course catalog (planning edition).
// Codes are internal planning identifiers, not external accreditation.
export const departments = [
  {
    id: 'cmp', name: 'Computer Packages & Digital Literacy', range: 'CMP 101–112', mode: 'Online / Physical',
    blurb: 'For school leavers, office workers, job seekers and first-time computer users.',
    courses: [
      ['CMP 101', 'Introduction to Computers'], ['CMP 102', 'Computer Packages — Complete'],
      ['CMP 103', 'Microsoft Word'], ['CMP 104', 'Microsoft Excel'], ['CMP 105', 'Microsoft PowerPoint'],
      ['CMP 106', 'Microsoft Access'], ['CMP 107', 'Microsoft Publisher'], ['CMP 108', 'Internet and Email Skills'],
      ['CMP 109', 'Typing and Keyboard Skills'], ['CMP 110', 'Digital Literacy and Online Safety'],
      ['CMP 111', 'Google Workspace Essentials'], ['CMP 112', 'Advanced Microsoft Excel'],
    ],
  },
  {
    id: 'prg', name: 'Programming & Software Development', range: 'PRG 101–112', mode: 'Online / Hybrid',
    blurb: 'Programming logic, coding fundamentals and the tools used to build software.',
    courses: [
      ['PRG 101', 'Introduction to Programming'], ['PRG 102', 'Programming Logic and Algorithms'],
      ['PRG 103', 'Python Programming for Beginners'], ['PRG 104', 'Introduction to C Programming'],
      ['PRG 105', 'C++ Programming Fundamentals'], ['PRG 106', 'Java Programming Fundamentals'],
      ['PRG 107', 'HTML and CSS'], ['PRG 108', 'JavaScript Fundamentals'],
      ['PRG 109', 'Introduction to Databases and SQL'], ['PRG 110', 'Introduction to Web Development'],
      ['PRG 111', 'Object-Oriented Programming'], ['PRG 112', 'Git and GitHub Basics'],
    ],
  },
  {
    id: 'net', name: 'Computer Networking', range: 'NET 101–112', mode: 'Hybrid / Physical',
    blurb: 'Network setup, infrastructure, IP addressing and troubleshooting.',
    courses: [
      ['NET 101', 'Introduction to Computer Networking'], ['NET 102', 'Networking Fundamentals'],
      ['NET 103', 'LAN and WAN Technologies'], ['NET 104', 'IP Addressing and Subnetting'],
      ['NET 105', 'Network Cabling and Installation'], ['NET 106', 'Router and Switch Configuration'],
      ['NET 107', 'Wireless Network Setup'], ['NET 108', 'Network Troubleshooting'],
      ['NET 109', 'Introduction to Cisco Networking'], ['NET 110', 'Introduction to MikroTik'],
      ['NET 111', 'Network Security Fundamentals'], ['NET 112', 'Introduction to Server Administration'],
    ],
  },
  {
    id: 'hwt', name: 'Hardware, Maintenance & IT Support', range: 'HWT 101–110', mode: 'Physical / Hybrid',
    blurb: 'Hands-on training in maintaining, diagnosing and repairing computer systems.',
    courses: [
      ['HWT 101', 'Introduction to Computer Hardware'], ['HWT 102', 'Computer Assembly and Disassembly'],
      ['HWT 103', 'Computer Repair and Maintenance'], ['HWT 104', 'Operating System Installation'],
      ['HWT 105', 'Windows Installation and Configuration'], ['HWT 106', 'Software Installation and Troubleshooting'],
      ['HWT 107', 'Laptop Maintenance and Repair'], ['HWT 108', 'Printer Installation and Maintenance'],
      ['HWT 109', 'Introduction to IT Support'], ['HWT 110', 'Computer Troubleshooting and Diagnostics'],
    ],
  },
  {
    id: 'sec', name: 'Cybersecurity & Operating Systems', range: 'SEC 101–110', mode: 'Online / Hybrid',
    blurb: 'Everyday digital security, operating systems and safe foundational system administration.',
    courses: [
      ['SEC 101', 'Introduction to Cybersecurity'], ['SEC 102', 'Computer and Internet Security'],
      ['SEC 103', 'Windows Operating System Fundamentals'], ['SEC 104', 'Introduction to Linux'],
      ['SEC 105', 'Linux Command Line Basics'], ['SEC 106', 'User Accounts and Access Management'],
      ['SEC 107', 'Network Security Basics'], ['SEC 108', 'Data Backup and Recovery'],
      ['SEC 109', 'Introduction to Cloud Computing'], ['SEC 110', 'Ethical Hacking Fundamentals (Authorized Labs)'],
    ],
  },
  {
    id: 'web', name: 'Web Development & Databases', range: 'WEB 101–110', mode: 'Online / Hybrid',
    blurb: 'Building websites and working with basic databases, with graded practical projects.',
    courses: [
      ['WEB 101', 'Introduction to Website Design'], ['WEB 102', 'HTML and CSS for Beginners'],
      ['WEB 103', 'WordPress Website Development'], ['WEB 104', 'Responsive Web Design'],
      ['WEB 105', 'Introduction to JavaScript'], ['WEB 106', 'Website Hosting and Domain Management'],
      ['WEB 107', 'Introduction to Database Management'], ['WEB 108', 'MySQL Database Fundamentals'],
      ['WEB 109', 'PHP and MySQL Basics'], ['WEB 110', 'Building a Complete Website'],
    ],
  },
];

export const allCourses = departments.flatMap((d) =>
  d.courses.map(([code, title]) => ({ code, title, dept: d.id, deptName: d.name, mode: d.mode }))
);

// Planning estimates only. Final hours and assessment still to be set per course.
export const firstCourses = [
  { code: 'CMP 101', title: 'Introduction to Computers', weeks: 2, mode: 'Online / Physical' },
  { code: 'CMP 102', title: 'Computer Packages — Complete', weeks: 8, mode: 'Online / Physical' },
  { code: 'PRG 101', title: 'Introduction to Programming', weeks: 4, mode: 'Online / Physical' },
  { code: 'PRG 103', title: 'Python Programming for Beginners', weeks: 6, mode: 'Online / Hybrid' },
  { code: 'WEB 102', title: 'Website Design with HTML & CSS', weeks: 6, mode: 'Online / Hybrid' },
  { code: 'NET 102', title: 'Computer Networking Fundamentals', weeks: 6, mode: 'Hybrid' },
  { code: 'HWT 103', title: 'Computer Repair and Maintenance', weeks: 6, mode: 'Physical' },
  { code: 'SEC 101', title: 'Introduction to Cybersecurity', weeks: 4, mode: 'Online' },
];

export const formats = [
  { name: 'Online', text: 'Self-paced video lessons, resources, quizzes and progress tracking.' },
  { name: 'Physical', text: 'Instructor-led classes, computer-lab exercises and practical assessments.' },
  { name: 'Hybrid', text: 'Recorded theory lessons with in-person workshops and demonstrations.' },
];