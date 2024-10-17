import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AnswerQuestionComponent} from "./answer-question/answer-question.component";

export const routes: Routes = [
  {path: 'answerQuestion', component: AnswerQuestionComponent},
  {path: '', redirectTo: 'answerQuestion', pathMatch: 'full'}
];
