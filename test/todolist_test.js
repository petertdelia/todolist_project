const Todo = require('../lib/todo');
const TodoList = require('../lib/todoList');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('array contains todos', () => {
    expect(list.toArray()).toEqual(list.todos);
  });

  test('calling first returns the first todo', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift() removes and returns the first todo', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list).not.toContain(todo1);
  });

  test('pop() removes and returns the last todo', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list).not.toContain(todo3);
  });

  test('isDone() returns true if all items on the list are done, false otherwise', () => {
    expect(list.isDone()).not.toBeTruthy();
  });

  test('add() raises a TypeError if we attempt to add a value that is not a Todo object', () => {
    expect(() => list.add(true)).toThrow(TypeError);
    expect(() => list.add(new TodoList())).toThrow(TypeError);
  });

  test('itemAt() returns the todo at a given index, throws ReferenceError if index is invalid', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => list.itemAt(23)).toThrow(ReferenceError);
  });

  test('markDoneAt() marks a todo at an index as done, throws ReferenceError if index is invalid', () => {
    list.markDoneAt(1);
    expect(todo1.isDone()).toEqual(false);
    expect(todo2.isDone()).toEqual(true);
    expect(todo3.isDone()).toEqual(false);
    expect(() => list.markDoneAt(23)).toThrow(ReferenceError);
  });


  test('markUndoneAt() marks a todo at an index as undone, throws ReferenceError if index is invalid', () => {
    todo1.markDone();
    todo2.markDone();
    list.markUndoneAt(1);
    expect(todo1.isDone()).toEqual(true);
    expect(todo2.isDone()).toEqual(false);
    expect(() => list.markUndoneAt(23)).toThrow(ReferenceError);
  });

  test('markAllDone() marks all todos done', () => {
    list.markAllDone(); 
    expect(todo1.isDone()).toEqual(true);
    expect(todo2.isDone()).toEqual(true);
    expect(todo3.isDone()).toEqual(true);
  });

  test('removeAt() removes and returns the todo at the index, throws ReferenceError if index is invalid', () => {
    let todo = list.removeAt(2);
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
    expect(() => list.removeAt(23)).toThrow(ReferenceError);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to the gym`;
    expect(list.toString()).toBe(string);
    todo1.markDone();
    string = `---- Today's Todos ----\n[X] Buy milk\n[ ] Clean room\n[ ] Go to the gym`;
    expect(list.toString()).toBe(string);
    list.markAllDone();
    string = `---- Today's Todos ----\n[X] Buy milk\n[X] Clean room\n[X] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over the elements in the list', () => {
    let str = '';
    list.forEach(todo => str += '1');
    expect(str.length).toBe(3);
  });

  test('filter selects todos based on the truthiness of the callback return value. ' +
    'It returns a new TodoList object', () => {
      todo1.markDone();
      let filteredList = list.filter(todo => todo.isDone());
      expect(filteredList.size()).toBe(1);
    });

  test('findByTitle returns the todo object whose title matches the argument', () => {
    let todo = list.findByTitle('Buy milk');
    expect(todo).toBe(todo1);
  });

  test('allDone returns a filtered list of todos that are done', () => {
    todo1.markDone();
    let doneTodos = list.allDone();
    expect(doneTodos.toArray()).toEqual([todo1]);
  });

  test('allNotDone returns a filtered list of todos that are done', () => {
    todo1.markDone();
    let doneTodos = list.allNotDone();
    expect(doneTodos.toArray()).toEqual([todo2, todo3]);
  });

  test('markDone finds by title and marks done', () => {
    list.markDone('Buy milk');
    expect(todo1.isDone()).toBeTruthy();
  });

  test('markAllUndone marks all todos undone', () => {
    list.markAllUndone();
    expect(list.allDone()).toBeTruthy();
  });
})
