import { Meteor } from 'meteor/meteor';
import { Structures, ValuesSet } from '../lib/collections';
import { _ } from 'meteor/underscore';



 Meteor.publish('structures', function() {
   return Structures.find({});
 });

 Meteor.publish('valuesSet', function(structureId) {
   return ValuesSet.find({structureId: structureId});
 });

Meteor.publishComposite('oneStructure', function(structureId) {
  return {
    find() {
      return Structures.find({'_id':structureId});
    },
    children: [
      {
        find(structure) {
          return ValuesSet.find({ structureId: structureId });
        }
      }
    ]
  };
});
