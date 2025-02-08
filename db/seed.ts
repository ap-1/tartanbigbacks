import { createCourse } from "@/db/methods";

const ADMIN = "5OsqZHvtjSEABgGxcCPKerX9iUJvf7a4";
const ADMIN2 = "hJZyBR3zAdb4s6uJvzvrWmQBNQUDNZED";

async function main() {
    await createCourse(
        {
            id: "15-122",
            name: "Principles of Imperative Computation",
            description:
                "For students with a basic understanding of programming (variables, expressions, loops, arrays, functions). Teaches imperative programming and methods for ensuring the correctness of programs. Students will learn the process and concepts needed to go from high-level descriptions of algorithms to correct imperative implementations, with specific application to basic data structures and algorithms. Much of the course will be conducted in a subset of C amenable to verification, with a transition to full C near the end. This course prepares students for 15-213 and 15-210. NOTE: students must achieve a C or better in order to use this course to satisfy the pre-requisite for any subsequent Computer Science course.",
            color: "bg-blue-500",
            filesEnabled: false,
            forumEnabled: false,
            assignmentsEnabled: false,
            peopleEnabled: false,
            scheduleEnabled: false,
            archived: true,
        },
        ADMIN
    );

    await createCourse(
        {
            id: "15-150",
            name: "Principles of Functional Programming",
            description: `An introduction to programming based on a "functional" model of computation. The functional model is a natural generalization of algebra in which programs are formulas that describe the output of a computation in terms of its inputs---that is, as a function. But instead of being confined to real- or complex-valued functions, the functional model extends the algebraic view to a very rich class of data types, including not only aggregates built up from other types, but also functions themselves as values. This course is an introduction to programming that is focused on the central concepts of function and type. One major theme is the interplay between inductive types, which are built up incrementally; recursive functions, which compute over inductive types by decomposition; and proof by structural induction, which is used to prove the correctness and time complexity of a recursive function. Another major theme is the role of types in structuring large programs into separate modules, and the integration of imperative programming through the introduction of data types whose values may be altered during computation. NOTE: students must achieve a C or better in order to use this course to satisfy the pre-requisite for any subsequent Computer Science course. David Khan will be teaching this course, Summer 22. Please direct any questions about this waitlist to Amy Weis at alweis@andrew.cmu.edu.`,
            color: "bg-green-500",
            filesEnabled: true,
            forumEnabled: true,
            assignmentsEnabled: true,
            peopleEnabled: true,
            scheduleEnabled: true,
            archived: false,
        },
        ADMIN
    );

    await createCourse(
        {
            id: "15-210",
            name: "Parallel and Sequential Data Structures and Algorithms",
            description:
                "Teaches students about how to design, analyze, and program algorithms and data structures. The course emphasizes parallel algorithms and analysis, and how sequential algorithms can be considered a special case. The course goes into more theoretical content on algorithm analysis than 15-122 and 15-150 while still including a significant programming component and covering a variety of practical applications such as problems in data analysis, graphics, text processing, and the computational sciences. NOTE: students must achieve a C or better in order to use this course to satisfy the pre-requisite for any subsequent Computer Science course.",
            color: "bg-indigo-500",
            filesEnabled: false,
            forumEnabled: false,
            assignmentsEnabled: false,
            peopleEnabled: false,
            scheduleEnabled: false,
            archived: true,
        },
        ADMIN
    );

    createCourse(
        {
            id: "15-213",
            name: "Introduction to Computer Systems",
            description:
                "This course provides a programmer's view of how computer systems execute programs, store information, and communicate. It enables students to become more effective programmers, especially in dealing with issues of performance, portability and robustness. It also serves as a foundation for courses on compilers, networks, operating systems, and computer architecture, where a deeper understanding of systems-level issues is required. Topics covered include: machine-level code and its generation by optimizing compilers, performance evaluation and optimization, computer arithmetic, memory organization and management, networking technology and protocols, and supporting concurrent computation. NOTE FOR GRADUATE STUDENTS: This course is not open to graduate students beginning Spring 2015. Graduate students must register for 15-513 instead.",
            color: "bg-yellow-500",
            filesEnabled: false,
            forumEnabled: false,
            assignmentsEnabled: false,
            peopleEnabled: false,
            scheduleEnabled: false,
            archived: true,
        },
        ADMIN2
    );

    createCourse(
        {
            id: "15-251",
            name: "Great Theoretical Ideas in Computer Science",
            description:
                "This course is about how to use theoretical ideas to formulate and solve problems in computer science. It integrates mathematical material with general problem solving techniques and computer science applications. Examples are drawn from algorithms, complexity theory, game theory, probability theory, graph theory, automata theory, algebra, cryptography, and combinatorics. Assignments involve both mathematical proofs and programming. NOTE: students must achieve a C or better in order to use this course to satisfy the pre-requisite for any subsequent Computer Science course.",
            color: "bg-red-500",
            filesEnabled: true,
            forumEnabled: true,
            assignmentsEnabled: true,
            peopleEnabled: true,
            scheduleEnabled: true,
            archived: false,
        },
        ADMIN2
    );

    createCourse(
        {
            id: "15-451",
            name: "Algorithm Design and Analysis",
            description:
                "This course is about the design and analysis of algorithms. We study specific algorithms for a variety of problems, as well as general design and analysis techniques. Specific topics include searching, sorting, algorithms for graph problems, efficient data structures, lower bounds and NP-completeness. A variety of other topics may be covered at the discretion of the instructor. These include parallel algorithms, randomized algorithms, geometric algorithms, low level techniques for efficient programming, cryptography, and cryptographic protocols.",
            color: "bg-purple-500",
            filesEnabled: false,
            forumEnabled: false,
            assignmentsEnabled: false,
            peopleEnabled: false,
            scheduleEnabled: false,
            archived: true,
        },
        ADMIN2
    );
}

main();
