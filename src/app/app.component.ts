import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MathQuiz';
  // Quiz A
  counter1 =3;
  formQuiz1: FormGroup;
  playQuiz1: FormGroup;
  startQuizA !:boolean;
  numOfQuizsA !: number;
  maxOperandValueA !: number;
  selectedOperatorsA !: any;
  operatorQA !: any;
  operand1QA!:any;
  operand2QA!:any;
  operatorSign !: any;
  quizQuestionsQA : any =[];
  scoreboard1 =0;
  scorBoard1 !:boolean;
  timer1Flag !:boolean;

  // Quiz B
  counter2 =3;
  startQuizB !:boolean;
  formQuiz2: FormGroup;
  playQuiz2: FormGroup;
  numOfQuizsB !: number;
  maxOperandValueB !: number;
  selectedOperatorsB !: any;
  operatorQB !: any;
  operand1QB!:any;
  operand2QB!:any;
  operatorSignB !: any;
  quizQuestionsQB : any =[];
  scorBoard2 !: boolean;
  scoreboard2 = 0;
  timer2Flag !:boolean;

  operatorArray = ['+', '-', '*', '/'];
  totalscoreboard =0;
  showScorBoard:boolean =false;
  operatorData: Array<any> = [
    { name: 'Add', value: '+' },
    { name: 'Sub', value: '-' },
    { name: 'Mul', value: '*' },
    { name: 'Div', value: '/' }
    
  ];

  constructor(private fb: FormBuilder) {
    this.playQuiz1 = this.fb.group({
      operand1QA : [''],
      operatorQA : [''],
      operand2QA: [''],
      userEntered:['']
    });
    this.formQuiz2 = this.fb.group({
      enteredoperandValueQB : ['',[Validators.max(15),Validators.min(0)]],
      enteredNumQuizB : ['',Validators.min(1)],
      checkArray: this.fb.array([])
    });

    this.playQuiz2 = this.fb.group({
      operand1QB : [''],
      operatorQB : [''],
      operand2QB: [''],
      userEntered:['']
    });
    this.formQuiz1 = this.fb.group({
      enteredoperandValueQA : ['',[Validators.max(15),Validators.min(0)]],
      enteredNumQuizA : ['',Validators.min(1)],
      checkArray: this.fb.array([])
    });

    this.startQuizA = false;
    this.startQuizB = false;
  }
  selectedOperator: any;
  onCheckboxChange(e : any) {
    const checkArray: FormArray = this.formQuiz1.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onCheckboxChangeB(e : any) {
    const checkArray: FormArray = this.formQuiz2.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

 startQuiz1(){
  console.log(this.formQuiz1);
  this.timer1Flag = true;
  
  this.maxOperandValueA = this.formQuiz1.controls.enteredoperandValueQA.value ? this.formQuiz1.controls.enteredoperandValueQA.value : 9;
  this.numOfQuizsA = this.formQuiz1.controls.enteredNumQuizA.value ? this.formQuiz1.controls.enteredNumQuizA.value : 20;
  this.selectedOperatorsA = this.formQuiz1.controls.checkArray.value.length == 0 ? (this.operatorData.map((operator)=> operator.value)):this.formQuiz1.controls.checkArray.value;
  
  console.log("this.maxOperandValueA", this.maxOperandValueA);
  console.log("this.numOfQuizsA", this.numOfQuizsA);
  console.log("this.selectedOperatorsA", this.selectedOperatorsA);

  let intervalcounter = setInterval( ()=> {
    if (this.counter1 == 0) {
      this.startQuizA = true;
      clearInterval(intervalcounter);
        this.changeQuiz();
        this.numOfQuizsA--;
        this.letsPlayQuiz();
        document.getElementById('timer1')?.classList.add('demodisplay');
        return;
    }
    
    this.counter1--;
}, 1000);
  

 }

 startQuiz2(){
  console.log(this.formQuiz2);
  this.timer2Flag = true;
  this.maxOperandValueB = this.formQuiz2.controls.enteredoperandValueQB.value ? this.formQuiz2.controls.enteredoperandValueQB.value : 9;
  this.numOfQuizsB = this.formQuiz2.controls.enteredNumQuizB.value ? this.formQuiz2.controls.enteredNumQuizB.value : 20;
  this.selectedOperatorsB = this.formQuiz2.controls.checkArray.value.length == 0 ? (this.operatorData.map((operator)=> operator.value)):this.formQuiz2.controls.checkArray.value;
  
  console.log("this.maxOperandValueA", this.maxOperandValueB);
  console.log("this.numOfQuizsA", this.numOfQuizsB);
  console.log("this.selectedOperatorsA", this.selectedOperatorsB);
  let intervalcounter = setInterval( ()=> {
    if (this.counter2 == 0) {
      this.startQuizB = true;
      clearInterval(intervalcounter);
        this.changeQuizB();
        this.numOfQuizsB--;
        this.letsPlayQuizB();
        document.getElementById('timer2')?.classList.add('demodisplay');
        return;
    }
    
    this.counter2--;
}, 1000);
 }

  letsPlayQuiz() {
    
  let intervalQuiz = setInterval( () => {
      this.checkAns();
      if (this.numOfQuizsA == 0) {
          clearInterval(intervalQuiz);
          this.showScoreBoard();
          this.startQuizA = false;
          return;
      }
      this.changeQuiz();
      this.numOfQuizsA--;
  }, 3000);
}

letsPlayQuizB(){
  let intervalQuiz = setInterval( () => {
    this.checkAnsB();
    if (this.numOfQuizsB == 0) {
        clearInterval(intervalQuiz);
        this.showScoreBoard();
        this.startQuizB = false;
        return;
    }
    this.changeQuizB();
    this.numOfQuizsB--;
}, 3000);
}

 changeQuiz() {

      this.operand1QA = Math.floor(Math.random() * this.maxOperandValueA + 1);
      this.operand2QA = Math.floor(Math.random() * this.maxOperandValueA + 1);
      this.operatorSign = Math.floor(Math.random() * this.selectedOperatorsA.length);
      console.log(this.playQuiz1.value);
      this.playQuiz1.setValue({operand1QA: this.operand1QA, operatorQA:this.selectedOperatorsA[this.operatorSign],operand2QA: this.operand2QA, userEntered :''})
 
}

changeQuizB() {

  this.operand1QB = Math.floor(Math.random() * this.maxOperandValueB + 1);
  this.operand2QB = Math.floor(Math.random() * this.maxOperandValueB + 1);
  this.operatorSignB = Math.floor(Math.random() * this.selectedOperatorsB.length);
  console.log(this.playQuiz2.value);
  this.playQuiz2.setValue({operand1QB: this.operand1QB, operatorQB:this.selectedOperatorsB[this.operatorSignB],operand2QB: this.operand2QB, userEntered :''})

}

checkAns() {
  let n1 = this.playQuiz1.controls.operand1QA.value;
  let n2 = this.playQuiz1.controls.operand2QA.value;
  let operator = this.playQuiz1.controls.operatorQA.value;

  if (n1 !== null && n2 !== null && n1 !== '' && n2 !== '') {
      let userAns = this.playQuiz1.controls.userEntered.value;
      let combinedString = n1 + operator + n2;
      let evaluatedAns = Math.floor(eval(combinedString));
      console.log("userAns", userAns)
      console.log("combinedString", combinedString);
      console.log("evaluatedAns", evaluatedAns);
      
      if (userAns && (userAns == evaluatedAns)) {
          this.scoreboard1++;
          this.totalscoreboard = this.scoreboard2 + this.scoreboard1;
          // document.getElementById("header").innerHTML = " Final Score :" + totalscoreboard;
      }
      let obj = {
          ques: combinedString,
          correctAns: evaluatedAns,
          color: ((userAns ? userAns : undefined) == evaluatedAns) ? 'green' : 'red'
      }
      this.quizQuestionsQA.push(obj);
      console.log(this.quizQuestionsQA);

  }
}

checkAnsB() {
  let n1 = this.playQuiz2.controls.operand1QB.value;
  let n2 = this.playQuiz2.controls.operand2QB.value;
  let operator = this.playQuiz2.controls.operatorQB.value;

  if (n1 !== null && n2 !== null && n1 !== '' && n2 !== '') {
      let userAns = this.playQuiz2.controls.userEntered.value;
      let combinedString = n1 + operator + n2;
      let evaluatedAns = Math.floor(eval(combinedString));
      console.log("userAns", userAns)
      console.log("combinedString", combinedString);
      console.log("evaluatedAns", evaluatedAns);
      
      if (userAns && (userAns == evaluatedAns)) {
          this.scoreboard2++;
          this.totalscoreboard = this.scoreboard2 + this.scoreboard1;
          // document.getElementById("header").innerHTML = " Final Score :" + totalscoreboard;
      }
      let obj = {
          ques: combinedString,
          correctAns: evaluatedAns,
          color: ((userAns ? userAns : undefined) == evaluatedAns) ? 'green' : 'red'
      }
      this.quizQuestionsQB.push(obj);
      console.log(this.quizQuestionsQA);

  }
}


nextClicked() {
  if (this.numOfQuizsA !== 0) {
  
    this.checkAns();
    this.changeQuiz();
    this.numOfQuizsA--;
  }
}

nextClickedB(){
  if (this.numOfQuizsB !== 0) {
  
    this.checkAnsB();
    this.changeQuizB();
    this.numOfQuizsB--;
  }
}

showScoreBoard() {
  this.showScorBoard = true;
  if(this.startQuizA){
    document.getElementById('box1')?.classList.add('demodisplay')
    this.scorBoard1 = true;
  }else if(this.startQuizB){
    document.getElementById('box2')?.classList.add('demodisplay')
    this.scorBoard2 = true;
  }


}


}
