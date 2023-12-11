// Create MongoDB collections
Tasks = new Mongo.Collection("tasks");
Settings = new Mongo.Collection("settings");
Sets = new Mongo.Collection("sets");
Days = new Mongo.Collection("days");
WorkoutLog = new Mongo.Collection("WorkoutLog");
WorkoutSession = new Mongo.Collection("WorkoutSession");
Workout = new Mongo.Collection("Workout");
Schedule = new Mongo.Collection("Schedule");
ScheduleStep = new Mongo.Collection("ScheduleStep");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    tasks: function () {
      // Show newest tasks at the top
      return Tasks.find({}, { sort: { createdAt: -1 } });
    },
    settings: function () {
      return Settings.find();
    },
    sets: function () {
        return Sets.find();
    },
    days: function () {
        return Days.find();
    },
    // Add similar helpers for other collections
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submission
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date(), // current time
      });

      // Clear form
      event.target.text.value = "";
    },
    "submit .new-setting": function (event) {
        event.preventDefault();
        var settingName = event.target.settingName.value;
        var settingValue = event.target.settingValue.value;
  
        // Insert a setting into the collection
        Settings.insert({
          settingName: settingName,
          settingValue: settingValue,
        });
  
        // Clear form
        event.target.settingName.value = "";
        event.target.settingValue.value = "";
      },

    // Add similar events for other collections
  });

  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: { checked: !this.checked },
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    },
  });

  // Add similar Template and event handlers for other collections
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
