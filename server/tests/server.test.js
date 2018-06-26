const expect = require('expect');
const supertest = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {todos, populateTodos, users, populateUsers} = require('./../seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', ()=>{
  it('should create a new todo', (done)=>{
    var text = 'Make Dinner';
    supertest(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(1);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }
        Todo.find({
          _creator:users[0]._id
        }).then((todos)=>{
          expect(todos.length).toBe(1);
          done();
        }).catch((err)=>{
          done(err);
        });
      });
  });
});

// describe('GET /todos/:id', ()=>{
//   it('should return a todo', (done)=>{
//     supertest(app)
//       .get('/todos/'+todos[0]._id.toHexString())
//       .expect(200)
//       .expect((res)=>{
//         expect(res.body.text).toBe(todos[0].text);
//       })
//       .end(done);
//   });
//
//   it('should return a 404 if todo is not found',(done)=>{
//     var testId = new ObjectID().toHexString();
//     supertest(app)
//       .get('/todos/'+testId)
//       .expect(404)
//       .end(done);
//   });
//
//   it('should return a 404 for invalid id', (done)=>{
//     supertest(app)
//       .get('/todos/'+123)
//       .expect(404)
//       .end(done);
//   });
// });

describe('DELETE /todos/:id', ()=>{
  it('should perform delete of a valid todod', (done)=>{
    var id = todos[0]._id.toHexString();
    supertest(app)
      .delete('/todos/'+id)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }

        done();
      });
  });

  it('should not delete a todo user dint create', (done)=>{
    var id = todos[1]._id.toHexString();
    supertest(app)
      .delete('/todos/'+id)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo not found', (done)=>{
    var testId = new ObjectID().toHexString();
    supertest(app)
      .delete('/todos/'+testId)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo id is invalid', (done)=>{
    supertest(app)
      .delete('/todos/'+123)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', ()=>{
  it('should update Todo', (done)=>{
    var testId = todos[0]._id.toHexString();
    var text = 'Testing Todo Updates';
    supertest(app)
      .patch('/todos/'+testId)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        completed:true,
        text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe(text);
      })
      .end(done);
      // .end((err,res)=>{
      //   if(err){
      //     return res.status(400).done();
      //   }
      //
      //   done();
      // });
  })
});

describe('GET /users/me', ()=>{
  it('should return valid user if token exists', (done)=>{
    supertest(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
      })
      .end(done);
  });

  it('should return a 401 if user does not have a token',(done)=>{
    supertest(app)
      .get('/users/me')
      .expect(401)
      .end(done);
  });
});

describe('POST /users', ()=>{

  it('should create a user', (done)=>{
    supertest(app)
      .post('/users')
      .send({
        email: 'ankit@yahoo.com',
        password: 'abc123'
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.email).toBe('ankit@yahoo.com');
      })
      .end(done);
  });

  it('should return validation error for invalid request', (done)=>{
    supertest(app)
      .post('/users')
      .send({
        email:'',
        password:'abc123'
      })
      .expect(400)
      .end(done);
  });

  it('should return error for duplicate email', (done)=>{
    supertest(app)
      .post('/users')
      .send({
        email:'ankurs@gmail.com',
        password:'abc123'
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login',()=>{
  it('should login the user with valid email and password', (done)=>{
    supertest(app)
      .post('/users/login')
      .send({
        email:users[0].email,
        password:users[0].password
      })
      .expect(200)
      .end(done);
  });
});

describe('DELETE /users/me/token', ()=>{
  it('should delete token for user', (done)=>{
    supertest(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res)=>{
        if(err){
          return done(err);
        }

        User.findById(users[0]._id).then((user)=>{
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e)=>{
          done(e);
        });
      });
  });
});
