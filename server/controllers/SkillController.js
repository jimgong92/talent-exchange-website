var Skill = require('../models/Skill');

var controller = {
  getSkillId: function(skillName, callback){
    var query = {where: {name: skillName}};
    Skill.findOne(query).then(function(skill){
      if (skill === null){
        callback({id: -1});
      }
      else callback({id: skill.id});
    });
  },
  addSkill: function(skillName, callback){
    Skill.create({name: skillName}).then(function(skill){
      callback(removeTimeStamps(skill));
    });
  },
  getAllSkills: function(callback){
    Skill.findAll({}, {subQuery: false}).then(function(skills){
      callback(skills.map(removeTimeStamps));
    });
  },
  removeSkill: function(skillName, callback){
    var query = {where: {name: skillName}};
    Skill.findOne(query).then(function(skill){
      skill.destroy().then(function(){
        callback(skill);
      });
    });
  }
}

function removeTimeStamps(obj){
  delete obj['createdAt'];
  delete obj['updatedAt'];
  return obj;
}

module.exports = controller;