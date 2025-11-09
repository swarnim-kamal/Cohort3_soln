class Calculator{

    constructor(){
        this.result=0
    }
    add(a){
        this.result += a
    }

    subtract(a){
        this.result -= a
    }

    multiply(a){
        this.result *= a
    }

    divide(a){
        if(a==0){
            throw new Error("Cannot divide by zero")
        }
        this.result /= a
    }

    getResult(){
        return this.result
    }

    convert_str_to_array(str){
        let regex = /\d+|[()+\-*/]/g
        let tokens = str.match(regex).map(token =>{
            return /\d+/.test(token) ? parseFloat(token) : token;
        });
        return tokens
    }
    replaceAt = (arr, i , val) =>{
        arr.splice(i-1,3,val);
        return arr
    }
    calulate(str){ 
        str = str.replace('/\s+/g','')
        let arr = this.convert_str_to_array(str);

        

        while(arr.includes('(')){
            let closeIndex = arr.indexOf(')');
            let openIndex = arr.lastIndexOf('(',closeIndex);
            let innerExpr = arr.slice(openIndex+1,closeIndex).join('');
            let result = this.calulate(innerExpr);
            arr.splice(openIndex,closeIndex-openIndex+1,result.toString());
        }
        
        // division
        while(arr.indexOf('/')!=-1){
            let ind = arr.indexOf('/');
            let a = arr[ind-1];
            let b = arr[ind+1];
            let c = (a/b);
            if(b==0) {
                throw new Error("Cannot divide by zero")
            }
            this.replaceAt(arr,ind,c);    
        }

        // multiplication
        while(arr.indexOf('*')!=-1){
            let ind = arr.indexOf('*');
            let a = arr[ind-1];
            let b = arr[ind+1];
            let c = (a*b);
            this.replaceAt(arr,ind,c);    
        }

        // addition
        while(arr.indexOf('+')!=-1){
            let ind = arr.indexOf('+');
            let a = arr[ind-1];
            let b = arr[ind+1];
            let c = (a+b);
            this.replaceAt(arr,ind,c);    
        }

        // subtraction
        while(arr.indexOf('-')!=-1){
            let ind = arr.indexOf('-');
            let a = arr[ind-1];
            let b = arr[ind+1];
            let c = (a-b);
            this.replaceAt(arr,ind,c);    
        }
        

        
        return parseFloat(arr.join(''))
    }
}

class Todo{
    todo_list = []
    add(todo){
        this.todo_list.push(todo)
    }

    remove(indexOftodo){
        this.todo_list.splice(indexOftodo,1)
    }

    update(indexOftodo,newTodo){
        this.todo_list[indexOftodo] = newTodo
    }

    getAll(){
        return this.todo_list
    }

    get(indexOftodo){
        return this.todo_list[indexOftodo]
    }

    clear(){
        this.todo_list = []
    }
}


const Calculat = new Calculator();

describe('Calculator', () => {
	let calc;

	beforeEach(() => {
		calc = new Calculator();
	});

	afterEach(() => {
		calc.clear();
	});

	test('addition', () => {
		calc.add(5);
		expect(calc.getResult()).toBe(5);

		calc.add(3);
		expect(calc.getResult()).toBe(8);
	});

	test('subtraction', () => {
		calc.subtract(5);
		expect(calc.getResult()).toBe(-5);

		calc.subtract(3);
		expect(calc.getResult()).toBe(-8);
	});

	test('multiplication', () => {
		calc.add(4);
		calc.multiply(3);
		expect(calc.getResult()).toBe(12);

		calc.multiply(0);
		expect(calc.getResult()).toBe(0);
	});

	test('division', () => {
		calc.add(12);

		calc.divide(4);
		expect(calc.getResult()).toBe(3);

		expect(() => calc.divide(0)).toThrow(Error);
		expect(calc.getResult()).toBe(3);
	});

	test('clear', () => {
		calc.add(5);
		calc.clear();
		expect(calc.getResult()).toBe(0);
	});

	test('calculate addition and multiplication', () => {
		calc.calculate('2 + 3 * 4');
		expect(calc.getResult()).toBe(14);
	});

	test('calculate division in expression', () => {
		calc.calculate('(   15 + 3) /   6   ');
		expect(calc.getResult()).toBe(3);
	});

	test('calculate subtraction in expression', () => {
		calc.calculate('10 - (4 + 2)');
		expect(calc.getResult()).toBe(4);
	});

	test('calculate complex expression', () => {
		calc.calculate('(2 + 3) * (6 - (4 + 1) / 2) + 7');
		expect(calc.getResult()).toBe(24.5);
	});
	test('calculate complex expression with spaces', () => {
		calc.calculate(
			'10 +   2 *    (   6 - (4 + 1) / 2) + 7'
		);
		expect(calc.getResult()).toBe(24);
	});

	test('calculate expression with decimals', () => {
		calc.calculate('(2.5 + 1.5) * 3');
		expect(calc.getResult()).toBe(12);
	});

	test('calculate expression with invalid characters', () => {
		expect(() => calc.calculate('5 + abc')).toThrow(Error);
		expect(() =>
			calc.calculate('10 * (2 + 3) + xyz')
		).toThrow(Error);
	});

	test('calculate division by zero', () => {
		expect(() => calc.calculate('10 / 0')).toThrow(Error);
	});

	test('multiplication with negative numbers', () => {
		calc.add(-5);
		calc.multiply(-3);
		expect(calc.getResult()).toBe(15);

		calc.multiply(0);
		expect(calc.getResult()).toBe(0);
	});

	test('division with decimal numbers', () => {
		calc.add(10);
		calc.divide(3);
		expect(calc.getResult()).toBeCloseTo(3.333333, 2);

		calc.divide(2);
		expect(calc.getResult()).toBeCloseTo(1.666666, 2);
	});

	test('expression with invalid parentheses', () => {
		expect(() => calc.calculate('10 + (2 + 3')).toThrow(
			Error
		);
		expect(() => calc.calculate('10 + 2) + 3')).toThrow(
			Error
		);
		expect(() => calc.calculate(')10 + 2(')).toThrow(Error);
	});
});

const Tod = new Todo();

describe('Todo', () => {
	let todoList;

	beforeEach(() => {
		todoList = new Todo();
	});

	test('add and getAll', () => {
		todoList.add('Task 1');
		todoList.add('Task 2');
		todoList.add('Task 3');

		expect(todoList.getAll()).toEqual([
			'Task 1',
			'Task 2',
			'Task 3',
		]);
	});

	test('remove', () => {
		todoList.add('Task 1');
		todoList.add('Task 2');
		todoList.add('Task 3');

		todoList.remove(1);
		expect(todoList.getAll()).toEqual(['Task 1', 'Task 3']);

		todoList.remove(0);
		expect(todoList.getAll()).toEqual(['Task 3']);

		todoList.remove(2);
		expect(todoList.getAll()).toEqual(['Task 3']);
	});

	test('update', () => {
		todoList.add('Task 1');
		todoList.add('Task 2');
		todoList.add('Task 3');

		todoList.update(1, 'Updated Task 2');
		expect(todoList.get(1)).toBe('Updated Task 2');

		todoList.update(3, 'Invalid Task');
		expect(todoList.getAll()).toEqual([
			'Task 1',
			'Updated Task 2',
			'Task 3',
		]);
	});

	test('get', () => {
		todoList.add('Task 1');
		todoList.add('Task 2');
		todoList.add('Task 3');

		expect(todoList.get(0)).toBe('Task 1');
		expect(todoList.get(2)).toBe('Task 3');
		expect(todoList.get(3)).toBeNull();
	});

	test('clear', () => {
		todoList.add('Task 1');
		todoList.add('Task 2');
		todoList.add('Task 3');

		todoList.clear();
		expect(todoList.getAll()).toEqual([]);
	});

	test('remove and update with invalid indexes', () => {
		todoList.add('Task 1');
		todoList.add('Task 2');

		todoList.remove(5);
		expect(todoList.getAll()).toEqual(['Task 1', 'Task 2']);

		todoList.update(3, 'Updated Task');
		expect(todoList.getAll()).toEqual(['Task 1', 'Task 2']);
	});

	test('add duplicate tasks', () => {
		todoList.add('Task 1');
		todoList.add('Task 2');
		todoList.add('Task 1');
		todoList.add('Task 3');

		expect(todoList.getAll()).toEqual([
			'Task 1',
			'Task 2',
			'Task 1',
			'Task 3',
		]);
	});
});