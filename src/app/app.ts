import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule]
})
export class App implements OnDestroy {

  title = 'Angular Quiz App';
  quizStarted = false;
  quizFinished = false;
  currentIndex = 0;
  selectedAnswer = '';
  score = 0;
  isAnswered = false;

  // Timer
  timeLeft = 15;
  timerInterval: any = null;
  readonly TIMER_START = 15;

  questions = [
    {
      questionText: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
      correctAnswer: 'Hyper Text Markup Language'
    },
    {
      questionText: 'Which language is used for styling web pages?',
      options: ['JavaScript', 'Python', 'CSS', 'Java'],
      correctAnswer: 'CSS'
    },
    {
      questionText: 'What does CSS stand for?',
      options: ['Colorful Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets'],
      correctAnswer: 'Cascading Style Sheets'
    },
    {
      questionText: 'Which company developed Angular?',
      options: ['Facebook', 'Microsoft', 'Google', 'Apple'],
      correctAnswer: 'Google'
    }
  ];

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  // Timer percentage for progress ring
  get timerPercent(): number {
    return (this.timeLeft / this.TIMER_START) * 100;
  }

  // Start quiz
  startQuiz() {
    this.quizStarted = true;
    this.startTimer();
  }

  // Start timer
  startTimer() {
    this.timeLeft = this.TIMER_START;
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.clearTimer();
        this.isAnswered = true;
        this.selectedAnswer = '';
      }
    }, 1000);
  }

  // Clear timer
  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Select answer
  selectAnswer(option: string) {
    if (this.isAnswered) return;
    this.selectedAnswer = option;
    this.isAnswered = true;
    this.clearTimer();
  }

  // Check if correct
  isCorrect(option: string): boolean {
    return option === this.currentQuestion.correctAnswer;
  }

  // Next question
  nextQuestion() {
    if (this.selectedAnswer === this.currentQuestion.correctAnswer) {
      this.score++;
    }
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.selectedAnswer = '';
      this.isAnswered = false;
      this.startTimer();
    } else {
      this.quizFinished = true;
      this.clearTimer();
    }
  }

  // Restart
  restartQuiz() {
    this.currentIndex = 0;
    this.selectedAnswer = '';
    this.score = 0;
    this.quizFinished = false;
    this.quizStarted = false;
    this.isAnswered = false;
    this.clearTimer();
    this.timeLeft = this.TIMER_START;
  }

  // Cleanup when component is destroyed
  ngOnDestroy() {
    this.clearTimer();
  }
}