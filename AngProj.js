//create a mongoDb collection for task
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
            return Tasks.find({}, {sort: {createdAt: -1}});

        }
    });

    Template.body.events({
        "submit .new-task": function (event) {
            // Prevent default browser from submit
            event.preventDefault();

            // Get value from form element
            var text = event.target.text.value;

            //Insert a task into the collection
            Tasks.insert({
                text: text,
                createdAt: new Date() // currrent time
            });


            // Clear form
            event.target.text.value = "";
        }

    });

    Template.task.events({
        "click .toggle-checked": function () {
            // Set the checked propert to the opposite of its current value
            Tasks.update(this._id, {
                $set: {checked: ! this.checked}
            });

        },
        "click .delete": function () {
            Tasks.remove(this._id);
        }

    });
}


if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
