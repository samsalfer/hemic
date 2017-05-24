import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Structures, ValuesSet} from '../../../lib/collections';


export default class StructureCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.searchValue = this.$stateParams.structureId;

    Meteor.subscribe('structures');
    Meteor.subscribe('valuesSet', this.searchValue);
    this.helpers({

      data() {
        return Structures.find({});
      },
      values(){
        return ValuesSet.find({structureId: this.searchValue});
      }
    });
  }


  createStructure() {
  if (_.isEmpty(this.newName)) return;

  this.callMethod('newStructure', {
    name: this.newName
  });

  delete this.newName;
  }

  deleteStructure(structure) {
    swal({
    title: "Are you sure?",
    text: "You will not be able to recover this imaginary file!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel plx!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm){
    if (isConfirm) {
      Meteor.call('removeStructure', structure._id);
      swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
      swal("Cancelled", "Your imaginary file is safe :)", "error");
    }
  });
  }
  


}

StructureCtrl.$name = 'StructureCtrl';
StructureCtrl.$inject = ['$stateParams'];
