# AssigmentProject2025ApiLLM
My assigment project for internship summer 2025
2025 - Summer - Internship Recruitment -
Home Assignment
Introduction
Treat this as a simple coding challenge for yourself, that you can address at your own pace,
with the mind space you need. This will help us understand your level of coding skills a bit
more, and get to know your thinking process about approaching the problem to solve and
general approach around organizing your own work and your code.
Good luck and have fun with it! :)
The Assignment
Task
Develop an application that uses generative AI to assist users in filling out a helpdesk form.
You can use a free version of Google’s Gemini LLM to achieve the goal. See instructions
here: https://aistudio.google.com/apikey
Users should be able to have a chat conversation with the LLM. The conversation should
happen through a dedicated UI or console - the choice is yours!
The assistant should have a brief yet meaningful context passed through a prompt and
should interrogate the user to support the form filling process. The assistant should fill the
form and store the json with following values:
Firstname: (string, max 20 characters)
Lastname: (string, max 20 characters)
Email: (string, validate format)
Reason of contact: (string, max 100 characters)
Urgency: (integer, range 1-10)
Users should be able to see the current state of form at any time.
The application should be containerized and easy to run using Docker. Provide .env file for
api key. The source code should be hosted on GitHub, along the commit history, as well as
instructions for building and running the container in a README file.
Instructions
Read these carefully before you start any coding(!):
● Timeline (Deadline)
○ 72 hours since the assignment being sent out to you (we will check the
timestamp of your email back to us with the one we sent to you)
● Acceptable stacks / frameworks / tools:
○ .Net + (C#), Java, Python, Typescript/Javascript, Kotlin, Swift
○ We will try to run it on / deploy to:
■ Docker Containers running on Windows or Mac OS X
○ No commercial/paid solutions (no trial versions either) / frameworks allowed
● What and how to submit the task to us
○ Email us the link to your public git repository
○ Add instructions for us:
■ How to pull the code / clone or fork your project repository
■ How to compile / assemble the code
■ How to run/deploy the solution
■ How to use it (if any user input required)
○ Do not send any executables(!) / any published packages(!)
○ *NOTE: do not put Freeport Metrics specific information in the repo (repo
name / project name / readme ) - so it will NOT be easy to search&find by
your competition :)
Evaluation Criteria
We will use the below set of criteria to evaluate your work - please consider them when
working on the solution of the problem stated before. Total potential points to get: 100 (each
criteria max score details below).
● Was the task completed? (points to score: 0-30)
○ The solution does what it is supposed to do - the final result is what was
expected
○ No bugs come up during our testing
● Code/project structure / modularity & readability (DRY, single responsibility, IoC,
separate applications for front-end and back-end, Design patterns usage...) (do not
put everything to one “void main()” ;) ) (points to score: 0-20)
● How efficient is the solution? (points to score: 0-10)
○ Is the algorithm efficient / inefficient
● Configuration vs. hardcoding settings balance (points to score: 0-10)
● Git history (we will review your commit history and repository usage, how did you use
branches for instance, what was your step-by-step process ;)) (and if there will be
any commits after your email sent back to us(!)) (points to score: 0-15)
● What is the quality of Instructions on how to run the solution for us - if we won’t
understand how to run / deploy your solution we will not know if it works! (points to
score: 0-15)
