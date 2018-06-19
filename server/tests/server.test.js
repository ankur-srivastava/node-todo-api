const expect = require('expect');
const supertest = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

/*
  Before running each test we delete the data in todo collection
  We also create a mock array of todos so that GET /todos works
  To handle this we modify the POST /todos unit tests.
*/
const todos = [
  {
    _id:new ObjectID(),
    text:'First Todo'
  },{
    _id:new ObjectID(),
    text:'Second Todo'
  }
];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>{
    done();
  });
});

describe('POST /todos', ()=>{
  it('should create a new todo', (done)=>{
    var text = 'Make Dinner';
    supertest(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=>{
          done(e);
        });
      });
  });

  it('should not save invalid data', (done)=>{
    supertest(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=>{
          done(e);
        });
      });
  });
});

describe('GET /todos',()=>{
  it('should get todos', (done)=>{
    supertest(app)
      .get('/todos')
      .send()
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((err)=>{
          done(err);
        });
      });
  });
});

describe('GET /todos/:id', ()=>{
  it('should return a todo', (done)=>{
    supertest(app)
      .get('/todos/'+todos[0]._id.toHexString())
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo is not found',(done)=>{
    var testId = new ObjectID().toHexString();
    supertest(app)
      .get('/todos/'+testId)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for invalid id', (done)=>{
    supertest(app)
      .get('/todos/'+123)
      .expect(404)
      .end(done);
  });
});
