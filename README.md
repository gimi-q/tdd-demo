#Setup
git clone
npm install
npm run react_test
npm start

#User-stories

1.

As a quizapp user
I want to be able to answer questions
So that I can improve my general knowledge

AC:

I am asked a question with possible answers
When I click on a possible answer I am told whether I am right or not.

2.

As a quizapp user
I want to know how many questions I have answered and how many points I have scored
So that I can quantify my progress

AC:

I am able to view stats of how many questions I’ve answered and points I’ve scored in my current session.

3.

As a quizapp user
I want to be able to select a category of questions to answer
So that I can improve my knowledge in a specific category

AC:

I am able to select a category of question to answer.

4.

TO DO:
As a quizapp administrator
I want to be able to use questions from a variety of open-source trivia services
So that I don’t have to write all the questions myself

AC:

We use the open trivia db https://opentdb.com/ to provide questions to the service.
Quizapp administrators should be notified when this site is unavaiable.

5.

As a quizapp administrator
I want to be able to add questions
So that users have questions to answer

AC:

I can add questions to the app. Questions should have a difficulty, category, question, and possible answers.

6.

As a quizapp administrator
I want to be able to edit questions
So that if I make a mistake I can fix it

AC:

I can edit questions on the app.

7.

As a quizapp administrator
I want to be able to delete questions
So that I can remove bad questions

AC:

I can remove questions on the app.

8.

As a quizapp administrator
I want to see stats on how many times a question has been answered correctly or incorrectly
So that I can see the difficulty ratings are appropriate.

AC:

I can view the following stats for every question:

How many times it has been answered correctly
How many times it has been answered incorrectly
