import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        editTodo: function() {
             this.set('isEditing', true);
        },

        acceptChanges: function() {
            this.set('isEditing', false);
            this.sendAction('action', this.get("todo"));
        },

        deleteTodo: function(todo) {
            this.sendAction('deleteTodo', todo);
        }
    },

    completed: function(key, value) {
      var model = this.get('todo');

      if (value === undefined) {
        // property being used as a getter
        return model.get('completed');
      } else {
        // property being used as a setter
        model.set('completed', value);
        model.save();
        return value;
      }
    }.property('model.completed')
});
