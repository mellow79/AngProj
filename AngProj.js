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
    workoutLogs: function () {
        return WorkoutLog.find();
      },
      workoutSessions: function () {
        return WorkoutSession.find();
      },
      workouts: function () {
        return Workout.find();
      },
      schedules: function () {
        return Schedule.find();
      },
      scheduleSteps: function () {
        return ScheduleStep.find();
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
      "submit .new-set": function (event) {
        event.preventDefault();
        var setName = event.target.setName.value;
  
        // Insert a set into the collection
        Sets.insert({
          setName: setName,
        });
  
        // Clear form
        event.target.setName.value = "";
      },
      "submit .new-day": function (event) {
        event.preventDefault();
        var dayName = event.target.dayName.value;
  
        // Insert a day into the collection
        Days.insert({
          dayName: dayName,
        });
  
        // Clear form
        event.target.dayName.value = "";
      },
      "submit .new-workout-log": function (event) {
        event.preventDefault();
        // ... (add code to handle new workout log entry)
      },
      "submit .new-workout-session": function (event) {
        event.preventDefault();
        // ... (add code to handle new workout session)
      },
      "submit .new-workout": function (event) {
        event.preventDefault();
        // ... (add code to handle new workout)
      },
      "submit .new-schedule": function (event) {
        event.preventDefault();
        // ... (add code to handle new schedule)
      },
      "submit .new-schedule-step": function (event) {
        event.preventDefault();
        // ... (add code to handle new schedule step)
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
