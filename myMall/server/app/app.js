new Vue({
  el: '#app',

  data: () => ({
    TodoSelect:false,
    newTodo: '',
    currentFilter:'all',
    updatedTodo: null,
    empty: false,
    todos: [],
    filters: [
      'all',
      'active',
      'completed'
    ],
  }),

  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    }

  },

  methods: {
    async getTodos() {
      try {
        this.todos = (await axios.get('/api/v1/todos')).data;
      } catch (e) {
        console.error(e);
      }
    },

    async createTodo() {
      try {
        this.newTodo = this.newTodo.trim();
        if (this.newTodo) {
          await axios.post('/api/v1/todos', {
            content: this.newTodo
          });
          this.newTodo = '';
          await this.getTodos();
        }
      } catch (e) {
        console.error(e);
      }
    },

    async deleteTodo(index){
      try{
        await axios.delete('/api/v1/todos/'+this.todos[index]._id);
        await this.getTodos();
      }catch (e) {
        console.error(e);
      }
    },

    async updateTodo(index){
      try{
       await axios.put('/api/v1/todos/'+this.todos[index]._id+'/'+this.todos[index].completed);
        await this.getTodos();
      }catch(e){
        console.error(e);
      }
    },

    async clearTodo(){
      try{
        await axios.delete('api/v1/clear');
        await this.getTodos();
      }catch(e){
      console.error(e);
      }
    },

    async selectTodo(){
      try{
       await axios.put('/api/v1/select/'+this.TodoSelect);
      //alert(this.TodoSelect);
       await this.getTodos();
     }catch(e){
      console.error(e);
     }
  },

  async query(index){
      switch(index)
      {
        case 'all':this.getTodos()
        break;
        case 'active':this.Active()
        break;
        case 'completed':this.Completed()
        break;
      }
  },

  async Active(){
    try{
      this.todos = (await axios.get('/api/v1/active')).data;
      this.judge=1; //用于判断是否显示过滤器
    }catch(e){
      console.error(e);
    }
  },

  async Completed(){
    try{
      this.todos = (await axios.get('/api/v1/completed')).data;
      this.empty=true; //用于判断是否显示过滤器
    }catch(e){
    console.error(e);
    }
  },

   async editTodo(index) {
      if (this.updatedTodo) {
        this.updatedTodo = null;
         try{
          if(this.todos[index].content.trim()!=''){
            await axios.put('/api/v1/edit/'+this.todos[index]._id+'/'+this.todos[index].content);
            await this.getTodos();
          }
          else{
            this.deleteTodo(index);
          }
      }catch(e){
        console.error(e);
      }
    }
    },
    startEdit(todo) {
      this.updatedTodo = todo;
    },
    cancelEdit() {
      this.getTodos();
    },
    pluralize(word, count) {
      return word + (count === 1 ? '' : 's');
    },
    capitalize(word) {
      return `${word[0].toUpperCase()}${word.substr(1)}`;
    }
  },
  

  beforeMount() {
    this.getTodos();
  }
});
