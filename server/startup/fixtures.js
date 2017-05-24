import { Structures, ValuesSet} from '../../lib/collections';

Meteor.startup(function () {
  if (ValuesSet.find({}).fetch().length === 0) {

    var structures = [
      {name:'Structure 1'},
      {name:'Structure 2'}
    ];

    var valuesSet = [
      {value:'Value 3', structureId:'4owoAxAuB7L2u9Npw'},
      {value:'Value 4', structureId:'4owoAxAuB7L2u9Npw'}
    ];

    // _.each(structures, function (structure) {
    //   console.log(structures);
    //
    //   Structures.insert(structure);
    //
    //
    // });

    _.each(valuesSet, function (valuesSet) {
      ValuesSet.insert(valuesSet);

    });
  }
});
