export interface Todo {
    id: string;
    text: string;
    uid: string;
    completed: boolean;
    priority : number;
    comments: string[];
    createDatetime: Date;
}

export interface TodoState {
    todos: Todo[];
}

export interface AddTodo {
    text: string;
    uid: string;
    completed: boolean;
    priority : number;
    createDatetime: Date;
    comments: string[];
}