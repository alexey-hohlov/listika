export interface ITask {
  title: string;
  notes: string;
  id: string;
}

export interface IList {
  title: string;
  id: string;
  tasks: ITask[];
  icon: string;
}

export interface ILists {
  [key: string]: IList;
}
