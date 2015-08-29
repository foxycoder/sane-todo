import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        createTodo: function(newTitle) {
            this.set('newTitle', '');
            this.sendAction('createTodo', newTitle);
        },

        clearCompleted: function() {
            var completed = this.get('model').filterBy('completed', true);
            completed.invoke('deleteRecord');
            completed.invoke('save');
        }
    },

    remaining: Ember.computed('model.@each.completed', function() {
        var model = this.get('model');
        return model.filterBy('completed', false).get('length');
    }),

    inflection: Ember.computed('remaining', function() {
        var remaining = this.get('remaining');
        return (remaining === 1) ? 'item' : 'items';
    }),

    allCompleted: Ember.computed('model.@each.completed', function() {
        var model = this.get('model');
        return model.filterBy('completed', true).get('length');
    }),

    hasCompleted: Ember.computed('completed', function() {
         return this.get('completed') > 0;
    }),

    allAreDone: function(key, value) {
         var model = this.get('model');
         if (value === undefined) {
             return model.get('lenght') > 0 && model.isEvery('completed', true)
         } else {
             model.setEach('completed', value);
             model.invoke('save');
             return value;
         }
    }.property('@each.completed')
});
