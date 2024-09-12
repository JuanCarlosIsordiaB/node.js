import { CreateTodoDto } from "./create-todo.dto";

export class UpdateTodoDto {
  private constructor(public readonly id?: number,public readonly text?: string, public readonly completedAt?: Date) {}

  get values(){
    const returnObj : {[key: string]: any} = {};

    if(this.text) returnObj.text = this.text;
    if(this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }
    
  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const {id,  text, completedAt } = props;
    let newCompletedAt = new Date(completedAt);

    if(!id || isNaN(id)) return ['Id property is required and must be a number'];

    if(completedAt){
        newCompletedAt = new Date(completedAt);
        
        if( newCompletedAt.toString() === 'Invalid Date') return ['Invalid date format'];
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}
