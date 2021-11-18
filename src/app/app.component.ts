import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  operations = {
    'addition': function (a, b) { return a + b },
    'subtraction': function (a, b) { return a - b },
    'multiplication': function (a, b) { return a * b },
    'division': function (a, b) { return a / b },
    'remainder': function (a, b) { return a % b },
  };

  constructor(private http: HttpClient) {
    this.getOperation();
  }

  getOperation(): void {
    this.http.get('https://interview.adpeai.com/api/v1/get-task').subscribe(taskData => {
      this.submitTask(taskData)
    });
  }

  submitTask(taskData): void {
    let params = {
      id: taskData.id,
      result: this.operations[taskData.operation](taskData.left, taskData.right)
    };
    this.http.post('https://interview.adpeai.com/api/v1/submit-task', params,
    {responseType: 'text'}).subscribe((data:any) => {
      if(data === 'Correct') {
        alert('success');
      }
    }, error => {
      // handle error
      if (error.status === 400) {
        alert(error.error);
      } else if (error.status === 500) {
        alert('error: 500'+ error.error);
      }
    });
  }
}
