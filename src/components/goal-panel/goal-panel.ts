import { Component, Input } from '@angular/core';
import { Goal } from '../../../srcDB/model/dataModels';

@Component({
  selector: 'app-goal-panel',
  imports: [],
  templateUrl: './goal-panel.html',
  styleUrl: './goal-panel.scss',
})
export class GoalPanel {
  @Input() goals: Goal[] = [];
}
