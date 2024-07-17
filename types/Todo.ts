export interface Todo {
    id: string;
    text: string;
    uid: string;
    completed: boolean;
    priority : number;
    comments: string[];
    createDatetime: Date;
    deadline: Date | null;
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
    deadline: Date | null;
}