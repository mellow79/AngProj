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
        // This handles new workout log entry
        // Get values from the form
        var date = event.target.date.value;
        var exercise = event.target.exercise.value;
        var sets = parseInt(event.target.sets.value);
        var reps = parseInt(event.target.reps.value);
        var weight = parseFloat(event.target.weight.value);

        // Insert a new workout log entry into the collection
        WorkoutLog.insert({
            date: date,
            exercise: exercise,
            sets: sets,
            reps: reps,
            weight: weight,
            createdAt: new Date(),
        });

        // Clear the form
        event.target.date.value = "";
        event.target.exercise.value = "";
        event.target.sets.value = "";
        event.target.reps.value = "";
        event.target.weight.value = "";
      },
      "submit .new-workout-session": function (event) {
        event.preventDefault();
        // Code to handle new workout session
        // Get values from the form
        var sessionDate = event.target.sessionDate.value;
        var sessionType = event.target.sessionType.value;
        var duration = parseInt(event.target.duration.value);

        // Insert a new workout session into the collection
        WorkoutSession.insert({
            sessionDate: sessionDate,
            sessionType: sessionType,
            duration: duration,
            createdAt: new Date(),
        });

        // Clear the form
        event.target.sessionDate.value = "";
        event.target.sessionType.value = "";
        event.target.duration.value = "";
      },
      "submit .new-workout": function (event) {
        event.preventDefault();
        // ... (add code to handle new workout)
        // Get values from the form
        var workoutName = event.target.workoutName.value;
        var exercise = event.target.exercise.value;
        var sets = parseInt(event.target.sets.value);
        var reps = parseInt(event.target.reps.value);
        var restTime = parseInt(event.target.restTime.value);

        // Insert a new workout into the collection
        Workout.insert({
            workoutName: workoutName,
            exercise: exercise,
            sets: sets,
            reps: reps,
            restTime: restTime,
            createdAt: new Date(),
        });

        // Clear the form
        event.target.workoutName.value = "";
        event.target.exercise.value = "";
        event.target.sets.value = "";
        event.target.reps.value = "";
        event.target.restTime.value = "";
      },
      "submit .new-schedule": function (event) {
        event.preventDefault();
        // Code to handle new schedule
        // Get values from the form
        var scheduleName = event.target.scheduleName.value;
        var startDate = event.target.startDate.value;
        var endDate = event.target.endDate.value;

        // Insert a new schedule into the collection
        Schedule.insert({
            scheduleName: scheduleName,
            startDate: startDate,
            endDate: endDate,
            createdAt: new Date(),
        });

        // Clear the form
        event.target.scheduleName.value = "";
        event.target.startDate.value = "";
        event.target.endDate.value = "";
      },
      "submit .new-schedule-step": function (event) {
        event.preventDefault();
        // Code to handle new schedule step
        // Get values from the form
        var stepName = event.target.stepName.value;
        var stepDescription = event.target.stepDescription.value;

        // Insert a new schedule step into the collection
        ScheduleStep.insert({
            stepName: stepName,
            stepDescription: stepDescription,
            createdAt: new Date(),
        });

        // Clear the form
        event.target.stepName.value = "";
        event.target.stepDescription.value = "";
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
